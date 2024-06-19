import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/image')
    .then(response => {
      setImages(response.data)
    })
  }, [])

  return (
    <div>
      <h1>ImageGallery</h1>
      <ul>
        {images.map((image: any) => (
          <li key={image.id}></li>
        ))}
      </ul>
    </div>
  )

}

export default App
