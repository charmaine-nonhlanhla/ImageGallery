import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Image } from 'semantic-ui-react';

interface Photo {
  id: string;
  url: string;
  photoTitle: string;
  photoDescription: string;
}

export const ImageGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/api/photos'); 
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {photos.map(photo => (
          <Card key={photo.id}>
            <Image src={photo.url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{photo.photoTitle}</Card.Header>
              <Card.Description>{photo.photoDescription}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};
