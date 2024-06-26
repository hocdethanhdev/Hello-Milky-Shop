import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './News.css';
import ProductHot from './ProductHot'; // Import the ProductHot component

const News = () => {
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/article/getAllArticles/');
        if (response.data.length === 0) {
          setErrorMessage("Hiện tại chưa có bài viết nào.");
        }
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
        setErrorMessage("Error fetching news: " + (error.response?.data || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <h1>Tin tức</h1>
          {loading && <div>Đang tải...</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <ul className="news-list">
            {currentPosts.map((article) => (
              <li key={article.ArticleID} className="news-item">
                <div className="news-item-image">
                  <img className='anh-news-thinh' src={article.HeaderImage} alt={article.Title} />
                </div>
                <div className="news-item-content">
                  <h2>{article.Title}</h2>
                  <div className="news-item-summary">
                    <div dangerouslySetInnerHTML={{ __html: article.Content.substring(0, 150) + '...' }} />
                  </div>
                  <p>Published on: {new Date(article.PublishDate).toLocaleDateString()}</p>
                  <Link to={`/NewsDetail/${article.ArticleID}`} className="read-more-link">Read more</Link>

                </div>
              </li>
            ))}
          </ul>
          <ul className="pagination">
            <li className="page-item">
              <button onClick={prevPage} className="page-link" disabled={currentPage === 1}>
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(news.length / postsPerPage) }, (_, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button onClick={nextPage} className="page-link" disabled={currentPage === Math.ceil(news.length / postsPerPage)}>
                Next
              </button>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <ProductHot />
        </div>
      </div>
    </div>
  );
};

export default News;
