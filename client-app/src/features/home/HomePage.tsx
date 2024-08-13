import '../home/HomePage.css';
import { observer } from 'mobx-react-lite';
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import { Category } from '../../app/layout/models/category';

export default observer(function HomePage() {
    const { profileStore } = useStore();
    const { filteredPhotos, categories, loading, loadPhotos, loadCategories, setCategory } = profileStore;
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        loadCategories();
        loadPhotos();
    }, [loadPhotos, loadCategories]);

    const handleCategorySelect = (category: Category | null) => {
        setSelectedCategory(category);
        setCategory(category); // Pass the selected category
        setFilterVisible(false); // Hide dropdown after selection
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="page-container">
            <div className='search-options'>
                <div className='search-tab'>
                    <IoSearchOutline className='search-icon' />
                    <input
                        value={selectedCategory ? selectedCategory.categoryName : ''}
                        placeholder='Search for...'
                        className='search-bar'
                        readOnly // Making the input read-only
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
                        <div key={photo.id} className="picture-item">
                            <img src={photo.url} alt={photo.photoTitle} />
                            <p>{photo.photoTitle}</p>
                            <p>{photo.photoDescription}</p>
                        </div>
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>
        </div>
    );
});
