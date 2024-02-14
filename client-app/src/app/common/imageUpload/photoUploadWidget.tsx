import { Button, Grid, Header, Image } from "semantic-ui-react";
import { PhotoWidgetDropzone } from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface Props {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
}

export default function PhotoUploadWidget ({uploadPhoto,loading}: Props) {
    const[files, setFiles] = useState<any>([]);
    const[cropper, setCropper ] = useState<Cropper>();

    function onCrop () {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob( blob => uploadPhoto(blob!));
        }
    }

    useEffect( () => {
        return () => {
            files.forEach((file:any) => URL.revokeObjectURL(file.prevew))
        }
        
    }, [files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 1 - Add Photo'></Header>
                <PhotoWidgetDropzone setFiles = {setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 2 - Resize image'></Header>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 3 - Preview and upload' />
                {files && files.length > 0 &&
                <>
                    <div className="img-preview" style={{minHeight: 200, overflow: 'hidden'}}/>
                    <Button.Group>
                        <Button loading={loading} onClick={onCrop} positive icon='check' />
                        <Button loading={loading} onClick={ () => setFiles([]) } icon='close' />
                    </Button.Group>
                </>
            } 
            </Grid.Column>
        </Grid>
    )
}