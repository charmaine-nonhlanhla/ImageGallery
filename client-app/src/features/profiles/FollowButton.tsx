import { Button, Reveal, RevealContent } from "semantic-ui-react";
import { Profile } from "../../app/layout/models/profile";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent } from "react";

interface Props {
    profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
    const {profileStore, userStore} = useStore();
    const {updateFollowing, loading} = profileStore;

    if (userStore.user?.username === profile.username) return null;

    function handleFollow(e: SyntheticEvent, username: string) {
        if (!username) return;
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    return (
        <Reveal animated="move">
        <RevealContent visible style={{ width: '100%' }}>
            <Button fluid 
            color='teal' 
            content={profile.following ? 'Following' : 'Not following'} 
            />
        </RevealContent>
        <RevealContent hidden style={{ width: '100%' }}>
            <Button
                fluid 
                basic
                color={profile.following ? 'red' : 'green'}
                content={profile.following ? 'Unfollow' : 'Follow'}
                loading={loading}
                onClick={(e) => handleFollow(e, profile.username!)}
                />
        </RevealContent>
        </Reveal>
    )
})