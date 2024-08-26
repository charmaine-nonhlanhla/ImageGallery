import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ChatComment } from "../layout/models/comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (photoId: string) => {
        if (store.photoStore.selectedPhoto) {
            console.log(`Creating Hub Connection for photoId: ${photoId}`);
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/chat?photoId=' + photoId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start()
                .then(() => console.log('Hub Connection started successfully'))
                .catch(error => console.log('Error establishing the connection:', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                console.log('LoadComments received:', comments);
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    });
                    this.comments = comments;
                });
            });

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                console.log('ReceiveComment received:', comment);
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment);
                });
            });
        } else {
            console.log('No selected photo found in photoStore');
        }
    }

    stopHubConnection = () => {
        console.log('Stopping Hub Connection');
        this.hubConnection?.stop()
            .then(() => console.log('Hub Connection stopped successfully'))
            .catch(error => console.log('Error stopping connection:', error));
    }

    clearComments = () => {
        console.log('Clearing comments');
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.photoId = store.photoStore.selectedPhoto?.id;
        console.log('Adding comment with values:', values);
        try {
            await this.hubConnection?.invoke('SendComment', values);
            console.log('Comment sent successfully');
        } catch (error) {
            console.log('Error adding comment:', error);
        }
    }
}
