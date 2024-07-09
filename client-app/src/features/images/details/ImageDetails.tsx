import { Card, CardMeta } from "semantic-ui-react";



export default function ImageDetails() {
    return (
        <Card>
    
    <Card.Content>
      <Card.Header>{}</Card.Header>
      <CardMeta>
        <span className='date'>Joined in 2015</span>
      </CardMeta>
      <Card.Description>
        {}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      
    </Card.Content>
  </Card>
    )
}