// import { Button, Item, Label, Segment } from "semantic-ui-react";

// export default function ImageList({ images }) {
//     return (
//         <Segment>
//            <Item.Group divided>
//                 {images.map(image => (
//                     <Item key={image.imageId}>
//                         <Item.Content>
//                             <Item.Header as ='a'>{image.imageTitle}</Item.Header>
//                             <Item.Meta>{image.uploadDate}</Item.Meta>
//                             <Item.Description>
//                                 <div>{image.description}</div>
//                                 <div>{image.url}, {image.userId}</div>
//                             </Item.Description>
//                             <Item.Extra>
//                                 <Button floated='right' content='View' color='blue' />
//                                 <Label basic content={image.categoryId}/>
//                             </Item.Extra>
//                         </Item.Content>
//                     </Item>
//                 ))}
//             </Item.Group> 
//         </Segment>
//     )
// }