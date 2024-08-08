import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button, ButtonGroup, Grid, GridColumn, Header } from 'semantic-ui-react';
import { RiUploadCloud2Line } from 'react-icons/ri';
import './PhotoDropZone.css'; // Import the CSS file

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

const PhotoDropZone: React.FC<Props> = ({ loading, uploadPhoto }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <GridColumn width={4}>
        <Header sub color="teal" content="" />
        {files && files.length > 0 ? (
          <>
            <Cropper
              className='cropper'
              src={files[0].preview}
              aspectRatio={NaN}  
              preview=".img-preview"
              guides={false}
              viewMode={2}        
              autoCropArea={1}    
              background={false}
              responsive={true}   
              onInitialized={(cropper) => setCropper(cropper)}
            />
            <div className="img-preview" />
            <ButtonGroup className="click-close" widths={2}>
              <Button loading={loading} onClick={onCrop} positive icon="check" />
              <Button disabled={loading} onClick={() => setFiles([])} icon="close" />
            </ButtonGroup>
          </>
        ) : (
          <div {...getRootProps()} className={isDragActive ? 'dropzone dropzone-active' : 'dropzone'}>
            <input {...getInputProps()} />
            <RiUploadCloud2Line name="upload" className="cloud" />
            <Header content="" />
          </div>
        )}
      </GridColumn>
    </Grid>
  );
};

export default PhotoDropZone;
