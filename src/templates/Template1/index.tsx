import { capitalize } from "../../utils/capitalize";
import styles from "./template1.module.css";

export const Template1 = (props: { data: Resume }) => {
  const { user, educations, experiences, projects } = props.data;

  const style = {
    resumeTemplate: {
      height: "100%",
      width: "100%",
      display: "grid",
      gridTemplateRows: "12% 1fr",
      background: "#ffffff",
      aspectRatio: "8/11",
      fontFamily: "'Work Sans', sans-serif",
      fontSize: "12px",
    },
  };

  return (
    <div id="resume-template" style={style.resumeTemplate}>
      <div className={styles.introduction}>
        <div className={styles.initials}>
          <h1>{`${capitalize(user.first ?? "")[0]}${capitalize(user.last ?? "")[0]}`}</h1>
        </div>
        <div className={styles.user}>
          <h2>{`${user.first} ${user.middle ?? ""} ${user.last}`}</h2>
          <p>{`${user.address}`}</p>
          <p>{`${user.phone} | ${user.email}`}</p>
          <p>{`${user.links?.join(" | ")}`}</p>
        </div>
      </div>
      <div className={styles.information}>
        <i>{user.objective}</i>
        <div className={styles.experiences}>
          <h2>EXPERIENCE</h2>
          {experiences.map((exp, i) => {
            return (
              <div key={i} className={styles.subsection}>
                <p>
                  <b>{`${exp.position} @ ${exp.company} - `}</b>
                  <i>{`${exp.city}, ${exp.state}`}</i>
                </p>
                <i>{`${exp.start} - ${exp.end}`}</i>
                <ul>
                  {exp.details?.map((detail, i) => {
                    return <li key={i}>{detail}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className={styles.educations}>
          <h2>EDUCATION</h2>
          {educations.map((edu, i) => {
            return (
              <div key={i} className={styles.subsection}>
                <p>
                  <b>{`${edu.degree}: ${edu.major}`}</b>
                  <i>{` @ ${edu.school} - ${edu.city}, ${edu.state}`}</i>
                </p>
                <i>{`${edu.start} - ${edu.end}: ${edu.graduated ? "Graduated" : "In Progress"}`}</i>
                <ul>
                  <li>{`Electives: ${edu.electives?.join(", ")}`}</li>
                </ul>
              </div>
            );
          })}
        </div>
        <div className={styles.projects}>
          <h2>PROJECTS</h2>
          {projects.map((proj, i) => {
            return (
              <div key={i} className={styles.subsection}>
                <p>
                  <b>{`${proj.name} - `}</b>
                  <i>{proj.tools?.join(" + ")}</i>
                </p>
                <ul>
                  {proj.details?.map((detail, i) => {
                    return <li key={i}>{detail}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
