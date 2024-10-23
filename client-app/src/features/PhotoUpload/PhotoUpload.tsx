import { Container } from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyDropdownInput from "../../app/common/form/MyDropdownInput";
import { useStore } from "../../app/stores/store";
import "./PhotoUpload.css";
import React, { useState, useEffect } from "react";
import PhotoDropZone from "./PhotoDropZone";
import agent from "../../app/api/agent";

const initialValues = {
  phototitle: "",
  categoryId: "",
  photodescription: "",
};

const validationSchema = Yup.object({
  phototitle: Yup.string().required("Image title is required"),
  categoryId: Yup.string().required("Category is required"),
  photodescription: Yup.string().required("Description is required"),
});

export const PhotoUpload: React.FC = () => {
  const { profileStore, photoStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [, setAddPhotoMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);

  useEffect(() => {
    if (photoStore.categories.length === 0) {
      photoStore.loadCategories();
    }
  }, [profileStore]);

  const categoryOptions = photoStore.categories.map((category) => ({
    key: category.categoryId,
    text: category.categoryName,
    value: category.categoryId,
  }));

  const handlePhotoUpload = async (
    file: Blob,
    photoTitle: string,
    categoryId: string,
    photoDescription: string
  ) => {
    setLoading(true);
    try {
      await agent.Profiles.uploadPhoto(
        file,
        photoTitle,
        parseInt(categoryId),
        photoDescription
      );
      setAddPhotoMode(false);
    } catch (error) {
      console.error("Error uploading photo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelected = (file: Blob) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (
    values: {
      phototitle: string;
      categoryId: string;
      photodescription: string;
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    await handlePhotoUpload(
      selectedFile,
      values.phototitle,
      values.categoryId,
      values.photodescription
    );
    resetForm();
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
                <Field
                  className="title-input"
                  placeholder=""
                  name="phototitle"
                />
                <ErrorMessage
                  name="phototitle"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-field">
                <label className="input-field">Image Category</label>
                <Field
                  className="category-input"
                  as={MyDropdownInput}
                  placeholder="Select category"
                  name="categoryId"
                  options={categoryOptions}
                />
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-field">
                <label className="input-field">Image Description</label>
                <Field className="text-area" name="photodescription" />
                <ErrorMessage
                  name="photodescription"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="button-div">
                <PhotoDropZone
                  loading={loading}
                  uploadPhoto={handleFileSelected}
                />

                <button
                  className="upload-button"
                  type="submit"
                  disabled={isSubmitting || !selectedFile}
                >
                  {isSubmitting ? "Uploading..." : "Upload"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
