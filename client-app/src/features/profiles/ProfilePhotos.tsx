import { observer } from "mobx-react-lite";
import { Card, CardGroup, Header, TabPane, Image, Grid, GridColumn, Button, GridRow, ButtonGroup } from "semantic-ui-react";
import { Profile } from "../../app/layout/models/profile";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../app/stores/store";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo } from "../../app/layout/models/photo";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const {profileStore:  isCurrentUser }  = useStore(); 
    const {profileStore: { uploading, loading } }  = useStore();
    const {photoStore: { uploadPhoto, setMainPhoto, deletePhoto } }  = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));

    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e. currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <TabPane>
            <Grid>
                <GridRow>
                <GridColumn width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    { (isCurrentUser &&
                        <Button floated='right' basic 
                        content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                        onClick={() => setAddPhotoMode(!addPhotoMode)} />
                    )}
                </GridColumn>
                    </GridRow>
                    <GridRow>

                <GridColumn width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                        ) : (
                            <CardGroup itemsPerRow={5}>
                        {profile.photos?.map(photo => (
                            <Card key={photo.id}>
                               <Image src={photo.url} />
                                {isCurrentUser && (
                                    <ButtonGroup fluid widths={2}>
                                        <Button 
                                            basic 
                                            color='green'
                                            content='Main'
                                            name={'main' + photo.id}
                                            disabled={photo.isMain}
                                            loading={target === 'main' + photo.id && loading} 
                                            onClick={e => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button 
                                            basic 
                                            color='red' 
                                            icon='trash'
                                            name={photo.id}
                                            loading={target === photo.id && loading}
                                            onClick={e => handleDeletePhoto(photo, e)}
                                             />
                                    </ButtonGroup>
                                )}
                           </Card>
                        ))}
                    </CardGroup>
                    )}
                </GridColumn>
                </GridRow>
            </Grid>
        </TabPane>
    );
});