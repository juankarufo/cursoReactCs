import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
    return (
        <Grid>
            <Grid.Column>
                <ProfileHeader />
            </Grid.Column>
        </Grid>
    )
}