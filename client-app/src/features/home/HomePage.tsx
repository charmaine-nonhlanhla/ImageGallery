import './HomePage.css';
import '../ImageModal/ImageModal.css';
import { Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import { IoFilterSharp, IoSearchOutline } from 'react-icons/io5';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { PagingParams } from '../../app/layout/models/pagination';
import ImageModal from '../ImageModal/ImageModal';
import { Category } from '../../app/layout/models/category';
import { Photo } from '../../app/layout/models/photo';

export default observer(function HomePage() {
  const { photoStore, modalStore } = useStore();
  const {
    categories,
    loading,
    filteredPhotos,
    loadCategories,
    loadPhotos,
    setCategory,
    clearSelectedPhoto,
    setPagingParams,
    pagination,
  } = photoStore;

  const [loadingNext, setLoadingNext] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);


  useEffect(() => {
    loadCategories();
    loadPhotos();
    return () => clearSelectedPhoto();
  }, [loadCategories, loadPhotos, clearSelectedPhoto]);


  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
    setCategory(category);
    setFilterVisible(false);
  };


  const handlePhotoClick = (photo: Photo) => {
    modalStore.openModal(
      <div className="modal-image-content">
        <img src={photo.url} alt={photo.photoTitle} />
        <h3>{photo.photoTitle}</h3>
        <p>{photo.photoDescription}</p>
      </div>
    );
    photoStore.selectPhoto(photo.id);
  };


  const handleNextPage = () => {
    if (pagination && pagination.currentPage < pagination.totalPages) {
      setLoadingNext(true);
      setPagingParams(new PagingParams(pagination.currentPage + 1));
      loadPhotos().then(() => setLoadingNext(false));
    }
  };


  const handlePrevPage = () => {
    if (pagination && pagination.currentPage > 1) {
      setLoadingNext(true);
      setPagingParams(new PagingParams(pagination.currentPage - 1));
      loadPhotos().then(() => setLoadingNext(false));
    }
  };

  if (loading && !loadingNext) return <div>Loading...</div>;

  return (
    <div className="page-container">

      <div className="search-options">
        <div className="search-tab">
          <IoSearchOutline className="search-icon" />
          <input
            value={selectedCategory ? selectedCategory.categoryName : ''}
            placeholder="Search for..."
            className="search-bar"
            readOnly
          />
        </div>
        <button
          className="filter-button"
          onClick={() => setFilterVisible(!filterVisible)}
        >
          <IoFilterSharp className="filter-icon" />
          Filters
        </button>
      </div>

  
      {filterVisible && (
        <div className="category-dropdown">
          <div className="category-item" onClick={() => handleCategorySelect(null)}>
            All
          </div>
          {categories.map((category) => (
            <div
              key={category.categoryId}
              className="category-item"
              onClick={() => handleCategorySelect(category)}
            >
              {category.categoryName}
            </div>
          ))}
        </div>
      )}

      <div className="pictures-container">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <div key={photo.id} className="picture-item" onClick={() => handlePhotoClick(photo)}>
              <img className="photo" width={500} src={photo.url} alt={photo.photoTitle} />
              <p className="photo-title">{photo.photoTitle}</p>
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

        <span>
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>


        <button
          onClick={handleNextPage}
          disabled={!pagination || pagination.currentPage === pagination.totalPages || loadingNext}
          className="pagination-button"
        >
          <MdArrowForwardIos size={24} />
        </button>
      </div>

      
      {loadingNext && <Loader active={loadingNext} />}

 
      {photoStore.selectedPhoto && <ImageModal photoId={photoStore.selectedPhoto.id} />}
    </div>
  );
});
