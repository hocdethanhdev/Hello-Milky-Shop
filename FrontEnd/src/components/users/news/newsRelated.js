import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './newsRelated.css';
import { Link } from 'react-router-dom';

const NewsRelated = ({ articleCategoryID, articleID }) => {
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const handleProductClick = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const fetchRelatedArticles = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/v1/article/getTop5ArticleSameType',
                    {
                        ArticleID: articleID,
                        ArticleCategoryID: articleCategoryID
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setRelatedArticles(response.data.data);
            } catch (error) {
                console.error('Error fetching related articles:', error);
                setErrorMessage("Error fetching related articles: " + (error.response?.data || error.message));
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedArticles();
    }, [articleCategoryID, articleID]);

    if (loading) return <div>Đang tải...</div>;
    if (errorMessage) return <div className="error-message">{errorMessage}</div>;

    return (
        <div className="related-articles">
            {relatedArticles.map(article => (
                <Link
                    to={`/NewsDetail/${article.ArticleID}`}
                    className="read-more-link-relate"
                    onClick={handleProductClick}
                    key={article.ArticleID}
                >
                    <div className="related-article">
                        <img src={article.HeaderImage} alt={article.Title} className="related-article-image" />
                        <div className="related-article-content">
                            <h3 className="related-article-title">{article.Title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: article.Content.substring(0, 105) + '...' }} />
                            <p className="related-article-date">{new Date(article.PublishDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NewsRelated;
