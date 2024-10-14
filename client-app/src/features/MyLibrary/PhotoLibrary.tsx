import "./PhotoLibrary.css";
import { Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import { useStore } from "../../app/stores/store";
import { Photo } from "../../app/layout/models/photo";
import ImageModal from "../ImageModal/ImageModal";
import { PagingParams } from "../../app/layout/models/pagination";
import { FaList, FaRegTrashAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdChatBubbleOutline,
} from "react-icons/md";

export const PhotoLibrary = observer(() => {
  const { photoStore, userStore, modalStore } = useStore();
  const username = userStore.user?.userName;
  const {
    loadingPhotos,
    loadUserPhotos,
    photos,
    selectPhoto,
    selectedPhoto,
    setPagingParams,
    pagination,
    deletePhoto,
    setMainPhoto,
  } = photoStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [, setCommentVisible] = useState<string | null>(null);
  const [visibleOptions, setOptionsVisible] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (username) {
      loadUserPhotos(username);
    }
  }, [username, loadUserPhotos]);

  if (loadingPhotos) return <Loader active />;

  const handlePhotoClick = (photo: Photo) => {
    selectPhoto(photo.id);
    modalStore.openModal(
      <div className="modal-image-content">
        <img ref={imgRef} src={photo.url} alt={photo.photoTitle} />
        <h3>{photo.photoTitle}</h3>
        <p>{photo.photoDescription}</p>
      </div>
    );
    document.body.classList.add("no-scroll");
  };

  const handleNextPage = () => {
    if (pagination && pagination.currentPage < pagination.totalPages) {
      setLoadingNext(true);
      setPagingParams(new PagingParams(pagination.currentPage + 1));
      loadUserPhotos(username!).then(() => setLoadingNext(false));
    }
  };

  const handlePrevPage = () => {
    if (pagination && pagination.currentPage > 1) {
      setLoadingNext(true);
      setPagingParams(new PagingParams(pagination.currentPage - 1));
      loadUserPhotos(username!).then(() => setLoadingNext(false));
    }
  };

  const handleChatClick = (photo: Photo) => {
    setCommentVisible((prev) => (prev === photo.id ? null : photo.id));
  };

  const handleOptionsClick = (photo: Photo) => {
    selectPhoto(photo.id);
    setOptionsVisible(prev => (prev === photo.id ? null : photo.id));
  };

  const handleDeletePhoto = () => {
    if (selectedPhoto) {
      deletePhoto(selectedPhoto);
      setOptionsVisible(null);
    }
  };

  const handleSetMainPhoto = () => {
    if (selectedPhoto) {
      setMainPhoto(selectedPhoto);
      setOptionsVisible(null);
    }
  };

  return (
    <div className="photo-library">
      <h2 className="library-title">My Library</h2>
      <div className="images-container">
        {photos.length > 0 ? (
          photos.map((photo: Photo) => (
            <div
              key={photo.id}
              className={`image-item ${
                photo.id === selectedPhoto?.id ? "selected" : ""
              }`}
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                className="image-display"
                src={photo.url}
                alt={photo.photoTitle}
              />
              <p className="image-title">{photo.photoTitle}</p>
              <MdChatBubbleOutline
                className="chat-icon"
                size={24}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChatClick(photo);
                }}
              />
              <FaList
                className="image-options"
                size={24}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionsClick(photo);
                }}
              />
              {visibleOptions === photo.id && (
                <div className="photo-options">
                  <CgProfile
                    className="profile-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetMainPhoto();
                    }}
                  >
                    Set as Main Photo
                  </CgProfile>
                  <FaRegTrashAlt
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto();
                    }}
                  >
                    Delete Photo
                  </FaRegTrashAlt>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>

      <div className="pagination-controls">
        <button
          onClick={handlePrevPage}
          disabled={!pagination || pagination.currentPage === 1 || loadingNext}
          className="pagination-button"
        >
          <MdArrowBackIosNew size={24} />
        </button>

        <span className="pagenumber">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={
            !pagination ||
            pagination.currentPage === pagination.totalPages ||
            loadingNext
          }
          className="pagination-button"
        >
          <MdArrowForwardIos size={24} />
        </button>
      </div>

      {loadingNext && <Loader active={loadingNext} />}

      {selectedPhoto && <ImageModal photoId={selectedPhoto.id} />}
    </div>
  );
});
