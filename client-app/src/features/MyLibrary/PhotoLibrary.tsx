import { Container, Loader, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Photo } from "../../app/layout/models/photo";
import { useEffect, useState } from "react";
import './PhotoLibrary.css'; // Ensure to create and include appropriate CSS

export const PhotoLibrary = observer(() => {
    const { photoStore, userStore } = useStore();
    const [filterVisible, setFilterVisible] = useState(false);
    const username = userStore.user?.userName;
    const { loadingPhotos, loadUserPhotos, photos } = photoStore;

    useEffect(() => {
        if (username) {
            loadUserPhotos(username);
        }
    }, [username, loadUserPhotos]);

    if (loadingPhotos) return <Loader active inline="centered" />;

    return (
        <Container>
            <div className='search-options'>
                <button
                    className='filter-button'
                    onClick={() => setFilterVisible(!filterVisible)}
                >
                    Filters
                </button>
            </div>
            {filterVisible && (
                <div className="category-dropdown">
                    {/* Implement category filtering here if needed */}
                    <div className="category-item" onClick={() => {/* handle category */}}>
                        All
                    </div>
                    {/* Render other categories here if needed */}
                </div>
            )}
            <div className="pictures-container">
                {photos.length > 0 ? (
                    photos.map((photo: Photo) => (
                        <div key={photo.id} className="picture-item">
                            <Image src={photo.url} wrapped ui={false} />
                            <div className="photo-details">
                                <p>{photo.photoTitle}</p>
                                <p>{photo.photoDescription}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>
        </Container>
    );
});
