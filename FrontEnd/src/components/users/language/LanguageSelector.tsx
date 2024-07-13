import React, { useState, useEffect, useRef } from "react";
import us from "../../../assests/US.svg";
import vn from "../../../assests/VN.svg";
import down from "../../../assests/chevron-down.svg";
import { useTranslation } from "react-i18next";
import "./LanguageSelector.css"; // Assuming you have this CSS file

interface LanguageSelectorProps {
  // No props passed in this example
}

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<string>(us);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChoose = (lang: string) => {
    const currentLang = lang === us ? "en" : "vi";
    i18n.changeLanguage(currentLang);
    localStorage.setItem("lang", currentLang);
    setLang(lang);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const curLang = localStorage.getItem("lang");
    if (curLang) {
      setLang(curLang === "vi" ? vn : us);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="translate relative inline-flex flex-row-reverse"
      ref={dropdownRef}>
      <button
        className="language-selector-button-1 py-2 px-4 inline-flex items-center gap-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-28 mr-2"
        onClick={toggleMenu}>
        <img
          className="w-5 h-auto rounded-full"
          src={lang}
          alt="current language"
        />
        <span className="font-medium truncate">
          {lang === vn ? "VI" : "US"}
        </span>
        <img
          src={down}
          className={`w-4 transform ${isOpen ? "rotate-180" : ""}`}
          alt="chevron-down"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 w-40 bg-white shadow-lg rounded-lg py-2 mt-1 z-50">
          <button
            className="language-selector-button flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none  w-full"
            onClick={() => handleChoose(us)}>
            <img src={us} className="w-4 rounded-full" alt="English (US)" />
            <span>English (US)</span>
          </button>
          <button
            className="language-selector-button flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 w-full"
            onClick={() => handleChoose(vn)}>
            <img src={vn} className="w-4 rounded-full" alt="Việt Nam (VI)" />
            <span>Việt Nam (VI)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
