import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewArticle.css';
import Loading from '../../layout/Loading';
import config from "../../config/config";

const ViewArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [authorName, setAuthorName] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${config.API_ROOT}/api/v1/article/getArticlesByArticleID/${id}`);
                const fetchedArticle = response.data[0];
                setArticle(fetchedArticle);
                const authorResponse = await axios.get(`${config.API_ROOT}/api/v1/user/getUserByID?UserID=${fetchedArticle.AuthorID}`);
                setAuthorName(authorResponse.data.data.UserName);
            } catch (error) {
                console.error('Error fetching article:', error);
                setErrorMessage("Error fetching article: " + (error.response?.data || error.message));
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <Loading />;
    if (errorMessage) return <div className="error-message">{errorMessage}</div>;
    if (!article) return null;
    return (
        <div className='row'>

            <div className="article-page-st col-md-7">
                <div className="main-article-st">
                    <div className="article-header-st">
                        <h2>{article.Title}</h2>
                        <p className="article-meta-st">
                            Đăng bởi: {authorName} | Ngày đăng:  {new Date(article.PublishDate).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div className="article-content-st">
                        <div dangerouslySetInnerHTML={{ __html: article.Content.substring(0, 50000) }} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ViewArticle;
