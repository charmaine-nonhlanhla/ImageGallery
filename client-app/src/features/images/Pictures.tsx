import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import './Pictures.css'; 

const Pictures: React.FC = observer(() => {
  const { profileStore } = useStore(); 
  const { photos, loading, loadPhotos } = profileStore;

  useEffect(() => {
    loadPhotos(); 
  }, [loadPhotos]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pictures-container">
      {photos.length > 0 ? (
        photos.map(photo => (
          <div key={photo.id} className="picture-item">
            <img src={photo.url} alt={photo.photoTitle} />
            <p>{photo.photoTitle}</p>
          </div>
        ))
      ) : (
        <p>No photos available</p>
      )}
    </div>
  );
});

export default Pictures;
