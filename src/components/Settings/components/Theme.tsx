import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Divider from "@/components/ui/divider";
import { themeOptions } from "@/constants";

const Theme = () => {
  const [theme, setTheme] = useState(themeOptions.light);

  const handleClick = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      setTheme(themeOptions.dark);
    } else {
      setTheme(themeOptions.light);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <b className="font-semibold">Theme</b>
        <Button variant="outline" onClick={handleClick}>
          <FontAwesomeIcon icon={theme.icon} />
          <p>{theme.label}</p>
        </Button>
      </div>
      <Divider />
    </>
  );
};

export default Theme;