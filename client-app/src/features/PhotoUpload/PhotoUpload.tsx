import { Container } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyDropdownInput from '../../app/common/form/MyDropdownInput';
import { useStore } from '../../app/stores/store';
import './PhotoUpload.css';
import React, { useState, useEffect } from 'react';
import PhotoDropZone from './PhotoDropZone'; // Adjust the import path if necessary
import agent from '../../app/api/agent';

const initialValues = {
  phototitle: '',
  categoryId: '',
  photodescription: '',
};

const validationSchema = Yup.object({
  phototitle: Yup.string().required('Image title is required'),
  categoryId: Yup.string().required('Category is required'),
  photodescription: Yup.string().required('Description is required'),
});

export const PhotoUpload: React.FC = () => {
  const { profileStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [, setAddPhotoMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);

  useEffect(() => {
    if (profileStore.categories.length === 0) {
      profileStore.loadCategories();
    }
  }, [profileStore]);

  const categoryOptions = profileStore.categories.map(category => ({
    key: category.categoryId,
    text: category.categoryName,
    value: category.categoryId
  }));

  const handlePhotoUpload = async (file: Blob, photoTitle: string, categoryId: string, photoDescription: string) => {
    setLoading(true);
    try {
        await agent.Profiles.uploadPhoto(file, photoTitle, parseInt(categoryId), photoDescription);
        setAddPhotoMode(false);
    } catch (error) {
        console.error("Error uploading photo", error);
        // You can add more error handling logic here
    } finally {
        setLoading(false);
    }
  };

  const handleFileSelected = (file: Blob) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (values: { phototitle: string; categoryId: string; photodescription: string }) => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    await handlePhotoUpload(selectedFile, values.phototitle, values.categoryId, values.photodescription);
  };

  return (
    <Container>
      <div className="photo-upload-frame">
        <h1 className="header-text">Image Upload</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-field">
                <label className="input-field">Image Title</label>
                <Field className="title-input"
                  placeholder=""
                  name="phototitle"
                />
                <ErrorMessage name="phototitle" component="div" className="error-message" />
              </div>

              <div className="form-field">
                <label className="input-field">Image Category</label>
                <Field className="category-input" as={MyDropdownInput}
                  placeholder="Select category"
                  name="categoryId"
                  options={categoryOptions}
                />
                <ErrorMessage name="categoryId" component="div" className="error-message" />
              </div>

              <div className="form-field">
                <label className="input-field">Image Description</label>
                <Field as="textarea" className="text-area"
                  placeholder=""
                  name="photodescription"
                />
                <ErrorMessage name="photodescription" component="div" className="error-message" />
              </div>

              <div className="button-div">
                <PhotoDropZone loading={loading} uploadPhoto={handleFileSelected} />
                <span className="drop-text">
                  <p>Drag and Drop Files</p>
                  <p>or</p>
                </span>
                <button className="upload-button" type="submit" disabled={isSubmitting || !selectedFile}>
                  {isSubmitting ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
