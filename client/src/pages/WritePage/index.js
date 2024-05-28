import { useState, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowBarLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import ReactQuill, { displayName } from 'react-quill';
import EditorToolbar, { modules, formats } from "../../EditorToolbar";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
// import 'highlight.js/styles/darcula.css'
// import "highlight.js/styles/github.css";
import "highlight.js/styles/atom-one-dark.css";
import "./style.scss";
import { ADD_POST_REQUEST, ADD_POST_RESET, ADD_POST_STATE_RESET, EDIT_MODE_OFF, EDIT_MODE_RESET, EDIT_POST_REQUEST, LOAD_POST_REQUEST, REMOVE_POST_RESET } from "../../reducer/post";
import { Link, useNavigate } from "react-router-dom";

import { Quill } from "react-quill";
import hljs from 'highlight.js';

import ImageResize from 'quill-image-resize';
import axios from "axios";
Quill.register('modules/ImageResize', ImageResize);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});

const WrietPage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const dispatch = useDispatch();

  const categoryList = ["Category", "Web", "Server", "Design", "Tool", "Etc"];
  const [selected, setSelected] = useState("Category");
  const [quillText, setQuillText] = useState("");

  const { addPostDone, editMode, editPostDone, hasMorePosts, loadPostLoading, mainPosts } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);

  const navigate = useNavigate();

  const location = useLocation();
  const findPost = location.state;

  const handleSelect = (e) => {
    setSelected(e.target.value);
  }
  useEffect(() => {
    if(addPostDone) {
      dispatch({
        type: ADD_POST_STATE_RESET
      });
      return navigate("/", { replace: true });
    }
  }, [addPostDone]);

  useEffect(() => {
    if(editMode) {
      setSelected(findPost.category);
    }
  }, []);

  useEffect(() => {
    if(editPostDone) {
      dispatch({
        type: EDIT_MODE_RESET,
      });

      dispatch({
        type: REMOVE_POST_RESET,
      });

      dispatch({
        type: LOAD_POST_REQUEST,
      });

      return navigate("/");
    }
  }, [editPostDone]);

  const onSubmit = (data) => {

    if(findPost) {
      dispatch({
        type: EDIT_POST_REQUEST,
        data: {
          PostId: findPost.id,
          category: selected,
          title: data.title,
          subTitle: data.subTitle,
          content: quillText
        }
      });
    }else{
      dispatch({
        type: ADD_POST_REQUEST,
        data: { category: selected, title: data.title, subTitle: data.subTitle, content: quillText }
      });
  
      // if(addPostDone) {
      //   redirect("/");
      // }
  
      // console.log(data);
      // console.log(quillText)
  
      console.log(quillText);
    }
  };

  const onFocus = () => {
    dispatch({
      type: EDIT_MODE_OFF,
    });
  }

  return (
    <div className="write-container">
      <div className="write-card">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="top-area">
            <select name="category" onChange={handleSelect} value={selected} className={ selected === "Category" ? "dis" : "" }>
              { categoryList.map((c) => (
                <option key={c} value={c} disabled={ c === "Category" } hidden={ c === "Category" } className="others">{c}</option>
              )) }
            </select>
            {/* <span className="boundary-line"></span>
            <div className="input-area">
              <label htmlFor="user">작성자</label>
              <input id="user" type="user" name="user" placeholder="작성자을 입력해 주세요." { ...register("user") } />
            </div> */}
          </div>
          <div className="input-area">
            <label htmlFor="title">제목</label>
            <input id="title" type="title" name="title" onFocus={onFocus} placeholder="제목을 입력해 주세요." value={editMode ? findPost.title : null } { ...register("title") } />
            <span className="title-line"></span>
          </div>
          <div className="input-area">
            <label htmlFor="subTitle">부제목</label>
            <input id="subTitle" type="subTitle" name="subTitle" onFocus={onFocus} placeholder="부제목을 입력해 주세요." value={editMode ? findPost.subTitle : null } { ...register("subTitle") } />
          </div>
          <div className="input-area content-area">
            {/* <label htmlFor="content">본문</label>
            <textarea id="content" type="content" name="content" placeholder="본문이외다" { ...register("content") } ></textarea> */}
            <EditorToolbar quillText={quillText} setQuillText={setQuillText} findPost={findPost} onFocus={onFocus} />
            {/* <ReactQuill theme="snow" value={quillText} onChange={setQuillText} modules={modules} formats={formats} /> */}
          </div>
          <div className="btn-wrap">
            <button type="button" className="exit">
              <Link to="/">
                <BsArrowBarLeft /> <span>나가기</span>
              </Link>
            </button>
            <button type="submit" disabled={isSubmitting} className="completed">완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WrietPage;
