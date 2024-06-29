import React, { useState, useEffect, useRef, useMemo } from 'react';
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import './EditProductModal.css';
import { uploadImage } from "../uimg/UpImage";

const EditProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...product });
    const editor = useRef(null);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        setFormData({ ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, Description: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allowedTags = ["img", "b", "i", "u", "s", "ul", "ol", "li", "p", "br", "hr", "a", "table", "thead", "tbody", "tr", "th", "td", "font", "span", "div"];
        const allowedAttrs = ["src", "alt", "href", "target", "width", "height", "style", "class", "align", "color", "size"];

        const sanitizedDescription = DOMPurify.sanitize(formData.Description, {
            ALLOWED_TAGS: allowedTags,
            ALLOWED_ATTR: allowedAttrs,
        });

        const updatedFormData = {
            ...formData,
            Description: sanitizedDescription,
            Status: parseInt(formData.Status), // Convert Status to number
        };
        onSave(updatedFormData);
    };

    const handleResizeImage = (editor) => {
        editor.events.on('mouseup', () => {
            const images = editor.container.querySelectorAll('img');
            images.forEach((image) => {
                const width = image.style.width;
                const height = image.style.height;
                if (width && height) {
                    image.setAttribute('width', width);
                    image.setAttribute('height', height);
                }
            });
        });
    };

    const editorConfig = useMemo(() => ({
        readonly: false,
        toolbar: true,
        toolbarButtonSize: 'middle',
        toolbarSticky: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', 'eraser',
            '|', 'ul', 'ol', 'indent', 'outdent',
            '|', 'font', 'fontsize', 'brush', 'paragraph',
            '|', 'image', 'link', 'table',
            '|', 'align', 'undo', 'redo', 'hr',
            '|', 'copyformat', 'fullsize',
            {
                name: 'uploadImage',
                iconURL: 'https://cdn-icons-png.flaticon.com/128/685/685669.png',
                exec: async (editor) => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (event) => {
                        const file = event.target.files[0];
                        if (file) {
                            try {
                                const url = await uploadImage(file, setProgress);
                                const img = document.createElement('img');
                                img.src = url;
                                img.alt = 'Image';
                                img.style.width = '100px';
                                img.style.height = 'auto';
                                editor.selection.insertNode(img);
                                handleResizeImage(editor);
                            } catch (error) {
                                console.error('Error uploading image:', error);
                            }
                        }
                    };
                    input.click();
                },
                tooltip: 'Upload Image'
            }
        ],
        useNativeSpeechRecognition: false,
        events: {
            afterInit: (editor) => {
                handleResizeImage(editor);
            },
            change: (newContent) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newContent;
                const images = tempDiv.querySelectorAll('img');
                images.forEach((image) => {
                    const width = image.style.width;
                    const height = image.style.height;
                    if (width && height) {
                        image.setAttribute('width', width);
                        image.setAttribute('height', height);
                    }
                });
            }
        }
    }), [setProgress]);

    return (
        <div className="modal-thinhprostedit">
            <div className="modal-content-thinhprostedit">
                <span className="close-thinhprostedit" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <label>
                            Tên sản phẩm:
                            <input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} />
                        </label>

                        <label>
                            Giá:
                            <input type="number" name="Price" value={formData.Price} onChange={handleChange} />
                        </label>
                        <label>
                            Số lượng:
                            <input type="number" name="StockQuantity" value={formData.StockQuantity} onChange={handleChange} />
                        </label>
                        <label>
                            Ảnh:
                            <input type="text" name="Image" value={formData.Image} onChange={handleChange} />
                        </label>
                        <label>
                            Ngày hết hạn:
                            <input type="date" name="ExpirationDate" value={formData.ExpirationDate} onChange={handleChange} />
                        </label>
                        <label>
                            Ngày sản xuất:
                            <input type="date" name="ManufacturingDate" value={formData.ManufacturingDate} onChange={handleChange} />
                        </label>
                        <label>
                            Thương hiệu:
                            <input type="text" name="BrandName" value={formData.BrandName} onChange={handleChange} />
                        </label>
                        <label>
                            Phân loại sữa:
                            <select name="ProductCategoryName" value={formData.ProductCategoryName} onChange={handleChange}>
                                <option value="Sữa cho mẹ">Sữa cho mẹ</option>
                                <option value="Sữa cho em bé">Sữa cho em bé</option>
                            </select>
                        </label>

                        <label>
                            Trạng thái:
                            <select name="Status" value={formData.Status} onChange={handleChange}>
                                <option value="0">Out of stock</option>
                                <option value="1">Still in stock</option>
                            </select>
                        </label>

                    </div>
                    <label className='edit-pro-thinh'>
                        Mô tả:
                        <JoditEditor
                            ref={editor}
                            value={formData.Description}
                            config={editorConfig}
                            onBlur={handleDescriptionChange}
                        />
                    </label>
                    <button className="button-edit-product" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
