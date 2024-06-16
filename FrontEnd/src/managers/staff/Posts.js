import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Posts.css';
import { Link } from 'react-router-dom';
import ThrowPage from '../../users/ui-list-product-mom/ThrowPage';
import EditArticleModal from './EditArticleModal'; // Import the EditArticleModal component

function Posts() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'Title', direction: 'ascending' });
    const [selectedArticleForEdit, setSelectedArticleForEdit] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const productsPerPage = 10;

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/article/getAllArticles')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the articles!", error);
            });
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSort = () => {
        let direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ key: 'Title', direction });
    };

    const sortedArticles = [...articles].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentArticles = sortedArticles.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleEditClick = (article) => {
        setSelectedArticleForEdit(article);
    };

    const handleSaveArticle = (updatedArticle) => {
        setArticles(articles.map(article =>
            article.ArticleID === updatedArticle.ArticleID ? updatedArticle : article
        ));
    };

    const handleDeleteClick = (articleID) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            axios.put(`http://localhost:5000/api/v1/article/deleteArticle/${articleID}`)
                .then(response => {
                    setArticles(articles.filter(article => article.ArticleID !== articleID));
                })
                .catch(error => {
                    console.error("There was an error deleting the article!", error);
                    setErrorMessage('There was an error deleting the article: ' + (error.response?.data || error.message));
                });
        }
    };

    return (
        <div className="posts-container">

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Link to="/addingpost">
                <div className='d-flex justify-content-end align-items-end'>
                    <button type="button" className="button-add-voucher">
                        <span className="far fa-plus-square btn btn-secondary"></span>
                    </button>
                </div>
            </Link>
            <div className="post-list">
                <table>
                    <thead>
                        <tr>
                            <th>Title <button onClick={handleSort}>↕</button></th>

                            <th>Publish Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArticles.map(article => (
                            <tr key={article.ArticleID}>
                                <td>{article.Title}</td>

                                <td>{new Date(article.PublishDate).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleDetail(article.ArticleID)}>Detail</button>
                                    <button onClick={() => handleEditClick(article)}>Edit</button>
                                    <button onClick={() => handleDeleteClick(article.ArticleID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pagination-container'>
                    <ThrowPage
                        current={currentPage}
                        onChange={handlePageChange}
                        total={articles.length}
                        productsPerPage={productsPerPage}
                    />
                </div>
            </div>
            {selectedArticleForEdit && (
                <EditArticleModal
                    article={selectedArticleForEdit}
                    onClose={() => setSelectedArticleForEdit(null)}
                    onSave={handleSaveArticle}
                />
            )}
        </div>
    );

    function handleDetail(id) {
        // Navigate to the detail page
        console.log('Detail button clicked for article id:', id);
    }
};

export default Posts;
