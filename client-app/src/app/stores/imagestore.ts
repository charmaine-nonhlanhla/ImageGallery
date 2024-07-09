import { makeAutoObservable } from "mobx";
import { Image } from "../layout/models/image";
import agent from "../api/agent";

export default class ImageStore {
  imageRegistry = new Map<number, Image>();
  selectedImage: Image | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get imagesByDate() {
        return Array.from(this.imageRegistry.values()).sort((a, b) => Date.parse(a.uploadDate) - Date.parse(b.uploadDate));
    }

    loadImages = async () => {
        try {
            const images = await agent.Images.list();           
            images.forEach(image => {
                image.uploadDate = image.uploadDate.split('T')[0];
                this.imageRegistry.set(image.imageId, image);
            })

            this.setLoadingInitial(false);
        }   catch (error) {
            console.log(error);       
            this.setLoadingInitial(false);
            }
        }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectImage = (imageId: number) => {
        this.selectedImage = this.imageRegistry.get(imageId);
    }

    cancelSelectedImage = () => {
        this.selectedImage = undefined;
    }

    openForm = (id?: number) => {
        id ? this.selectImage(id) : this.cancelSelectedImage();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
}