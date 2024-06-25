import React, { useState, useRef, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange }) => {
  const [showCode, setShowCode] = useState(false);
  const contentRef = useRef(null);

  const formatDoc = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
  };

  const toggleShowCode = () => {
    setShowCode(!showCode);
    if (!showCode) {
      contentRef.current.textContent = contentRef.current.innerHTML;
      contentRef.current.setAttribute('contenteditable', false);
    } else {
      contentRef.current.innerHTML = contentRef.current.textContent;
      contentRef.current.setAttribute('contenteditable', true);
    }
  };

  useEffect(() => {
    const handleLinkClicks = (event) => {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        window.open(event.target.href, '_blank');
      }
    };

    const contentElement = contentRef.current;
    contentElement.addEventListener('click', handleLinkClicks);

    const handleInput = () => {
      if (onChange) {
        onChange(contentRef.current.innerHTML);
      }
    };

    contentElement.addEventListener('input', handleInput);

    return () => {
      contentElement.removeEventListener('click', handleLinkClicks);
      contentElement.removeEventListener('input', handleInput);
    };
  }, [onChange]);

  useEffect(() => {
    contentRef.current.innerHTML = value; // Initialize the editor with the given value
  }, [value]);

  return (
    <div className="rich-text-editor">
      <div className="container-richtext">
        <div className="toolbar-richtext">
          <div className="head-richtext">
            <select onChange={(e) => formatDoc('formatBlock', e.target.value)} defaultValue="">
              <option value="" disabled hidden>
                Format
              </option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
              <option value="p">Paragraph</option>
            </select>
            <select onChange={(e) => formatDoc('fontSize', e.target.value)} defaultValue="">
              <option value="" disabled hidden>
                Font size
              </option>
              <option value="1">Extra small</option>
              <option value="2">Small</option>
              <option value="3">Regular</option>
              <option value="4">Medium</option>
              <option value="5">Large</option>
              <option value="6">Extra Large</option>
              <option value="7">Big</option>
            </select>
            <div className="color-richtext">
              <span>Color</span>
              <input type="color" onInput={(e) => formatDoc('foreColor', e.target.value)} />
            </div>
            <div className="color-richtext">
              <span>Background</span>
              <input type="color" onInput={(e) => formatDoc('hiliteColor', e.target.value)} />
            </div>
          </div>
          <div className="btn-toolbar-richtext">
            <button onClick={() => formatDoc('undo')}>
              <i className="bx bx-undo"></i>
            </button>
            <button onClick={() => formatDoc('redo')}>
              <i className="bx bx-redo"></i>
            </button>
            <button onClick={() => formatDoc('bold')}>
              <i className="bx bx-bold"></i>
            </button>
            <button onClick={() => formatDoc('underline')}>
              <i className="bx bx-underline"></i>
            </button>
            <button onClick={() => formatDoc('italic')}>
              <i className="bx bx-italic"></i>
            </button>
            <button onClick={() => formatDoc('strikeThrough')}>
              <i className="bx bx-strikethrough"></i>
            </button>
            <button onClick={() => formatDoc('justifyLeft')}>
              <i className="bx bx-align-left"></i>
            </button>
            <button onClick={() => formatDoc('justifyCenter')}>
              <i className="bx bx-align-middle"></i>
            </button>
            <button onClick={() => formatDoc('justifyRight')}>
              <i className="bx bx-align-right"></i>
            </button>
            <button onClick={() => formatDoc('justifyFull')}>
              <i className="bx bx-align-justify"></i>
            </button>
            <button onClick={() => formatDoc('insertOrderedList')}>
              <i className="bx bx-list-ol"></i>
            </button>
            <button onClick={() => formatDoc('insertUnorderedList')}>
              <i className="bx bx-list-ul"></i>
            </button>
            <button onClick={toggleShowCode} data-active={showCode}>
              &lt;/&gt;
            </button>
          </div>
        </div>
        <div
          id="content"
          ref={contentRef}
          contentEditable={!showCode}
          spellCheck="false"
        ></div>
      </div>
    </div>
  );
};

export default RichTextEditor;