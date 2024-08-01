import '../home/HomePage.css';
import { observer } from 'mobx-react-lite';
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { Pictures } from '../images/Pictures';

export default observer(function HomePage() {



  return (
    <div className="page-container">      
            <div className='search-options'>
              <div className='search-tab'>
                <IoSearchOutline className='search-icon'/>
              <input                 
                placeholder='Search for...' 
                className='search-bar' 
                />
              </div>
                <button
                  className='filter-button' >
                    {<IoFilterSharp className='filter-icon'/>} 
                    Filters
                </button>
            </div>
          <Pictures />  
       
    </div>
  
  );
});