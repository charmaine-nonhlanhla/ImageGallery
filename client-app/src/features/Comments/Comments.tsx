import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { Header, Segment, Comment, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from 'yup';
import { formatDistanceToNow } from "date-fns";

interface Props {
    photoId: string;
}

export default observer(function Comments({ photoId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (photoId) {
            console.log('Received photoId:', photoId);
            commentStore.createHubConnection(photoId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, photoId]);

    return (
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: 'none' }}
            >
                <Header>Comment on this photo</Header>
            </Segment>
            <Segment attached clearing>
                <Formik 
                    onSubmit={(values, { resetForm }) => {
                        if (photoId) {
                            const commentData = { ...values, photoId };
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
                        <Form className="ui form">
                            <Field name="commentText">
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} /> 
                                        <textarea 
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
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.commentId}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                    {comment.fullName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
                                    {comment.commentText}
                                </Comment.Text>
                            </Comment.Content>                    
                        </Comment> 
                    ))}                
                </Comment.Group>
            </Segment>
        </>
    )
});
