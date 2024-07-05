import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './NewsDetail.css';
import NavCate from '../product/ui-product-mom/NavCate';
import NewsRelated from './newsRelated';
import ProductHot from './ProductHot';
import { Link } from 'react-router-dom';
import Loading from '../../layout/Loading';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [authorName, setAuthorName] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://hellomilkyshop123.azurewebsites.net/api/v1/article/getArticlesByArticleID/${id}`);
        const fetchedArticle = response.data[0];
        setArticle(fetchedArticle);
        const authorResponse = await axios.get(`https://hellomilkyshop123.azurewebsites.net/api/v1/user/getUserByID?UserID=${fetchedArticle.AuthorID}`);
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

                      <li className="breadcrumb-item-thinh-url"><a href="/News">Tin tức</a></li>
                      <li className="breadcrumb-item-thinh-url active" aria-current="page">
                        {article.Title.substring(0, 50) + '...'}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="article-page col-md-7">
        <div className="main-article">
          <div className="article-header">
            <h2>{article.Title}</h2>
            <p className="article-meta">
              Đăng bởi: {authorName} | Ngày đăng:  {new Date(article.PublishDate).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: article.Content.substring(0, 50000) }} />
          </div>
        </div>
        <div className='edit-thinh-new-detail'>
          <h3>Tin tức liên quan</h3>
          <NewsRelated articleCategoryID={article.ArticleCategoryID} articleID={article.ArticleID} />
        </div>
      </div>
      <div className='col-md-3 phai-detail-thinh'> <ProductHot /></div>

    </div>
  );
};

export default NewsDetail;
