import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";

const FEATURED_PROJECTS = [
  {
    title: "Medigem AI",
    description:
      "An intelligent healthcare platform leveraging machine learning to provide diagnostic support. Architected with a focus on real-time data processing, stringent security protocols, and a friction-free practitioner experience.",
    tags: [
      { label: "Healthcare App", color: "text-aurora-blue", borderColor: "border-aurora-blue/20" },
      { label: "AI Architecture", color: "text-aurora-violet", borderColor: "border-aurora-violet/20" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsS6horTy66epld4oQJ0BIlgkSbrdH2cEObusdrBNQ9d28CgSLV_7qZT0E_tdjMucVG8vvU5SaZPdqXq-79uqLOQJJaFuBuohq4U8aRjoXu-uyqrgaRN83V_bzbTtMbuBlIMvkG97nxje5jr756vOSc4Al9hKlbr90IRbWu2qQAs19c2G0uXhjodxL_KXUDLuSmgvkNYZqIEvW6tlyRc0VIlWFNNrYfsuycRovaN5Mu4xijVQHjnUUIhbg",
    imageAlt: "Medigem AI Interface",
    reverse: false,
  },
  {
    title: "Courseware Web App",
    description:
      "An educational platform designed for Centurion University, facilitating seamless access to course materials, academic schema, and institutional resources.",
    tags: [
      { label: "Educational Platform", color: "text-aurora-blue", borderColor: "border-aurora-blue/20" },
      { label: "Centurion University", color: "text-aurora-cyan", borderColor: "border-aurora-cyan/20" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLs9Zlu4rCfKT9f_udaO4tSspSE0mAS9P5TSgy0WBlGxuJfmMj4N3TCSdCKSG5HXuiliSp4R0q9kqjI_8WNp1x2sjxgh5TXZuaccuKAeYe3xcyW8ZpcbmUcwllXfh7GoR4zgG7iZ5aCzgihqSfcBoQvoe9SElNjnH0LnnKN_QwKRisdpZfz0IUBJ_9eLjUxiXKMkdcsYdp8CcusaaApJ5GvYnaCBpdQeWYUWq0ciDXPtaDjlKFF_ZqxODA",
    imageAlt: "Courseware Web App",
    reverse: true,
  },
];

const GRID_PROJECTS = [
  {
    title: "TechKart",
    description: "High-performance e-commerce architecture optimized for conversion and speed.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLvCmu3RzqQWIOXZK90AS013kB0oTUTvcL5dXpTm7lH73ohbHH3-T1nwWH5qyQFoyBwIaWJWW2PnhEquRFwmSlQJE1V1ywNp82h-Za3abechkuVSvitkfcNF6wskLryq7NpqrCYaeSz-FCSb9VP2lQeU8lAHd7DBIr11E6t-OODP44QIlxpxQ6bw8Pmt5MniGLdQFrlKzA_wkOz4b-8xyNppIWo6fk06TgvBzsY3gOqV98n6X5yQxTjK4t4",
    imageAlt: "TechKart E-commerce",
    techLabel: "Next.js / Stripe",
    techColor: "text-aurora-cyan",
  },
  {
    title: "My Clinic Copilot",
    description: "Comprehensive practice management dashboard with predictive analytics.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsDzDz11UHPj8BNUSZoscIq9vsSm2my6dUi-PmjrsPK9SZrKiwSU49bdBB02ZCt2eTcy1MXdrXyUL6hHmtNcs2ztiMfApvtG-7yVM6Stvq9ZA7qaU4BZpHn1sLBFSt99yRIynxUIYxU9jFsHSgFpEiF3Uuh3O1wTigrXYjubogb3cfICp6HeUSFx6YKUg0Xc5Y5LDJMhNzcPoSNjWjx4SaqocBL3ktEu0jsTF8nZRdOg9DIKJd6VtweYfI",
    imageAlt: "My Clinic Copilot Interface",
    techLabel: "React / Python API",
    techColor: "text-aurora-violet",
  },
  {
    title: "Organ Donor System",
    description: "Data analysis and storage for organ donors.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsaytwt2DGdMuNFYN3kYFmLkgRo8P3RkaLi7hrcdB3xCv5ihr3srPZmANcmgE-eCruPVYZzSX-rzVvwPM-QeniyaHoKcTz3vhyUKGoKRNVhlW6RO1ONMxuwXWVxK_-DijU613CCEL_oxnnjNgmaVGvxwBuXMwLlzkWx_gnQ0mVWwKRhJXqzUCjsj4L7h16YRAqOkjQvjyPasDZYkaP3ef2yooU6uZIW6RmjEZ9Rg1FzX65LWC9xkMxKf2c",
    imageAlt: "Organ Donor System",
    techLabel: "Data Analysis / Storage",
    techColor: "text-aurora-cyan",
  },
  {
    title: "Note Keeper Application",
    description: "Aesthetic Google Keep-inspired app.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLt3xkQ0E2rYBWR5oIXSnjfKfGKv14Jxscnr6HTtLW9I_FYEf4hIQQqymJtHDCY_ZS3k4SPXPV1w3aMLEGvToJ8Ym7MbZl45dEjVKyEo4Kj2Mt9QtNOaf7_-OaVRxD_y3UtCEwP99_OtXQiKeRESOZ5KPAP2ckEZHX5END3PUB6CWu4RY8YYDb7TMZau31ZVSbEWfguofO8xwTCgJpd5ilC-wZXSNZpTotcX6vnUlzxO0idAobCoG8BZ5WY",
    imageAlt: "Note Keeper Application",
    techLabel: "Frontend",
    techColor: "text-aurora-violet",
  },
  {
    title: "Amazon.in Clone",
    description: "Frontend practice project.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtTo9xeiK9MGOSZqRE6uMVnGKLb4_lcDX5KrKPn6ghUxao_wXY9BtK61Qp6g6CMGNZL9DsZHoqh_PPg6fVHIuMPygVJ7jflOIK7w8sTCxQI3AwBcK4L9fPx999YEjIeFy7UgCv1bKyOBdhhAB8P11IIoFOJAwaBVCmBV8uwjDQNlggymhS3-A5HxLwP498GWD_S7RVAZqWg0lxVnKtbN9TYHmtS1bRaIEUtTOrQfWkLRvi5C1c8BqcuKkY",
    imageAlt: "Amazon.in Clone",
    techLabel: "Frontend",
    techColor: "text-aurora-cyan",
  },
  {
    title: "Yom! Food Delivery",
    description: "Order online, book tables, and list restaurants.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLvkek72ptSiEuDpO-7MACc3E7ol6t1zR0vZaERzJ24ModMWVHi6jhuHZnIQObBIVUlm4qx1i4J8lHlN4QGBzpsx-Ee17uP7pjfx9bFvrjSLtQhDoFlXCiw0g1QhyJKwZsd3Si0Ax3Sjk5-0O2V82U_apzYfVS0bfnJPbVwk5iLF7M0FrGSYmMU6oPKvMeuw9Oa_rwRCS9GMkqOfNau_nnEsa1ZsKLtVEMA3Ags11G8Kys-cSsP2ZuuCmJk",
    imageAlt: "Yom! Food Delivery",
    techLabel: "Full-Stack",
    techColor: "text-aurora-violet",
  },
  {
    title: "Texpert",
    description: "Learning platform for programmers.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtssvcdzV6jb-adnXdx1LW-V80eT66TAMJUZ740twQuCOO7zACGnBmksNUsdPTq1BO493pWyFDE_743-6g-NLgp3ghxTixoaRLe91--ED0LoZ_fikEp8w41ALzUgC6qKIQIKXY6XJUMgMTdzjV1aJUDzYK18DbGvcGQgCLnnCSCaPOKv62RPM_jbJFQo9SufR3-gey2Ri6L9Sz0vQPmXRmLV5jc9rAYJ3CbN2h44Izj9K02qSJspfPQXPY",
    imageAlt: "Texpert",
    techLabel: "Education Tech",
    techColor: "text-aurora-cyan",
  },
  {
    title: "React-Prompt-Generator",
    description: "NPM package for prompt analysis.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtTMLBFLalQp5mZh5_DDHBx4HPhSk6qGcceWb2xBQ0OGPom6pYTxST3rz3uzeIotTW3rGImJKHB5qkJ6iCfKlpRFItVwn2zYFPR-rcynzGyim5eUE-YAe9S-PRkVj0Yd8rmDMlHt_gt3eSzNVXnQNDd_Qa3aucaN0OQ8Q4zMb2DYfYaTXS_V9yIFyTjkWo_8NZgW-UfYCi4t3meTQznfOwbXmQBKq6pj0bWaGw8ohuSuJnjXUtcQJ0-dCY",
    imageAlt: "React-Prompt-Generator NPM Package",
    techLabel: "NPM Package",
    techColor: "text-aurora-violet",
  },
];

export default function ProjectsSection() {
  return (
    <section
      className="px-5 md:px-[60px] max-w-[1200px] mx-auto w-full"
      id="projects"
    >
      <RevealOnScroll>
        <SectionHeading
          title="Selected Works"
          subtitle="High-fidelity digital products engineered for scale and impact."
        />
      </RevealOnScroll>

      <div className="space-y-10 md:space-y-16">
        {/* Featured Projects */}
        {FEATURED_PROJECTS.map((project) => (
          <RevealOnScroll key={project.title}>
            <FeaturedProject {...project} />
          </RevealOnScroll>
        ))}

        {/* Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {GRID_PROJECTS.map((project, i) => (
            <RevealOnScroll key={project.title} delay={(i % 2) + 1}>
              <ProjectCard {...project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
