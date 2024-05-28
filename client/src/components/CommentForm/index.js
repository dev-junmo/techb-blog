import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST, REMOVE_COMMENT_REQUEST } from "../../reducer/post";
import CommentList from "../CommentsList";
import "./style.scss";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { addCommentDone } = useSelector(state => state.post);

  const onChangeComment = useCallback((e) => {
    setCommentText(e.target.value);
  }, [commentText]);

  const onSubmitComment = (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id }
    });
  }

  useEffect(() => {
    if(addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  return (
    <div className="comment-area">
      <div className="input-area">
        <form onSubmit={onSubmitComment}>
          <textarea onChange={onChangeComment} value={commentText}></textarea>
          <button type="submit" className="comment-done-btn">완료</button>
        </form>
      </div>
      <div className="comment-list-area">
        <ul>
          {post.Comments.map((comment) => (
            <CommentList key={comment.id} comment={comment} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommentForm;