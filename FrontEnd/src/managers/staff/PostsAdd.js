import React, { useState } from 'react';
import axios from 'axios';
import RichTextEditor from '../../users/component/RichTextEditor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Posts.css';

function PostsAdd() {
    const [title, setTitle] = useState('');
    const [headerImage, setHeaderImage] = useState(null);
    const [content, setContent] = useState('');
    const [publishDate, setPublishDate] = useState(new Date());
    const [authorID, setAuthorID] = useState('');
    const [articleCategoryID, setArticleCategoryID] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleImageChange = (e) => {
        setHeaderImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!headerImage) {
            setErrorMessage('Image is required.');
            return;
        }

        const postData = {
            Title: title,
            HeaderImage: headerImage.name, // Just the file name for demonstration
            Content: content,
            PublishDate: publishDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
            AuthorID: authorID,
            ArticleCategoryID: parseInt(articleCategoryID)
        };

        // Here we assume that the server expects a JSON payload with the image name
        // If the server requires the actual image file, adjust accordingly

        axios.post('http://localhost:5000/api/v1/article/createArticle/', postData)
            .then(response => {
                console.log('Post created successfully:', response.data);
                // Handle success actions, e.g., form reset or redirect
            })
            .catch(error => {
                console.error('Error creating post:', error);
                setErrorMessage('Error creating post: ' + (error.response?.data || error.message));
            });
    };

    return (
        <div className="container post-form">
            <h2>Create New Post</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="title">Post Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="header-image">Header Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="header-image"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="content">Content</label>
                        <div className="editor">
                            <RichTextEditor onChange={handleContentChange} />
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="publish-date">Publish Date</label>
                        <DatePicker
                            selected={publishDate}
                            onChange={date => setPublishDate(date)}
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="author-id">Author ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author-id"
                            value={authorID}
                            onChange={(e) => setAuthorID(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="article-category-id">Article Category ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="article-category-id"
                            value={articleCategoryID}
                            onChange={(e) => setArticleCategoryID(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    );
}

export default PostsAdd;
