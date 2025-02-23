import Barcode from 'react-barcode';
import QRCode from 'qrcode';
import React from 'react';

interface BarcodeQrDisplayProps {
  value: string;
  type: 'barcode' | 'qr';
}

export const BarcodeQrDisplay = ({ value, type }: BarcodeQrDisplayProps) => {
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (type === 'qr' && value) {
      QRCode.toDataURL(value, { width: 256 })
        .then((url: React.SetStateAction<string | null>) => setQrDataUrl(url))
        .catch(console.error);
    }
  }, [value, type]);

  if (!value) return null;

  return (
    <div className="code-container">
      {type === 'barcode' ? (
        <Barcode value={value} height={50} displayValue={false} />
      ) : (
        qrDataUrl && (
          <img 
            src={qrDataUrl} 
            alt="QR Code" 
            style={{ 
              width: '100%', 
              maxWidth: '256px',
              margin: '0 auto',
              display: 'block'
            }}
          />
        )
      )}
    </div>
  );
};