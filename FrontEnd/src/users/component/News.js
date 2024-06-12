import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/article/getAllArticles/');
        setNews(response.data); // Chỉnh lại theo cấu trúc JSON của API
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1>Tin tức</h1>
      <ul className="news-list">
        {news.map((article) => (
          <li key={article.ArticleID} className="news-item">
            <img src={`http://localhost:5000/images/${article.HeaderImage}`} alt={article.Title} />
            <h2>{article.Title}</h2>
            <p>{article.Content}</p>
            <p>Published on: {new Date(article.PublishDate).toLocaleDateString()}</p>
            <a href={article.url}>Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
