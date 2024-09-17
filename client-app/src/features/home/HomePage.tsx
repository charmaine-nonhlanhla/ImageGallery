import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import { Category } from "../../app/layout/models/category";
import { PagingParams } from "../../app/layout/models/pagination";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";
import './HomePage.css';
import { PhotoModal } from "./PhotoModal";

export default observer(function HomePage() {
  const { photoStore } = useStore();
  const { categories, loading, filteredPhotos, loadCategories, loadPhotos, setCategory, clearSelectedPhoto, setPagingParams, pagination } = photoStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<{ src: string; description: string } | null>(null);

  const handleModalOpen = (photo: { src: string; description: string }) => {
    setModalPhoto(photo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalPhoto(null);
  };

  function handleGetNext() {
    setLoadingNext(true);
    if (pagination) {
      setPagingParams(new PagingParams(pagination.currentPage + 1));
      loadPhotos().then(() => setLoadingNext(false));
    }
  }

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

  if (loading && !loadingNext) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className='search-options'>
        <div className='search-tab'>
          <IoSearchOutline className='search-icon' />
          <input
            value={selectedCategory ? selectedCategory.categoryName : ''}
            placeholder='Search for...'
            className='search-bar'
            readOnly
          />
        </div>
        <button
          className='filter-button'
          onClick={() => setFilterVisible(!filterVisible)}
        >
          <IoFilterSharp className='filter-icon' />
          Filters
        </button>
      </div>
      {filterVisible && (
        <div className="category-dropdown">
          <div
            className="category-item"
            onClick={() => handleCategorySelect(null)}
          >
            All
          </div>
          {categories.map(category => (
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
          filteredPhotos.map(photo => (
            <div key={photo.id} className="picture-item" onClick={() => handleModalOpen({ src: photo.url, description: photo.photoDescription })}>
              <img className="photo" width={500} src={photo.url} alt={photo.photoTitle} />
              <p className="photo-title">{photo.photoTitle}</p>
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
        initialLoad={false}
      >
        <Loader active={loadingNext} />
      </InfiniteScroll>
      {isModalOpen && modalPhoto && (
        <PhotoModal
          src={modalPhoto.src}
          description={modalPhoto.description}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
});
