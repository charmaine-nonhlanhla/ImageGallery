import { Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Photo } from "../../app/layout/models/photo";
import { VscComment } from "react-icons/vsc";
import { useEffect } from "react";
import './PhotoLibrary.css'
import Comments from "../Comments/Comments";

export const PhotoLibrary = observer(() => {
    const { photoStore, userStore } = useStore();
    const username = userStore.user?.userName;
    const { loadingPhotos, loadUserPhotos, photos } = photoStore;

    useEffect(() => {
        if (username) {
            loadUserPhotos(username);
        }
    }, [username, loadUserPhotos]);

    if (loadingPhotos) return <Loader active inline="centered" />;

    return (
        <div className="images-container">
            {photos.length > 0 ? (
                photos.map((photo: Photo) => (
                    <div key={photo.id} className="image-item">
                        <img width={510} src={photo.url} alt={photo.photoTitle} />
                        <p className="image-details-text">{photo.photoTitle}</p>
                        <div>
                            <VscComment/>
                            <Comments photoId={photo.id} />
                            </div>
                    </div>
                ))
            ) : (
                <p>No photos available</p>
            )}
        </div>
    );    
});
