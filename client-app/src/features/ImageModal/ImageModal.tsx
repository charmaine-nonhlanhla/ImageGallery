import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import './ImageModal.css'; 
import Comments from '../Comments/Comments';

interface Props {
    photoId: string;
}


const ImageModal = observer(({photoId}: Props) => {
    const { modalStore } = useStore();

    if (!modalStore.modal.open) return null; 

    return (
        <div className="image-modal-overlay">
            <div className="image-modal-content">
                <span className="close-button" onClick={modalStore.closeModal}>×</span>
                {modalStore.modal.body}
                <Comments photoId={photoId} />
            </div>
        </div>
    );
});

export default ImageModal;
