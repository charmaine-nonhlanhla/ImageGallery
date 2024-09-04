import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import Comments from '../Comments/Comments';

const PhotoDetails: React.FC = observer(() => {
    const { photoStore } = useStore();
    const selectedPhoto = photoStore.selectedPhoto;

    useEffect(() => {
    }, [photoStore.selectedPhoto]);

    if (!selectedPhoto) {
        return <div>Select a photo to view details.</div>;
    }

    return (
        <div className="photo-details">
            <h2>{selectedPhoto.photoTitle}</h2>
            <img src={selectedPhoto.url} alt={selectedPhoto.photoTitle} />
            <p>{selectedPhoto.photoDescription}</p>
            <Comments photoId={selectedPhoto.id} />
        </div>
    );
});

export default PhotoDetails;
