import { observer } from "mobx-react-lite";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/photoUploadWidget";
import { Photo } from './../../app/models/profile';

interface Props {
    profile: Profile;
}

export default observer( function ProfilePhotos ({profile}: Props) {
    const {profileStore: {isCurrentUser, uploadPhoto,
         uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const[target, setTarget]= useState(''); 
    const[deleting,setDeleting] = useState(false);
    
    function handlePhotoUpload(file: Blob){
        uploadPhoto(file).then( () => setAddPhotoMode(false))
    }

    function handleSetMainPhoto (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);

    }
    
    function handleDeletePhoto (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setDeleting(true);
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
        setDeleting(false);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon={'image'} content='Photos' />
                    {isCurrentUser && (
                        <Button 
                            floated="right" 
                            basic 
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'} 
                            onClick={ () => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map( (photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button 
                                                basic
                                                color="green"
                                                content='Main'
                                                name={photo.id}
                                                disabled={photo.isMain}
                                                loading={!deleting && target === photo.id && loading}
                                                onClick={e => handleSetMainPhoto(photo,e)}
                                            />
                                            <Button 
                                                basic 
                                                color="red" 
                                                icon='trash' 
                                                disabled={photo.isMain}
                                                loading={target === photo.id && loading}
                                                onClick={e => handleDeletePhoto(photo,e)}
                                                name={photo.id}
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})