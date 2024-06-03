import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class TextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    };

    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
        this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                resolve({ data: { link: imageUrl } });
            };
            reader.onerror = () => reject(new Error('Failed to upload image'));
            reader.readAsDataURL(file);
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'image', 'history'],
                        inline: { inDropdown: false },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: false },
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}
