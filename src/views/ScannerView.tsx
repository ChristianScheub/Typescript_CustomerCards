type Props = {
  onScan: () => void;
  onError: (message: string) => void;
  scanResult?: string;
};

export const ScannerView = ({ onScan,scanResult }: Props) => (
  <div className="scanner-wrapper">
    <button onClick={onScan} className="scan-trigger">
      Scan starten
    </button>

    {scanResult && (
      <div className="scan-result">Gescannter Code: {scanResult}</div>
    )}
  </div>
);
