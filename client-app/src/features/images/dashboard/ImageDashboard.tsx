import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Image } from "../../../app/layout/models/image";
import ImageList from "./ImageList";
import ImageDetails from "../details/ImageDetails";

interface Props {
    images: Image[];
}

export default function ImageDashboard({images}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
            <ImageList images={images} />
    </Grid.Column>
    <Grid.Column width='6'>
        {images[0] && 
        <ImageDetails image={image[0]} />}
    </Grid.Column>
</Grid>
    )
}
