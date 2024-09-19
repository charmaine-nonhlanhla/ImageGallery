import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from 'yup';
import { formatDistanceToNow } from "date-fns";
import './Comments.css';

interface Props {
    photoId: string;
}

export default observer(function Comments({ photoId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (photoId) {
            commentStore.createHubConnection(photoId);
        }
        return () => {
            commentStore.clearComments();
        };
    }, [commentStore, photoId]);

      useEffect(() => {
        console.log('Comments:', commentStore.comments);
    }, [commentStore.comments]);

    return (
        <div className="comments-container">
            <div className="comments-header">
                <h2>Comment on this photo</h2>
            </div>

            <div className="comments-form">
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        if (photoId) {
                            const commentData = { CommentText: values.commentText, PhotoId: photoId };
                            console.log('Form submitted with values:', commentData);
                            commentStore.addComment(commentData).then(() => resetForm());
                        } else {
                            console.log('No photoId found');
                        }
                    }}
                    initialValues={{ commentText: '' }}
                    validationSchema={Yup.object({
                        commentText: Yup.string().required()
                    })}
                >
                    {({ isValid, isSubmitting, handleSubmit }) => (
                        <Form>
                            <Field name="commentText">
                                {(props: FieldProps) => (
                                    <div>
                                        {isSubmitting && <div className="loading-spinner" />}
                                        <textarea
                                            className="comment-textarea"
                                            placeholder="Enter your comment (Enter to submit, SHIFT + enter for new line)"
                                            rows={2}
                                            {...props.field}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="comments-list">
                {commentStore.comments.length === 0 ? (
                    
                    <div className="loading-comments">Loading comments...</div>
                ) : (
                    commentStore.comments.map(comment => (
                        <div className="comment-item" key={comment.commentId}>
                            <img
                                className="comment-avatar"
                                src={comment.image || '/assets/user.png'}
                                alt="User avatar"
                            />
                            <div className="comment-content">
                                <Link className="comment-author" to={`/profiles/${comment.username}`}>
                                    {comment.fullName}
                                </Link>
                                <span className="comment-time">
                                    {formatDistanceToNow(comment.createdAt)} ago
                                </span>
                                <p className="comment-text">
                                    {comment.commentText}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});