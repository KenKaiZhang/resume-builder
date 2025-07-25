import type { CertificationData } from "@/types";
import { Button } from "../../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import { initialCertification } from "@/constants"; // Assuming you have initialProject

interface CertificationsProps {
  data?: CertificationData[];
  setData: (newValue: CertificationData[]) => void;
}

const Certifications: React.FC<CertificationsProps> = ({
  data = [],
  setData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const key = e.target.id as keyof CertificationData;
    const value = e.target.value;

    const targetCertification: CertificationData = { ...data[i] };
    targetCertification[key] = value;

    const newData = [...data];
    newData[i] = targetCertification;

    setData(newData);
  };

  const handleAdd = () => {
    const newData = [...data, initialCertification];
    setData(newData);
  };

  const handleRemove = (i: number) => {
    const newData = data.filter((_, idx) => idx !== i);
    setData(newData);
  };

  return (
    <section className="flex flex-col gap-4">
      {data.map((entry, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 border-1 px-4 pt-2 pb-4 rounded-lg"
        >
          <div className="flex justify-between">
            <h3>{`Certification ${i + 1}`}</h3>
            <Button variant="ghost" onClick={() => handleRemove(i)}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormInput
                id="issuer"
                type="input"
                label="Issuer"
                value={entry?.issuer}
                placeholder="Amazon Web Services"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                id="date"
                type="input"
                label="Date Issued"
                value={entry?.date}
                placeholder="January 2025"
                onChange={(e) => handleChange(e, i)}
              />
            </div>
          </div>
          <div>
            <FormInput
              id="title"
              type="input"
              label="Certification Title"
              value={entry?.title}
              placeholder="AWS Certified AI Practitioner"
              onChange={(e) => handleChange(e, i)}
            />
          </div>
        </div>
      ))}
      <Button onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Add New Certification</p>
      </Button>
    </section>
  );
};

export default Certifications;
