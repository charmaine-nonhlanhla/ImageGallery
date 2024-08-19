import { Container, Loader, Card, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Photo } from "../../app/layout/models/photo";
import { useEffect } from "react";

export const PhotoLibrary = observer(() => {
    const { photoStore, userStore } = useStore();
    let username = userStore.user?.userName;
    const { loadingPhotos, filterUserPhotos, loadUserPhotos } = photoStore;

    useEffect(() => {
        userStore.getUser().finally(() => {
            username = userStore.user?.userName;
            if (username) {
                loadUserPhotos(username);
            }
        });
    }, [username, loadUserPhotos]);

    if (loadingPhotos) return <Loader active inline="centered" />;

    const photos = filterUserPhotos(); 

    return (
        <Container>
            <Card.Group>
                {photos.length > 0 ? (
                    photos.map((photo: Photo) => (
                        <Card key={photo.id}>
                            <Image src={photo.url} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{photo.photoTitle}</Card.Header>
                                <Card.Description>{photo.photoDescription}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <div>No photos available</div>
                )}
            </Card.Group>
        </Container>
    );
});
