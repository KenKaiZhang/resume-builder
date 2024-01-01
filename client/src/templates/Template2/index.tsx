import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { createArray } from "../../utils/createArray";

export interface Template2Props {
  resume: Resume;
}

// Create Document Component
export const Template2 = (props: Template2Props) => {
  const { user, educations, experiences, projects, skills } = props.resume;

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.title}>{createArray(user.first, user.middle, user.last).join(" ")}</Text>
          <Text style={styles.text}>{createArray(user.email, user.phone, user.address).join(" | ")}</Text>
          <Text style={styles.text}>{user.links && user.links.join(" | ")}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary</Text>
          <Text style={styles.text}>{user.objective}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Skills</Text>
          <Text style={styles.text}>
            {skills!.tools!.length > 0 && (
              <View>
                <Text style={styles.bold}>{"Technical: "}</Text>
                <Text>{skills?.tools?.join(", ")}</Text>
              </View>
            )}
          </Text>
          <Text style={styles.text}>
            {skills!.concepts!.length > 0 && (
              <View>
                <Text style={styles.bold}>{"Concepts: "}</Text>
                <Text>{skills?.concepts?.join(", ")}</Text>
              </View>
            )}
          </Text>
          <Text style={styles.text}>
            {skills!.services!.length > 0 && (
              <View>
                <Text style={styles.bold}>{"Services: "}</Text>
                <Text>{skills?.services?.join(", ")}</Text>
              </View>
            )}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Education</Text>
          {educations.map((education) => (
            <View style={styles.subsection}>
              <View style={[styles.inline, styles.bold]}>
                <Text style={styles.text}>{createArray(education.degree, education.major).join(",")}</Text>
                <Text style={[styles.text, styles.right]}>{education.gpa ? `GPA: ${education.gpa}` : ""}</Text>
              </View>
              <Text style={styles.text}>{education.school}</Text>
              <Text style={[styles.text, styles.italic]}>
                {createArray(education.start, education.graduated ? education.end : "Present").join(" - ")}
                <Text>{education.graduated ? " Graduated" : ""}</Text>
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Experiences</Text>
          {experiences.map((experience) => (
            <View style={styles.subsection}>
              <View style={[styles.inline, styles.bold]}>
                <Text style={styles.text}>{createArray(experience.position, experience.company).join(" @ ")}</Text>
                <Text style={[styles.text, styles.right, styles.bolditalic]}>
                  {createArray(experience.start, experience.end ? experience.end : "Present").join(" - ")}
                </Text>
              </View>
              <View>
                {experience.details?.map((detail) => (
                  <Text style={[styles.text, styles.list]}>{detail}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Projects</Text>
          {projects.map((project) => (
            <View style={styles.subsection}>
              <View>
                <Text style={[styles.text, styles.bold]}>{project.name ?? ""}</Text>
                {/* <Text style={styles.text}>{createArray(project.start, project.end ? project.end : "Present").join(" - ")}</Text> */}
              </View>
              <View>
                {project.details?.map((detail) => (
                  <Text style={[styles.text, styles.list]}>{detail}</Text>
                ))}
                {project!.tools!.length > 0 && (
                  <View style={[styles.inline, styles.list]}>
                    <Text style={[styles.text, styles.bold]}>{"Tools: "}</Text>
                    <Text style={[styles.text, styles.italic]}>{skills?.tools?.join(", ")}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 8,
    lineHeight: 1.35,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
  },
  section: {
    marginTop: 14,
  },
  subsection: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
  },
  text: {
    fontSize: 11,
  },
  inline: {
    flexDirection: "row",
    display: "flex",
  },
  right: {
    flex: 1,
    textAlign: "right",
  },
  list: {
    marginLeft: 8,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
  },
  bolditalic: {
    fontFamily: "Helvetica-BoldOblique",
  },
});
