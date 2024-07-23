import { Profile } from "../../app/layout/models/profile";
import { observer } from "mobx-react-lite";
import { Card, CardContent, CardDescription, CardHeader, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


interface Props {
    profile: Profile;
}

export default observer(function ProfileCard({profile}: Props) {
    return (
        <Card as={Link} t0={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <CardContent>
            <CardHeader>{profile.fullName}</CardHeader>
            <CardDescription> Bio goes here </CardDescription>
            </CardContent>
            <CardContent extra>
                <Icon name="user" />
                20 followers
            </CardContent>
        </Card>
    )

})