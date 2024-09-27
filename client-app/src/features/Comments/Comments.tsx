import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";
import "./Comments.css";
import EmojiPicker from "emoji-picker-react";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface Props {
  photoId: string;
}

export default observer(function Comments({ photoId }: Props) {
  const { commentStore, userStore } = useStore();
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleCommentClick = (commentId: number) => {
    setSelectedCommentId(commentId === selectedCommentId ? null : commentId);
  };

  const handleDeleteComment = (commentId: number) => {
    commentStore.deleteComment(commentId, photoId);
    setSelectedCommentId(null);
  };

  const handleEmojiClick = (emojiObject: any) => {
    const newCommentText = commentText + emojiObject.emoji;
    setCommentText(newCommentText);
  };

  useEffect(() => {
    if (photoId) {
      commentStore.createHubConnection(photoId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, photoId]);

  return (
    <div className="comments-container">
      <div className="comments-header">
        <h2>Comment on this photo</h2>
      </div>
      <div className="comments-form">
        <Formik
          onSubmit={(_values, { resetForm }) => {
            if (photoId) {
              const commentData = {
                CommentText: commentText,
                PhotoId: photoId,
              };
              commentStore.addComment(commentData).then(() => {
                resetForm();
                setCommentText("");
              });
            } else {
              console.log("No photoId found");
            }
          }}
          initialValues={{ commentText: "" }}
          validationSchema={Yup.object({
            commentText: Yup.string().required("Comment is required"),
          })}
        >
          {({ isValid, isSubmitting, handleSubmit }) => (
            <Form>
              <div className="comments-field">
                <Field name="commentText">
                  {(props: FieldProps) => (
                    <div>
                      {isSubmitting && <div className="loading-spinner" />}
                      <textarea
                        className="comment-textarea"
                        placeholder="Enter your comment (Enter to submit, SHIFT + enter for new line)"
                        rows={2}
                        {...props.field}
                        value={commentText}
                        onChange={(e) => {
                          setCommentText(e.target.value);
                          props.field.onChange(e);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            isValid && handleSubmit();
                          }
                        }}
                      />
                      <span
                        className="emoji-icon"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        😊
                      </span>
                      {showEmojiPicker && (
                        <div className="emoji-picker">
                          <EmojiPicker
                            className="picker-emoji"
                            onEmojiClick={(emojiObject) => {
                              handleEmojiClick(emojiObject);
                              setShowEmojiPicker(false);
                            }}
                          />
                        </div>
                      )}
                      <div className="comments-list">
                        {commentStore.loading ? (
                           <LoadingComponent content="Loading comments..." />
                        ) : commentStore.comments.length === 0 ? (
                          <div className="no-comments-message">
                            No comments available for this image.
                          </div>
                        ) : (
                          commentStore.comments.map((comment) => (
                            <div
                              className="comment-item"
                              key={comment.commentId}
                              onClick={() =>
                                handleCommentClick(comment.commentId)
                              }
                            >
                              <img
                                className="comment-avatar"
                                src={comment.image || "/assets/user.png"}
                                alt="User avatar"
                              />
                              <div className="comment-content">
                                <Link
                                  className="comment-author"
                                  to={`/profiles/${comment.username}`}
                                >
                                  {comment.fullName}
                                </Link>
                                <span className="comment-time">
                                  {formatDistanceToNow(comment.createdAt)} ago
                                </span>
                                <p className="comment-text">
                                  {comment.commentText}
                                </p>
                                {selectedCommentId === comment.commentId &&
                                  userStore.user?.userName ===
                                    comment.username && (
                                    <div className="comment-actions">
                                      <button
                                        className="delete-comment-button"
                                        onClick={() =>
                                          handleDeleteComment(comment.commentId)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});
