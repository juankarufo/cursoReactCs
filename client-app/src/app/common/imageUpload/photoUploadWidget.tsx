import { Grid, Header } from "semantic-ui-react";
import { PhotoWidgetDropzone } from "./photoWidgetDropzone";

export default function PhotoUploadWidget () {
    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 1 - Add Photo'></Header>
                <PhotoWidgetDropzone />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 2 - Resize image'></Header>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 3 - Preview and upload'></Header>
            </Grid.Column>
        </Grid>
    )
}