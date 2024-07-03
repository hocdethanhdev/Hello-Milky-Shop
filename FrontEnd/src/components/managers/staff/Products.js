import React, { useState, useEffect } from "react";
import "./Products.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import ProductDetailModal from "./ProductDetailModal";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import { message } from "antd";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const productsPerPage = 10;
  const navigate = useNavigate();
  // Fetch products from the API
  const fetchInforProductDetail = () => {
    fetch("http://localhost:5000/api/v1/product/getInfoProductsDetail")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchInforProductDetail();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let updatedProducts = [...products];

    if (categoryFilter !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.ProductCategoryName === categoryFilter
      );
    }

    if (statusFilter !== "All") {
      updatedProducts = updatedProducts.filter((product) => {
        if (statusFilter === "Tạm ẩn") {
          return product.Status === false;
        } else if (statusFilter === "Còn hàng") {
          return product.Status === true && product.StockQuantity > 0;
        } else if (statusFilter === "Hết hàng") {
          return product.Status === true && product.StockQuantity === 0;
        }
        return true;
      });
    }

    if (sortOrder === "asc") {
      updatedProducts.sort((a, b) =>
        a.ProductName.localeCompare(b.ProductName)
      );
    } else {
      updatedProducts.sort((a, b) =>
        b.ProductName.localeCompare(a.ProductName)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [products, sortOrder, categoryFilter, statusFilter]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Toggle sort order
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle category filter change
  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.getAttribute("data-value"));
    setShowCategoryDropdown(false);
  };

  // Handle status filter change
  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.getAttribute("data-value"));
    setShowStatusDropdown(false);
  };

  // Toggle dropdown visibility
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".category-header") && showCategoryDropdown) {
        setShowCategoryDropdown(false);
      }
      if (!event.target.closest(".status-header") && showStatusDropdown) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategoryDropdown, showStatusDropdown]);

  // Handle product detail modal
  const handleDetailClick = (product) => {
    setSelectedProduct(product);
  };

  // Close modals
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Handle product delete
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setShowDeletePopup(true);
  };

  // Confirm delete
  const handleToggleStatus = (product) => {
    const updatedProduct = {
      ...product,
      Status: product.Status === 1 ? 0 : 1,
    };

    fetch(
      `http://localhost:5000/api/v1/product/editProduct/${product.ProductID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.ProductID === product.ProductID ? updatedProduct : p
          )
        );
        console.log(data);
        message.success("Trạng thái sản phẩm đã được cập nhật!");
        fetchInforProductDetail();
      })
      .catch((error) => {
        message.error("Lỗi khi cập nhật trạng thái sản phẩm: " + error.message);
      });
  };
  const confirmDelete = () => {
    fetch(
      `http://localhost:5000/api/v1/product/deleteProduct/${productToDelete}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message !== "Deleted") {
          message.error("Lỗi khi xóa sản phẩm.");
        } else {
          setProducts(
            products.map((product) =>
              product.ProductID === productToDelete
                ? { ...product, Status: 0 }
                : product
            )
          );
          message.success("Xóa sản phẩm thành công!");
          fetchInforProductDetail();
        }
        setShowDeletePopup(false);
      })
      .catch((error) => {
        message.error("Lỗi khi xóa sản phẩm: " + error.message);
        setShowDeletePopup(false);
      });
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeletePopup(false);
    setProductToDelete(null);
  };

  // Handle product edit
  const handleEditClick = (productID) => {
    navigate(`/edit-product/${productID}`);
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="product-container">
      <div className="main-content-product">
        <div className="d-flex justify-content-end align-items-end">
          <Link to="/addingproduct">
            <button type="button" className="button-add-product">
              <span className="far fa-plus-square btn btn-secondary"></span>
            </button>
          </Link>
        </div>
        <div className="product-list">
          <table>
            <thead>
              <tr className="row">
                <th className="col-md-1">Mã</th>
                <th className="col-md-4" onClick={handleSort} style={{ cursor: "pointer" }}>
                  Tên sản phẩm
                  <FontAwesomeIcon icon={faSort} />
                </th>
                <th className="category-header col-md-2">
                  Loại sản phẩm{" "}
                  <FontAwesomeIcon
                    icon={faFilter}
                    onClick={toggleCategoryDropdown}
                  />
                  {showCategoryDropdown && (
                    <ul className="dropdown-thinh-staff">
                      <li
                        className="dropdown-li-thinh"
                        data-value="All"
                        onClick={handleCategoryFilter}
                      >
                        Tất cả
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Sữa cho em bé"
                        onClick={handleCategoryFilter}
                      >
                        Sữa cho em bé
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Sữa cho mẹ bầu"
                        onClick={handleCategoryFilter}
                      >
                        Sữa cho mẹ bầu
                      </li>
                    </ul>
                  )}
                </th>
                <th className="status-header col-md-2">
                  Trạng thái{" "}
                  <FontAwesomeIcon
                    icon={faFilter}
                    onClick={toggleStatusDropdown}
                  />
                  {showStatusDropdown && (
                    <ul className="dropdown-thinh-staff">
                      <li
                        className="dropdown-li-thinh"
                        data-value="All"
                        onClick={handleStatusFilter}
                      >
                        Tất cả
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Tạm ẩn"
                        onClick={handleStatusFilter}
                      >
                        Tạm ẩn
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Còn hàng"
                        onClick={handleStatusFilter}
                      >
                        Còn hàng
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Hết hàng"
                        onClick={handleStatusFilter}
                      >
                        Hết hàng
                      </li>
                    </ul>
                  )}
                </th>
                <th className="col-md-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr className="row" key={product.ProductID}>
                  <td className="col-md-1">{product.ProductID}</td>
                  <td className="col-md-4">{product.ProductName}</td>
                  <td className="col-md-2">{product.ProductCategoryName}</td>
                  <td className="col-md-2">
                    {product.Status === null || product.Status === false
                      ? "Tạm ẩn"
                      : product.Status === true &&
                        parseInt(product.StockQuantity) > 0
                        ? "Còn hàng"
                        : "Hết hàng"}
                  </td>
                  <td className="nut-act col-md-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleDetailClick(product)}
                    >
                      Xem
                    </button>

                    {product.Status === true ? (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(product.ProductID)}
                      >
                        Xóa
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleToggleStatus(product)}
                      >
                        Mở
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleEditClick(product.ProductID)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container-cf">
            <ThrowPage
              current={currentPage}
              onChange={handlePageChange}
              total={filteredProducts.length}
              itemsPerPage={productsPerPage}
            />
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      {showDeletePopup && (
        <DeleteConfirmationPopup
          visible={showDeletePopup}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Products;
