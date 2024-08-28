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
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_CHAT_URL + '?photoId=' + photoId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start()
                .catch(error => console.log('Error establishing the connection:', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    });
                    this.comments = comments;
                });
            });

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                runInAction(() => this.comments.push(comment));
            })

        }
    }
    

    stopHubConnection = () => {
        this.hubConnection?.stop()
            .catch(error => console.log('Error stopping connection:', error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        console.log('Adding comment with values:', values);
        try {
            await this.hubConnection?.invoke('SendComment', values);
            console.log('Comment sent successfully');
        } catch (error) {
            console.log('Error adding comment:', error);
        }
    }
}
