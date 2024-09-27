import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ChatComment } from "../layout/models/comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
    loading = false;

    comments: ChatComment[] = [];
    
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (photoId: string) => {
        if (store.photoStore.selectedPhoto) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_CHAT_URL}?photoId=${photoId}`, {
                    accessTokenFactory: () => store.userStore.user?.token as string
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection
                .start()
                .catch(error => console.error('Error establishing the connection:', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    });
                    this.comments = comments;
                });
            });

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt); 
                    this.comments.unshift(comment);
                });
            });
        }
    }

    stopHubConnection = () => {
      this.hubConnection?.stop().catch(error => console.log('Error stopping connection:', error))
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        if (!this.hubConnection) {
            console.error('HubConnection is not established.');
            return;
        }
        
        values.photoId = store.photoStore.selectedPhoto?.id;
        try {
            await this.hubConnection.invoke('SendComment', values);
        } catch (error) {
            console.error('Error sending comment:', error);
        }
    }

    deleteComment = async (commentId: number, photoId: string) => {
        try {
            await this.hubConnection?.invoke('DeleteComment', commentId, photoId);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }
}
