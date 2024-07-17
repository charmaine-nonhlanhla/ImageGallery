import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
//import ImageList from "./ImageList";

export default function ImageDashboard() {
    const {imageStore} = useStore();

    useEffect(() => {
      imageStore.loadImages();
    }, [imageStore])
  
    if (imageStore.loadingInitial) return <LoadingComponent content ='Loading home page...' />

    return (
        <Grid>
            <Grid.Column width='10'>
       
            </Grid.Column>
                <Grid.Column width='6'>
                  
            </Grid.Column>
</Grid>
    )
}
