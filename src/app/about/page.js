import { AboutIntro } from "@/src/components/About/AboutIntro";
import { ProfileLinks } from "@/src/components/About/ProfileLinks";
import { Timeline, TimelineItem } from "@/src/components/About/Timeline";

export const metadata = {
  title: "About Me!",
  description: "DevSecOps Architect specializing in Site Reliability, Artificial Intelligence, and Software: my experience, education and where to find my certifications.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main>
      <AboutIntro />
      <Timeline title="Experience">
        <TimelineItem
          title="Engineering Manager - Cloud & AI"
          org="IBM"
          time="November 2021 - present"
          body="Led a team to deliver AI and cloud software products, optimizing operations, and collaborated with senior stake holders to improve various platforms. Designed scalable cloud infrastructure on AWS/Azure, developed AI systems, and drove $50M in revenue through customer-centric strategies."
        />
        <TimelineItem
          title="DevSecOps Lead Engineer"
          org="FIS"
          time="March 2020 - November 2021"
          body="Led four engineering teams to develop software products that streamlined operations and saved over $1 million in 2021, managed CI/CD pipelines and cloud infrastructure, developed automation scripts to reduce manual efforts by 60%, and implemented security measures to ensure infrastructure integrity."
        />
        <TimelineItem
          title="Full Stack Engineer"
          org="Solar Havoc"
          time="June 2016 - March 2020"
          body="Independently developed and managed DoD software programs and mobile applications, handled full-stack development, created responsive user interfaces, developed back-end functionalities, and maintained CI/CD pipelines and cloud infrastructure, achieving 99.99% uptime for customer-facing applications."
        />
        <TimelineItem
          title="Game Design and Development Intern"
          org="Cubic Corporation"
          time="July 2014 - June 2015"
          body="Developed game mechanics and features using Unreal Engine and Java, created and optimized 3D models, collaborated with designers and developers, conducted thorough testing and debugging, and maintained detailed documentation to ensure high-quality and seamless gaming experiences."
        />
      </Timeline>
      <Timeline title="Education">
        <TimelineItem
          title="Masters of Science in Computer Science"
          subtitle="Specialization in Artificial Intelligence"
          time="Georgia Institute of Technology"
        />
        <TimelineItem
          title="Bachelors of Science in Computer Science"
          subtitle="Specialization in Cyber Security"
          time="Florida Polytechnic University"
        />
      </Timeline>
      <ProfileLinks />
    </main>
  );
}
