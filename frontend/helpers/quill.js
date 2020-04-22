// import {ImageDrop} from 'quill-image-drop-module'
// import ReactQuill, { Quill } from 'react-quill';
// ReactQuill.Quill.register('modules/imageDrop', ImageDrop)

export const QuillModules = {
  
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"],
      // ['image']
    ],
    // imageDrop: true
  };
  export const QuillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block"
  ];
  