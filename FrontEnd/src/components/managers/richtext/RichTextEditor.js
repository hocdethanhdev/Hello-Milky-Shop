import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';

function App() {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  return (
    <div className="App">
      <h1>My Rich Text Editor</h1>
      <RichTextEditor value={editorContent} onChange={handleEditorChange} />
    </div>
  );
}

export default App;
