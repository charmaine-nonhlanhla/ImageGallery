import { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Photo } from '../../app/layout/models/photo';
import './PhotoLibrary.css';
import ImageModal from '../ImageModal/ImageModal'

export const PhotoLibrary = observer(() => {
    const { photoStore, userStore, modalStore } = useStore();
    const username = userStore.user?.userName;
    const { loadingPhotos, loadUserPhotos, photos, selectPhoto, selectedPhoto } = photoStore;

    useEffect(() => {
        if (username) {
            loadUserPhotos(username);
        }
    }, [username, loadUserPhotos]);

    if (loadingPhotos) return <Loader active />;

    const handlePhotoClick = (photo: Photo) => {
        selectPhoto(photo.id); 
        modalStore.openModal(
            <div className="modal-image-content">
                <img  src={photo.url} alt={photo.photoTitle} />
                <h3>{photo.photoTitle}</h3>
                <p>{photo.photoDescription}</p>
            </div>
        );
    };

    return (
        <div className="photo-library">
             <h2 className="library-title">My Library</h2>
            <div className="images-container">
                {photos.length > 0 ? (
                    photos.map((photo: Photo) => (
                        <div 
                            key={photo.id} 
                            className={`image-item ${photo.id === selectedPhoto?.id ? 'selected' : ''}`}
                            onClick={() => handlePhotoClick(photo)}
                        >
                            <img className="image-display" src={photo.url} alt={photo.photoTitle} />
                            <p className="image-title">{photo.photoTitle}</p>
                        </div>
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>
            <ImageModal /> 
        </div>
    );
});
