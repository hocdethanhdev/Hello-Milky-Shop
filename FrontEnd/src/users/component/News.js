import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Số bài viết trên mỗi trang

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

  // Logic for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="news-container">
      <h1>Tin tức</h1>
      {loading && <div>Đang tải...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <ul className="news-list">
        {currentPosts.map((article) => (
          <li key={article.ArticleID} className="news-item">
            <img src={`http://localhost:5000/images/${article.HeaderImage}`} alt={article.Title} />
            <h2>{article.Title}</h2>
            {/* Render HTML content safely */}
            <div dangerouslySetInnerHTML={{ __html: article.Content }} />
            <p>Published on: {new Date(article.PublishDate).toLocaleDateString()}</p>
            <Link to={`/news/${article.ArticleID}`} className="read-more-link">Read more</Link>
          </li>
        ))}
      </ul>
      {/* Pagination */}
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
  );
};

export default News;
