import { useTranslation } from "react-i18next";
import { setCookie } from "cookies-next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setCookie("lang", newLanguage);
  };

  return (
    <select className="bg-red-500" value={i18n.language} onChange={changeLanguage}>
      <option value="en">EN</option>
      <option value="sk">SK</option>
    </select>
  );
}

export default LanguageSwitcher;
