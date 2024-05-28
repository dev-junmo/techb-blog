import { useState } from "react";
import { useDispatch } from "react-redux";
import { EDIT_COMMENT_REQUEST, REMOVE_COMMENT_REQUEST } from "../../reducer/post";
import "./style.scss";

const CommentList = ({ comment, post }) => {
  const [commentEdit, setCommentEdit] = useState(false);
  const [commentEditContent, setCommentEditContent] = useState("");
  const dispatch = useDispatch();

  const onRemoveComment = (commentId) => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        commentId,
        postId: post.id
      }
    });
    console.log(commentId)
  }

  const onEditComment = () => {
    setCommentEdit(true);
  }

  const onEditCancel = () => {
    setCommentEdit(false);
  }

  const commentChangeContent = (e) => {
    setCommentEditContent(e.target.value);
  }

  const commentEditDone = (commentId) => {
    dispatch({
      type: EDIT_COMMENT_REQUEST,
      data: {
        commentId,
        content: commentEditContent,
        postId: post.id
      }
    });
    setCommentEdit(false);

    console.log('CommentList', commentEditContent);
  }

  return (
    <li className="comment-card">
      {commentEdit ? (
        <div className="comment-edit-container">
          <textarea defaultValue={comment.content} onChange={commentChangeContent}></textarea>
          <div className="edit-buttons">
            <button type="button" onClick={() => { commentEditDone(comment.id) }}>완료</button>
            <button type="button" onClick={onEditCancel}>취소</button>
          </div>
        </div>
      ) : (
      <div className="comment-list-container">
        <div className="comment-content-container">
          <span className="comment-user">{comment.User.nickname}</span>
          <div className="comment-contents">{comment.content}</div>
        </div>
        <div className="button-group">
          <button type="button" className="comment-modify" onClick={onEditComment}>수정</button>
          <button type="button" className="comment-delete" onClick={() => { onRemoveComment(comment.id) }}>삭제</button>
        </div>
      </div>
      )}
    </li>
  );
}

export default CommentList;