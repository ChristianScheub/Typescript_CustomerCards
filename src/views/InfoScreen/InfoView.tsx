import { useNavigate, NavigateFunction } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import UsedLibsListContainer from "../../legal/usedLibs/container_usedLibList";
import { featureFlag_Debug_Settings_View } from "../../config/featureFlags";

interface ViewInfoProps {
  onDatenschutzClick: (navigate: NavigateFunction) => void;
  onImpressumClick: (navigate: NavigateFunction) => void;
  onExportLogs: () => void;
  onDeleteLogs: () => void;
  onDeleteAllClick: () => void;
  currentLogs: string | null;
  onRefreshLogs: () => void;
}

const ViewInfo: React.FC<ViewInfoProps> = ({
  onDatenschutzClick,
  onImpressumClick,
  onExportLogs,
  onDeleteLogs,
  onDeleteAllClick,
  currentLogs,
  onRefreshLogs
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="adjustmentTextColor width100 fillScreen"
      style={{
        paddingLeft: "3vw",
        backgroundColor: featureFlag_Debug_Settings_View ? "gray" : "inherit",
      }}
    >
      <div>
        <br />
        <br />
        <br />

        <div>
          <div className="mb-3 margin2vw">
            <h1>{t("settings_Title")}</h1>
            <hr />
            <p
              data-testid="settings-delete-all"
              onClick={() => onDeleteAllClick()}
            >
              {t("settings_DeleteAll")}
            </p>
            <hr />
            
            <h1>{t("settings_Information")}</h1>
            <hr />
            <p
              data-testid="settings-edatenschutz"
              onClick={() => onDatenschutzClick(navigate)}
            >
              {t("settings_Datenschutz")}
            </p>
            <hr />
            <p
              data-testid="settings-impressum"
              onClick={() => onImpressumClick(navigate)}
            >
              {t("settings_Impressum")}
            </p>
            <hr />
            <UsedLibsListContainer />
            <hr />
            <a
              href="https://github.com/ChristianScheub/Typescript_CustomerCards"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <p>{t("settings_GitHubRepo")}</p>
            </a>
          
            <hr />
            <br /> <br /> <br /> <br /> <br />
          </div>

          {featureFlag_Debug_Settings_View && (
            <>
              <div className="mb-3 margin2vw">
                <h1>Developer Options</h1>
                <hr />
                <p data-testid="settings-impressum" onClick={onRefreshLogs}>
                  Refresh Logs
                </p>
                <hr />
                <p data-testid="settings-impressum" onClick={onExportLogs}>
                  Export Logs
                </p>
                <hr />
                <p data-testid="settings-impressum" onClick={onDeleteLogs}>
                  Delete Logs
                </p>
                <hr />
                <hr />
              </div>

              <h3> Logs:</h3>
              <p
                style={{
                  maxWidth: "80vw",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {currentLogs}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInfo;
