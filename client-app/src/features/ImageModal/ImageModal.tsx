import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import './ImageModal.css';
import Comments from '../Comments/Comments';

interface Props {
    photoId: string;
}

const ImageModal = observer(({photoId}: Props) => {
    const { modalStore, photoStore } = useStore();

    if (!modalStore.modal.open) return null;


    const photo = photoStore.selectedPhoto;

    return (
        <div className="image-modal-overlay">
            <div className="image-modal-content">
                <span className="close-button" onClick={modalStore.closeModal}>×</span>

                {photo && (
                    <div className="modal-image-content">
                        <img src={photo.url} alt={photo.photoTitle} />


                        <div className="image-info">
                            <h3>{photo.photoTitle}</h3>
                            <p>{photo.photoDescription}</p>
                        </div>
                    </div>
                )}


                <Comments photoId={photoId} />
            </div>
        </div>
    );
});

export default ImageModal;
