type Profile = {
  first?: string;
  middle?: string;
  last?: string;
  address?: string;
  phone?: string;
  email?: string;
  links?: string[];
  objective?: string;
};

type Education = {
  id?: string;
  school?: string;
  city?: string;
  state?: string;
  country?: string;
  degree?: string;
  major?: string;
  start?: string;
  end?: string;
  graduated?: boolean;
  electives?: string[];
  gpa?: string;
};

type Experience = {
  id?: string;
  position?: string;
  company?: string;
  city?: string;
  state?: string;
  country?: string;
  start?: string;
  end?: string;
  details?: string[];
};

type Project = {
  id?: string;
  name?: string;
  tools?: string[];
  details?: string[];
};

type Skill = {
  tools?: string[];
  concepts?: string[];
  services?: string[];
};

type Resume = {
  user: User;
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  skills?: Skill;
};
