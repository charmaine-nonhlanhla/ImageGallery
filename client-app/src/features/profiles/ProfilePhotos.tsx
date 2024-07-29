import { observer } from "mobx-react-lite";
import { Card, CardGroup, Header, TabPane, Image, Grid, GridColumn, Button, GridRow } from "semantic-ui-react";
import { Profile } from "../../app/layout/models/profile";
import { useState } from "react";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const {profileStore: isCurrentUser} = useStore(); 
    const [addPhotoMode, setAddPhotoMode] = useState(false);

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
                        <p>Photo widget goes here</p>
                        ) : (
                            <CardGroup itemsPerRow={5}>
                        {profile.photos?.map(photo => (
                            <Card key={photo.id}>
                               <Image src={photo.url} />
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