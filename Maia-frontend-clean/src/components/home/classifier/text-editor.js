import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const RichTextEditor = ({
  data,
  setData,
}) => {

    const getName = () => {
      const firstName = sessionStorage.getItem("first_name");
      const lastName = sessionStorage.getItem("last_name");
      return `${firstName} ${lastName}`;
    };

    const handleChange = (content, delta, source, editor) => {
      let updatedContent = editor.getHTML();
      const name = getName();

      updatedContent = updatedContent.replace(/\[CSO's Name\]/g, name);
    
      setData({ ...data, suggested_reply: updatedContent });
    };

  return (
    <div className='relative'>
      <style dangerouslySetInnerHTML={{__html: `
        .ql-container.ql-snow {
          border: none !important;
        }
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #cbd5e0 !important; /* Tailwind CSS border-gray-400 */
        }
      `}} />
      <ReactQuill 
        value={data["suggested_reply"]}
        onChange={handleChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        className='rounded border border-1 border-gray-400 focus:outline-none ring-0 outline-0 whitespace-pre-wrap'
      />
    </div>
  );
};

RichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

RichTextEditor.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
  };

export default RichTextEditor;
