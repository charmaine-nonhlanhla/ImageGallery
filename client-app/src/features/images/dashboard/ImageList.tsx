import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Image } from '../../../app/layout/models/image';

interface Props {
    images: Image[];

}

export default function ImageList({ images }: Props) {
    return (
        <Segment>
           <Item.Group divided>
                {images.map(image => (
                    <Item key={image.imageId}>
                        <Item.Content>
                            <Item.Header as ='a'>{image.name}</Item.Header>
                            <Item.Meta>{image.uploadDate}</Item.Meta>
                            <Item.Description>
                                <div>{image.description}</div>
                                <div>{image.url}, {image.userId}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' />
                                <Label basic content={image.categoryId}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group> 
        </Segment>
    )
}