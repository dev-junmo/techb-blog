import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import 'react-quill/dist/quill.snow.css';
import "./style.scss";
import { useState } from "react";
import { EDIT_MODE_ON } from "../../reducer/post";

const PostPage = () => {
  const { id } = useParams();
  const { mainPosts } = useSelector(state => state.post);
  const findPost = mainPosts.find(f => f.id === Number(id));

  const dispatch = useDispatch();

  const onClickEdit = () => {
    dispatch({
      type: EDIT_MODE_ON,
    });
  }

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <div className="header-inner">
          <div>
            <span className="detail-category">{ findPost.category }</span>
            <h3 className="detail-title">{ findPost.title }</h3>
            <p className="detail-subtitle">{ findPost.subTitle }</p>
          </div>
          <button onClick={onClickEdit} className="post-edit-btn">
            <Link to="/writePage" state={ findPost }>
              <HiOutlinePencil />
            </Link>
          </button>
          {/* <ul className="hashtags-container">
            {findPost.hashtags.map((hashtag, hashIndex) => (
              <li key={hashIndex}>{hashtag}</li>
            ))}
          </ul> */}
        </div>
      </div>
      <div className="post-content">
        <div className="quill">
          <div className="ql-container ql-snow">
            <div className="ql-editor ql-post-contents">
              <div dangerouslySetInnerHTML={{ __html:findPost.content }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;