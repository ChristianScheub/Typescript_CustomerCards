import { NavigateFunction } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ViewInfo from "../views/InfoScreen/InfoView";
import Logger from "../services/Logger/logger";
const ContainerInfo: React.FC = () => {
  const [currentLogs, setCurrentLogs] = useState<string | null>(null);
  
  const loadCurrentLogs = () => {
    const logs = localStorage.getItem("app_logs");
    setCurrentLogs(logs);
  };

  useEffect(() => {
    loadCurrentLogs();
  }, []);

  const handleDeleteLogs = () => {
    Logger.deleteLogs();
    loadCurrentLogs();
  };
  const refreshLogs = () => {
    Logger.info("Refresh Logs in Info Screen")
    loadCurrentLogs();
  }
  
  const { t } = useTranslation();

  const isInfoStart = location.pathname.includes("infoStart");

  const handleImpressumClick = (navigate: NavigateFunction) => {
    if(isInfoStart){
      navigate("/impressumStart");
    }
    else{
      navigate("/impressum");
    }
  };
  const handleDatenschutzClick = (navigate: NavigateFunction) => {
    if(isInfoStart){
      navigate("/datenschutzStart");
    }
    else{
      navigate("/datenschutz");
    }
  };
  
  const handleDeleteAllClick = async (): Promise<void> => {
    if (window.confirm(t("settings_Dialog_DeleteAll"))) {
      localStorage.clear();
  
      if ("indexedDB" in window) {
        if (window.indexedDB.databases) {
          const databases = await window.indexedDB.databases();
          databases.forEach((db) => {
            if (db.name) {
              const req = window.indexedDB.deleteDatabase(db.name);
              req.onerror = (event) => {
                Logger.error(`Error while deleting database in loop ${db.name}: ${JSON.stringify(event)}`);
              };              
              req.onsuccess = () => {
                Logger.info(`Database ${db.name} deleted.`);
              };
            }
          });
        } else {
          const dbName = "customer_cards_db";
          const req = window.indexedDB.deleteDatabase(dbName);
          req.onerror = (event) => {
            Logger.error(`Error while deleting database by name ${dbName}: ${JSON.stringify(event)}`);
          };
          req.onsuccess = () => {
            Logger.info(`Database ${dbName} deleted.`);
          };
        }
      }
      alert(t("settings_Dialog_DeleteAllSuccessful"));
    }
  };
  
  return (
      <ViewInfo
        onDatenschutzClick={handleDatenschutzClick}
        onImpressumClick={handleImpressumClick}
        onDeleteAllClick={handleDeleteAllClick}
        onExportLogs={() => {
          Logger.exportLogs();
        }}
        onDeleteLogs={handleDeleteLogs}
        currentLogs={currentLogs}
        onRefreshLogs={refreshLogs}
      />
  );
};

export default ContainerInfo;