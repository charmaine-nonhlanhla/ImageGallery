import { Container } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyDropdownInput from '../../app/common/form/MyDropdownInput';
import { useStore } from '../../app/stores/store';
import './PhotoUpload.css';
import React, { useState } from 'react';
import PhotoDropzone from '../PhotoUpload/PhotoDropZone';
import { RiUploadCloud2Line } from 'react-icons/ri';

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

const handleSubmit = (values: { phototitle: string; categoryId: string; photodescription: string }) => {
  console.log('Submitted Values:', values);
};

export const PhotoUpload: React.FC = () => {
  const { profileStore } = useStore();
  const [, setFiles] = useState<File[]>([]);

  React.useEffect(() => {
    if (profileStore.categories.length === 0) {
      profileStore.loadCategories();
    }
  }, [profileStore]);

  const categoryOptions = profileStore.categories.map(category => ({
    key: category.categoryId,
    text: category.categoryName,
    value: category.categoryId
  }));

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
                <Field className="text-input"
                  placeholder=""
                  name="phototitle"
                />
                <ErrorMessage name="phototitle" component="div" className="error-message" />
              </div>

              <div className="form-field">
                <label className="input-field">Image Category</label>
                <Field as={MyDropdownInput}
                  placeholder="Select category"
                  name="categoryId"
                  options={categoryOptions}
                />
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
                <PhotoDropzone setFiles={setFiles} />
                <div className='upload-icon-container'>
                  <RiUploadCloud2Line className='cloud' />
                </div>
                <span className="drop-text">
                  <p className="">Drag and Drop Files</p>
                  <p>or</p>
                </span>
                <button className="upload-button" type="submit" disabled={isSubmitting}>
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
