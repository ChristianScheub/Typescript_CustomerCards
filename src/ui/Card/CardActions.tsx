import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const CardActions = ({ onEdit, onDelete }: CardActionsProps) => (
  <div className="card-actions">
    <IconButton aria-label="edit" onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton aria-label="delete" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </div>
);