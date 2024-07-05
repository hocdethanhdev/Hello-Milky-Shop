import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Tintuc.css';
import { config } from "../../../config";

const Tintuc = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch(`${config.API_ROOT}/api/v1/article/getTop4ArticlesForViewer/`)
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div className="tintuc-container">
            <div className="tintuc-header">
                <h2 className='thinh-gia-soc-lam'>Tin tức</h2>
                <Link to="/News" className="view-all-thinh-new">Xem tất cả</Link>
            </div>
            <div className="tintuc-articles">
                {articles.map(article => (
                    <Link to={`/NewsDetail/${article.ArticleID}`} className="tintuc-article" key={article.ArticleID}>
                        <img src={article.HeaderImage} alt={article.Title} className="tintuc-image" />
                        <h3>{article.Title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: article.Content.substring(0, 100) + '...' }} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Tintuc;
