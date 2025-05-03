import { Card } from "react-bootstrap";
import CodeToTextParser from "./codeToTextParser";
import React from "react";
import { useTranslation } from "react-i18next";

const Datenschutz: React.FC = () => {
  const { t } = useTranslation();
  const lines = Array.from({ length: 34 }, (_, i) =>
    t(`privacy.line_${i + 1}`)
  );

  return (
    <div>
      <div
        style={{
          marginTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="after-login-container">
          <Card className="mb-3 margin2vw">
            <Card.Header as="h2">Infos</Card.Header>
            <Card.Body>
              {lines.map((line, index) => (
                <CodeToTextParser key={index} code={line} />
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
