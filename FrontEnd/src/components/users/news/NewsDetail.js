import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/article/getArticlesByArticleID/${id}`);
        // Assuming the response is an array with a single article object
        setArticle(response.data[0]);
      } catch (error) {
        console.error('Error fetching article:', error);
        setErrorMessage("Error fetching article: " + (error.response?.data || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (errorMessage) return <div className="error-message">{errorMessage}</div>;
  if (!article) return null; // Handle case where article is not yet fetched or doesn't exist

  // Dummy recommended articles
  const recommendedArticles = [
    {
      image: 'https://tse1.mm.bing.net/th?id=OIP.aeX5lXSeVNjBChU4Z5zzMAAAAA&pid=Api&P=0&h=180',
      title: 'Recommended Article 1'
    },
    {
      image: 'https://tse1.mm.bing.net/th?id=OIP.aeX5lXSeVNjBChU4Z5zzMAAAAA&pid=Api&P=0&h=180',
      title: 'Recommended Article 2'
    },
    {
      image: 'https://tse1.mm.bing.net/th?id=OIP.aeX5lXSeVNjBChU4Z5zzMAAAAA&pid=Api&P=0&h=180',
      title: 'Recommended Article 3'
    },
    {
      image: 'https://tse1.mm.bing.net/th?id=OIP.aeX5lXSeVNjBChU4Z5zzMAAAAA&pid=Api&P=0&h=180',
      title: 'Recommended Article 4'
    },
    {
      image: 'https://tse1.mm.bing.net/th?id=OIP.aeX5lXSeVNjBChU4Z5zzMAAAAA&pid=Api&P=0&h=180',
      title: 'Recommended Article 5'
    }
  ];

  return (
    <div className="article-page">
      <div className="main-article">
        <div className="article-header">
          <h2>{article.Title}</h2>
          <p className="article-meta">
            Đăng bởi: {article.AuthorID} | Ngày đăng: {new Date(article.PublishDate).toLocaleDateString()}
          </p>
        </div>
        <div className="article-content">
          {/* <img src={article.HeaderImage} alt={article.Title} /> */}
          <div dangerouslySetInnerHTML={{ __html: article.Content.substring(0, 10000) }} />
        </div>
      </div>
      <div className="sidebar">
        <h3>DÀNH CHO BẠN HÔM NAY</h3>
        {recommendedArticles.map((item, index) => (
          <div key={index} className="recommended-article">
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;
