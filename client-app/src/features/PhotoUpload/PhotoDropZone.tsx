import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { RiUploadCloud2Line } from 'react-icons/ri';
import './PhotoDropZone.css'; 

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
    <div className="photo-dropzone">
      {files && files.length > 0 ? (
        <div className="cropper-container">
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
          <div className="button-group">
            <button 
              className="button button-positive"
              disabled={loading}
              onClick={onCrop}
            >
              {loading ? 'Processing...' : 'Crop'}
            </button>
            <button 
              className="button button-negative"
              disabled={loading}
              onClick={() => setFiles([])}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className={isDragActive ? 'dropzone dropzone-active' : 'dropzone'}>
          <input {...getInputProps()} />
          <RiUploadCloud2Line className="cloud-icon" />
            <span className="drop-text">
                  <p className='drag-text'>Drag and Drop Files</p>
                  <p>or</p>
                </span>
        </div>
      )}
    </div>
  );
};

export default PhotoDropZone;
