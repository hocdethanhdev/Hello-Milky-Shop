
import './ProductDetailModal.css';




const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="modal-overlay-thinhprost">
            <div className="modal-content-thinhprost">
                <span className="close-button-thinhprost" onClick={onClose}>&times;</span>
                <h2>Product Details</h2>
                <div className='modal-thinh-anh-thinhprost'>
                    <img src={product.Image} alt={product.ProductName} style={{ maxWidth: '100%' }} />
                </div>
                <div>

                    <p><strong>ID:</strong> {product.ProductID}</p>
                    <p><strong>Name:</strong> {product.ProductName}</p>
                    <p><strong>Description:</strong> {product.Description}</p>
                    <p><strong>Price:</strong> {product.Price}</p>
                    <p><strong>Stock Quantity:</strong> {product.StockQuantity}</p>
                    <p><strong>Expiration Date:</strong> {new Date(product.ExpirationDate).toLocaleDateString()}</p>
                    <p><strong>Manufacturing Date:</strong> {new Date(product.ManufacturingDate).toLocaleDateString()}</p>
                    <p><strong>Brand:</strong> {product.BrandName}</p>
                    <p><strong>Category:</strong> {product.ProductCategoryName}</p>
                    <p><strong>Status:</strong> {product.Status ? 'Still in stock' : 'Out of stock'}</p>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailModal;
