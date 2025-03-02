import ReactQuill, { Quill } from "react-quill";
import hljs from 'highlight.js';

import ImageResize from 'quill-image-resize';
import axios from "axios";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
Quill.register('modules/ImageResize', ImageResize);

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

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

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
];

// Quill Toolbar component
export const QuillToolbar = ({ quillText, setQuillText, findPost }) => {
  const quillRef = useRef();
  const { editMode } = useSelector(state => state.post);

  const imageHandler = () => {
    const input = document.createElement("input");
  
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  
    input.addEventListener('change', async (e) => {
      console.log(e.target.files);
  
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const result = await axios.post(`${process.env.REACT_APP_URL}/post/images`, formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;
  
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
  
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.error('이미지 로드가 안되네유...', error);
      }
    });
  }

  // Modules object for setting up the Quill editor
const modules = useMemo(() => {
  return {
    syntax: {
      highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: {
      container: "#toolbar",
      handlers: {
        undo: undoChange,
        redo: redoChange,
        image: imageHandler,
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },

    ImageResize: {
      parchment: Quill.import('parchment')
    }
  }
}, []);

  useEffect(() => {
    if(findPost) {
      setQuillText(findPost.content);
    }
  }, []);

  return (
    <>
      <div id="toolbar">
        <span className="ql-formats">
          {/* <select className="ql-font" defaultValue="arial">
            <option value="arial">Arial</option>
            <option value="comic-sans">Comic Sans</option>
            <option value="courier-new">Courier New</option>
            <option value="georgia">Georgia</option>
            <option value="helvetica">Helvetica</option>
            <option value="lucida">Lucida</option>
          </select>
          <select className="ql-size" defaultValue="medium">
            <option value="extra-small">Size 1</option>
            <option value="small">Size 2</option>
            <option value="medium">Size 3</option>
            <option value="large">Size 4</option>
          </select> */}
          <select className="ql-header" defaultValue="3">
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">Normal</option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
          {/* <button className="ql-script" value="super" />
          <button className="ql-script" value="sub" /> */}
          <button className="ql-blockquote" />
          {/* <button className="ql-direction" /> */}
        </span>
        <span className="ql-formats">
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
        </span>
        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" />
          <button className="ql-video" />
        </span>
        <span className="ql-formats">
          <button className="ql-formula" />
          <button className="ql-code-block" />
          <button className="ql-clean" />
        </span>
      {/* <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span> */}
      </div>
      <ReactQuill ref={quillRef} theme="snow" value={quillText} onChange={setQuillText} modules={modules} formats={formats} />
    </>
  );
};

export default QuillToolbar;
