import React, { useState } from 'react';
import axios from 'axios';
import './EditArticleModal.css'; // Create appropriate CSS for the modal

const EditArticleModal = ({ article, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        Title: article.Title,
        HeaderImage: article.HeaderImage,
        Content: article.Content,
        PublishDate: article.PublishDate.split('T')[0], // Ensure date is in YYYY-MM-DD format
        AuthorID: article.AuthorID,
        ArticleCategoryID: article.ArticleCategoryID
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/v1/article/editArticle/${article.ArticleID}`, formData)
            .then(response => {
                onSave(formData); // Notify parent component to update state
                onClose(); // Close the modal
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error updating the article!', error);
            });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Article</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="Title" value={formData.Title} onChange={handleChange} />
                    </label>
                    <label>
                        Header Image:
                        <input type="text" name="HeaderImage" value={formData.HeaderImage} onChange={handleChange} />
                    </label>
                    <label>
                        Content:
                        <textarea name="Content" value={formData.Content} onChange={handleChange} />
                    </label>
                    <label>
                        Publish Date:
                        <input type="date" name="PublishDate" value={formData.PublishDate} onChange={handleChange} />
                    </label>
                    <label>
                        Author ID:
                        <input type="text" name="AuthorID" value={formData.AuthorID} onChange={handleChange} />
                    </label>
                    <label>
                        Article Category ID:
                        <input type="number" name="ArticleCategoryID" value={formData.ArticleCategoryID} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditArticleModal;
