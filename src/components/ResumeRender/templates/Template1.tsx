import React from "react";
import type { ResumeData } from "@/types";

interface Template1Props {
  resumeData: ResumeData;
}

const Template1: React.FC<Template1Props> = ({ resumeData }) => {
  const { personalInfo, educations, experiences, projects, skills, certifications } = resumeData;

  return (
    <div className="p-8 font-serif text-[12px] leading-relaxed text-black">
      <div className="mb-4 flex flex-col justify-center items-center">
        <h1 className="text-[18px] font-bold">{personalInfo.name}</h1>
        <div>{[personalInfo.phone, personalInfo.email, personalInfo.address].filter(Boolean).join(" ♢ ")}</div>
        <div>{personalInfo.links.split(",").join(" ♢ ")}</div>
      </div>
      {experiences.length > 0 && (
        <section>
          <h1 className="font-bold">EXPERIENCES</h1>
          <div className="my-2 h-0.25 w-full bg-gray-300" />
          {experiences.map((exp, i) => (
            <div key={i} className="w-full mb-4">
              <div className="flex justify-between">
                <b>{exp.company}</b>
                <p>{exp.years}</p>
              </div>
              <div className="flex justify-between">
                <p>{exp.title}</p>
                <i>{exp.location}</i>
              </div>
              <ul className="mt-1 ml-4 space-y-1">
                {exp.description.split("\n\n").map((des, i) => (
                  <div key={i} className="flex items-start text-[12px] leading-snug">
                    <span className="w-4 text-[14px] leading-none mt-[2px]">•</span>
                    <span className="flex-1 break-words">{des}</span>
                  </div>
                ))}
                {exp.tools !== "" && (
                  <p>
                    <b>Tools: </b>
                    {exp.tools.split(",").join(", ")}
                  </p>
                )}
              </ul>
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section className="mb-4">
          <h1 className="font-bold">SKILLS</h1>
          <div className="my-2 h-0.25 w-full bg-gray-300" />
          {skills.map((skill, i) => (
            <div key={i} className="w-full flex gap-4">
              <b className="w-[80px]">{skill.category}</b>
              <p>{skill.skills.split(",").join(", ")}</p>
            </div>
          ))}
        </section>
      )}
      {educations.length > 0 && (
        <section>
          <h1 className="font-bold">EDUCATION</h1>
          <div className="my-2 h-0.25 w-full bg-gray-300" />
          {educations.map((edu, i) => (
            <div key={i} className="w-full mb-4">
              <div className="flex justify-between">
                <b>{edu.school}</b>
                <p>{edu.years}</p>
              </div>
              <div className="flex justify-between">
                <i>{edu.degree}</i>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
              <p>Relevant Courses: {edu.classes.split(",").join(", ")}</p>
            </div>
          ))}
        </section>
      )}
      {projects.length > 0 && (
        <section>
          <h1 className="font-bold">PROJECTS</h1>
          <div className="my-2 h-0.25 w-full bg-gray-300" />
          {projects.map((proj, i) => (
            <div key={i} className="w-full mb-4">
              <div className="flex justify-between">
                <b>{proj.title}</b>
                <p>{proj.link}</p>
              </div>
              <ul className="mt-1 ml-4 space-y-1">
                {proj.description.split("\n\n").map((des, i) => (
                  <div key={i} className="flex items-start text-[12px] leading-snug">
                    <span className="w-4 text-[14px] leading-none mt-[2px]">•</span>
                    <span className="flex-1 break-words">{des}</span>
                  </div>
                ))}
                {proj.technologies !== "" && (
                  <p>
                    <b>Tools: </b>
                    {proj.technologies.split(",").join(", ")}
                  </p>
                )}
              </ul>
            </div>
          ))}
        </section>
      )}
      {certifications.length > 0 && (
        <section>
          <h1 className="font-bold">CERTIFICATIONS</h1>
          <div className="my-2 h-0.25 w-full bg-gray-300" />
          {certifications.map((cert, i) => (
            <div key={i} className="w-full flex justify-between mb-4">
              <p>
                <b>{cert.title}</b> - {cert.issuer}
              </p>
              <i>Issued: {cert.date}</i>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Template1;
