import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

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
      <Header as ='h2' icon='users' content='Image Gallery' />
      <List>
        {images.map((image: any) => (
          <List.Item key={image.id}></List.Item>
        ))}
      </List>
    </div>
  )

}

export default App
