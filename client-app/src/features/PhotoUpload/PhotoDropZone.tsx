import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiUploadCloud2Line } from 'react-icons/ri';

interface Props {
    setFiles: (files: any) => void;
}

const PhotoDropzone: React.FC<Props> = ({ setFiles }) => {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200,
        cursor: 'pointer'
    };

    const dzActive = {
        borderColor: 'green'
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className='upload-cloud' {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
            <input {...getInputProps()} />
            <RiUploadCloud2Line name='upload' className='cloud' size='huge' />
        </div>
    );
};

export default PhotoDropzone;
