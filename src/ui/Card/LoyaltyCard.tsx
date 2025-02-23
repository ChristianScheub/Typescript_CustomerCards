import { StoreLogo } from '../StoreLogo';
import { BarcodeQrDisplay } from '../BarcodeQrDisplay';
import { CardActions } from './CardActions';

interface LoyaltyCardProps {
  storeId: string;
  cardName: string;
  cardNumber: string;
  barcodeValue: string;
  codeType: 'barcode' | 'qr';
  onEdit: () => void;
  onDelete: () => void;
}

export const LoyaltyCard = ({
  storeId,
  cardName,
  cardNumber,
  barcodeValue,
  codeType,
  onEdit,
  onDelete,
}: LoyaltyCardProps) => (
  <div className="loyalty-card">
    <StoreLogo storeId={storeId} size="medium" />
    <h3>{cardName}</h3>
    <p className="card-number">{cardNumber}</p>
    <BarcodeQrDisplay value={barcodeValue} type={codeType} />
    <CardActions onEdit={onEdit} onDelete={onDelete} />
  </div>
);