import { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Photo } from '../../app/layout/models/photo';
import './PhotoLibrary.css';
import PhotoDetails from './PhotoDetails';

export const PhotoLibrary = observer(() => {
    const { photoStore, userStore } = useStore();
    const username = userStore.user?.userName;
    const { loadingPhotos, loadUserPhotos, photos, selectPhoto, selectedPhoto } = photoStore;

    useEffect(() => {
        if (username) {
            loadUserPhotos(username);
        }
    }, [username, loadUserPhotos]);

    if (loadingPhotos) return <Loader active />;

    const handlePhotoClick = (photoId: string) => {
        selectPhoto(photoId); 
    };

    return (
        <div className="photo-library">
            <div className="images-container">
                {photos.length > 0 ? (
                    photos.map((photo: Photo) => (
                        <div 
                            key={photo.id} 
                            className={`image-item ${photo.id === selectedPhoto?.id ? 'selected' : ''}`}
                            onClick={() => handlePhotoClick(photo.id)}
                        >
                            <img width={500} src={photo.url} alt={photo.photoTitle} />
                            <p className="image-title">{photo.photoTitle}</p>
                            {/* <div>
                                <VscComment />
                                <Comments photoId={photo.id} />
                            </div> */}
                        </div>
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>
            <PhotoDetails />
        </div>
    );
});
