import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Image } from './models/image';
import NavBar from './NavBar';
import ImageDashboard from '../../features/images/dashboard/ImageDashboard';

function App() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    axios.get<Image[]>('http://localhost:5000/api/images').then(response => {
      setImages(response.data)
    })
  }, [])

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      <ImageDashboard images={images} />
      </Container>
    </Fragment>
  )

}

export default App
