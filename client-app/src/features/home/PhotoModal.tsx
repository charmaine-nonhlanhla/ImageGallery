// PhotoModal.tsx
import './PhotoModal.css';
import { IoCloseCircleOutline } from "react-icons/io5";

interface PhotoModalProps {
  onClose: () => void;
  src: string;
  description: string;
}

export const PhotoModal = ({ onClose, src, description }: PhotoModalProps) => {
  return (
    <div className="modal">
        <IoCloseCircleOutline className='close' onClick={onClose} />
        <img className="photo-modal" src={src} alt="" />
        <p className="modal-description">{description}</p>
    </div>
  );
}
