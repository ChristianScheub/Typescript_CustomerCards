import Fab from '@mui/material/Fab';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface ScanButtonProps {
  onClick: () => void;
}

export const ScanButton = ({ onClick }: ScanButtonProps) => (
  <Fab
    color="primary"
    aria-label="scan"
    className="scan-fab"
    onClick={onClick}
  >
    <CameraAltIcon />
  </Fab>
);