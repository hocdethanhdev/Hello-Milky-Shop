import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './News.css';
import ProductHot from './ProductHot';
import NavCate from '../product/ui-product-mom/NavCate';
import Loading from '../../layout/Loading';

const News = () => {
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/article/getCurrentCategoriesInArticles');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/article/getAllArticlesForViewer/');
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

    fetchCategories();
    fetchNews();
  }, []);

  const filteredNews = selectedCategory
    ? news.filter(article => article.ArticleCategoryID === parseInt(selectedCategory))
    : news;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredNews.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  return (
    <div className="container-news-us">
      <div className="row">
        <div className="col-md-9">
          <div className='url-list'>
            <NavCate />
            <div className="breadcrumb-area-thinh-url">
              <div className="container-thinh-url">
                <div className="row">
                  <div className="col-12">
                    <div className="breadcrumb-wrap-thinh-url">
                      <nav aria-label="breadcrumb-thinh-url">
                        <ul className="breadcrumb-thinh-url">
                          <li className="breadcrumb-item-thinh-url"><Link to="/"><i className="fa fa-home"></i></Link></li>
                          <li className="breadcrumb-item-thinh-url active" aria-current="page">
                            Tin tức
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="category-filter-news">
              <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Tất cả</option>
                {categories.map((category) => (
                  <option key={category.ArticleCategoryID} value={category.ArticleCategoryID}>
                    {category.ArticleCategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading && <Loading/>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <ul className="news-list">
            {currentPosts.map((article) => (
              <Link to={`/NewsDetail/${article.ArticleID}`} className="read-more-link" key={article.ArticleID}>
                <li className="news-item">
                  <div className="news-item-image">
                    <img className='anh-news-thinh' src={article.HeaderImage} alt={article.Title} />
                  </div>
                  <div className="news-item-content">
                    <h2>{article.Title}</h2>
                    <div className="news-item-summary">
                      <div dangerouslySetInnerHTML={{ __html: article.Content.substring(0, 100) + '...' }} />
                    </div>
                    <p>Ngày đăng: {new Date(article.PublishDate).toLocaleDateString()}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          <ul className="pagination chuyen-trang-new-thinh">
            <li className="page-item">
              <button onClick={prevPage} className="page-link" disabled={currentPage === 1}>
                Trang trước
              </button>
            </li>
            {Array.from({ length: Math.ceil(filteredNews.length / postsPerPage) }, (_, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button onClick={nextPage} className="page-link" disabled={currentPage === Math.ceil(filteredNews.length / postsPerPage)}>
                Trang sau
              </button>
            </li>
          </ul>
        </div>
        <div className="col-md-3 pro-list-news">
          <ProductHot />
        </div>
      </div>
    </div>
  );
};

export default News;
