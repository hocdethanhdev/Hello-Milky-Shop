import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";
import { Link, useNavigate } from "react-router-dom";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationPopupForArticle from "./DeleteConfirmationPopupForArticle";

function Posts() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "Title",
    direction: "ascending",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteArticleId, setDeleteArticleId] = useState(null);

  const productsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/article/getAllArticles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the articles!", error);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = () => {
    let direction =
      sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key: "Title", direction });
  };

  const sortedArticles = [...articles].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentArticles = sortedArticles.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleEditClick = (articleID) => {
    navigate(`/edit-article/${articleID}`);
  };

  const handleDeleteClick = (articleID) => {
    setDeleteArticleId(articleID);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    axios
      .put(`http://localhost:5000/api/v1/article/deleteArticle/${deleteArticleId}`)
      .then((response) => {
        setArticles(
          articles.filter((article) => article.ArticleID !== deleteArticleId)
        );
        setShowDeletePopup(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the article!", error);
        setErrorMessage(
          "There was an error deleting the article: " +
          (error.response?.data || error.message)
        );
        setShowDeletePopup(false);
      });
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="posts-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="d-flex justify-content-end align-items-end">
        <Link to="/addingpost">
          <button type="button" className="button-add-voucher">
            <span className="far fa-plus-square btn btn-secondary"></span>
          </button>
        </Link>
      </div>
      <div className="post-list">
        <table>
          <thead>
            <tr>
              <th onClick={handleSort} style={{ cursor: "pointer" }}>
                Tiêu đề <FontAwesomeIcon icon={faSort} />
              </th>
              <th>Ảnh</th>
              <th>Ngày công bố</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.map((article) => (
              <tr key={article.ArticleID}>
                <td>{article.Title}</td>
                <td>
                  <img
                    src={article.HeaderImage}
                    alt="Header Image"
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{new Date(article.PublishDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditClick(article.ArticleID)}>
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(article.ArticleID)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <ThrowPage
            current={currentPage}
            onChange={handlePageChange}
            total={articles.length}
            productsPerPage={productsPerPage}
          />
        </div>
      </div>
      {showDeletePopup && (
        <DeleteConfirmationPopupForArticle
          visible={showDeletePopup}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Posts;
