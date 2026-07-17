"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= u_resolution.x / u_resolution.y;
    
    vec3 color = vec3(0.04, 0.05, 0.08);
    
    // Neural Swarm / Agent Activity
    for(float i = 0.0; i < 40.0; i++) {
        float h = hash(vec3(i, i * 1.3, i * 0.7).xy);
        float t = u_time * (0.2 + h * 0.5);
        
        vec2 pos = vec2(
            sin(t + h * 6.28) * 1.5,
            cos(t * 0.8 + h * 6.28) * 1.0
        );
        
        float dist = length(p - pos);
        float pulse = 0.5 + 0.5 * sin(u_time * 2.0 + h * 10.0);
        float glow = 0.002 / (dist * dist + 0.001);
        
        vec3 agentColor = mix(vec3(0.0, 0.83, 1.0), vec3(0.48, 0.45, 1.0), h);
        color += agentColor * glow * pulse * 0.4;
        
        // Subtle data connections
        if(i < 15.0) {
            float lineH = hash(vec2(i, 42.0));
            vec2 nextPos = vec2(
                sin(t * 1.1 + lineH * 6.28) * 1.5,
                cos(t * 0.9 + lineH * 6.28) * 1.0
            );
            float lineDist = length(p - mix(pos, nextPos, fract(u_time * 0.1)));
            color += agentColor * (0.0005 / (lineDist + 0.01)) * 0.2;
        }
    }
    
    // Mouse interaction glow
    vec2 mouseNorm = u_mouse / u_resolution;
    vec2 mouseP = (mouseNorm - 0.5) * 2.0;
    mouseP.x *= u_resolution.x / u_resolution.y;
    float mouseDist = length(p - mouseP);
    color += vec3(0.0, 0.83, 1.0) * 0.003 / (mouseDist * mouseDist + 0.05);
    
    // Vignette
    color *= 1.0 - length(uv - 0.5) * 0.5;
    
    gl_FragColor = vec4(color, 1.0);
}`;

export default function BackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const glCtx = gl as WebGLRenderingContext;

    function createShader(type: number, src: string) {
      const s = glCtx.createShader(type)!;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      return s;
    }

    const prog = glCtx.createProgram()!;
    glCtx.attachShader(prog, createShader(glCtx.VERTEX_SHADER, VERTEX_SHADER));
    glCtx.attachShader(prog, createShader(glCtx.FRAGMENT_SHADER, FRAGMENT_SHADER));
    glCtx.linkProgram(prog);
    glCtx.useProgram(prog);

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      glCtx.STATIC_DRAW
    );

    const pos = glCtx.getAttribLocation(prog, "a_position");
    glCtx.enableVertexAttribArray(pos);
    glCtx.vertexAttribPointer(pos, 2, glCtx.FLOAT, false, 0, 0);

    const uTime = glCtx.getUniformLocation(prog, "u_time");
    const uRes = glCtx.getUniformLocation(prog, "u_resolution");
    const uMouse = glCtx.getUniformLocation(prog, "u_mouse");

    mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };

    function handleMouseMove(event: globalThis.MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouseRef.current.x = nx * canvas.width;
        mouseRef.current.y = ny * canvas.height;
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;

    function render(t: number) {
      if (!canvas) return;
      glCtx.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) glCtx.uniform1f(uTime, t * 0.001);
      if (uRes) glCtx.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) glCtx.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 print:hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}
