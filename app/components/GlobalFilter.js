import React from "react";
import { useTranslation } from "react-i18next";

export const GlobalFilter = ({ filter, setFilter }) => {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <input
        className="bg-gray-100 border border-gray-300 p-2 rounded-md w-full"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={t("search")}
      />
    </div>
  );
};
