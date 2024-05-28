import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { REMOVE_POST_REQUEST } from "../../reducer/post";
import { AiOutlineComment, AiOutlineDelete } from 'react-icons/ai';
import CommentForm from "../CommentForm";
import moment from "moment";

moment.locale('ko');

const PostCardContent = ({ post }) => {
  const dispatch = useDispatch();
  const [commentOpen, setCommentOpen] = useState(false);
  const { me } = useSelector(state => state.user);
  const id = useSelector(state => state.user.me?.id);

  const onRemovePost = (postId) => {
    dispatch({
      type: REMOVE_POST_REQUEST, 
      data: postId
    });
  };

  const onToggleComment = useCallback(() => {
    setCommentOpen((prev) => !prev)
  }, []);

  return (
    <div className="post-card">
      <div className="post-card-contents">
        <div className="left-info">
          <span className="post-category">{ post.category }</span>
          <h3 className="post-title">{ post.title }</h3>
          <p className="post-subtitle">{ post.subTitle }</p>
          {/* <ul className="hashtags-container">
            {post.hashtags.map((hashtag, hashIndex) => (
              <li key={hashIndex}>{hashtag}</li>
            ))}
          </ul> */}
          <Link to={`/post/${post.id}`}>
            <button className="more-btn">
              <em></em>
              <span>Read More</span>
            </button>
          </Link>
        </div>
        <div className="right-info">
          <span className="user-name">{ me?.nickname }</span>
          <span className="date-created">{ moment(post.createdAt).format('YYYY.MM.DD') }</span>
          <div className="btn-wrap">
            <button className='comment-btn' onClick={onToggleComment}>
              <AiOutlineComment />
            </button>
            {id && post.User.id === id ? (
              <button className='delete-btn' onClick={() => { onRemovePost(post.id) }}>
                <AiOutlineDelete />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      { commentOpen ? (
        <CommentForm post={post} />
      ) : null }
    </div>
  );
}

export default PostCardContent