import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
    return (
        <Grid>
            <Grid.Column>
                <ProfileHeader />
                <ProfileContent />
            </Grid.Column>
        </Grid>
    )
}