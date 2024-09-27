import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useEffect } from 'react'; 
import './ImageModal.css';
import Comments from '../Comments/Comments';
import { MdChatBubbleOutline } from 'react-icons/md';

interface Props {
    photoId: string;
}

const ImageModal = observer(({photoId}: Props) => {
    const { modalStore, photoStore } = useStore();

    useEffect(() => {
        if (modalStore.modal.open) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [modalStore.modal.open]); 

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

                        <div className="modal-chat-bubble">
                            <MdChatBubbleOutline size={24} />
                        </div>

                    </div>
                )}

                <Comments photoId={photoId} />
            </div>
        </div>
    );
});

export default ImageModal;
