import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

function RichTextEditor({ value, onChange }) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    toolbar: true,
    toolbarButtonSize: 'middle',
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', 'eraser',
      '|', 'ul', 'ol', 'indent', 'outdent',
      '|', 'font', 'fontsize', 'brush', 'paragraph',
      '|', 'image', 'link', 'table',
      '|', 'align', 'undo', 'redo', 'hr',
      '|', 'copyformat', 'fullsize'
    ]
  }), []);

  return (
    <div>
      <h1>Welcome to Ageee Dev</h1>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onChange={(newContent) => onChange(newContent)}
      />
    </div>
  );
}

export default RichTextEditor;
