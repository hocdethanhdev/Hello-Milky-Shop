import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditArticleModal.css";
import DOMPurify from "dompurify";
import { message } from "antd";
import { uploadImage } from "../uimg/UpImage";

const EditArticleModal = ({ onSave }) => {
  const { articleID } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    Title: "",
    HeaderImage: "",
    PublishDate: null,
    AuthorID: "",
    ArticleCategoryID: "",
    Content: ""
  });
  const [previewImage, setPreviewImage] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/article/getArticlesByArticleID/${articleID}`)
      .then((response) => {
        const article = response.data[0];
        const publishDate = new Date(article.PublishDate);
        setFormData({
          Title: article.Title,
          HeaderImage: article.HeaderImage,
          PublishDate: isNaN(publishDate) ? null : publishDate,
          AuthorID: article.AuthorID,
          ArticleCategoryID: article.ArticleCategoryID,
          Content: article.Content
        });
        setPreviewImage(article.HeaderImage);
      })
      .catch((error) => {
        console.error("There was an error fetching the article!", error);
      });
  }, [articleID]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
      setFormData({ ...formData, HeaderImage: imageFile });
    } else {
      setPreviewImage(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, PublishDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editorContent = editorRef.current.value;
      const sanitizedContent = DOMPurify.sanitize(editorContent, {
        ADD_TAGS: ["img"],
        ADD_ATTR: ["src", "alt"],
      });

      const postData = {
        ...formData,
        Content: sanitizedContent,
        PublishDate: formData.PublishDate ? formData.PublishDate.toISOString().split("T")[0] : null,
      };

      await axios.put(
        `http://localhost:5000/api/v1/article/editArticle/${articleID}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success('Bài viết đã được sửa thành công.');
      setTimeout(() => {
        navigate("/posts");

        window.location.reload();
        window.scrollTo(0, 0);
      }, 1000);
    } catch (error) {
      console.error("There was an error updating the article!", error);
    }
  };

  // const editorConfig = {
  //   readonly: false,
  //   toolbar: true,
  //   toolbarButtonSize: 'middle',
  //   toolbarSticky: false,
  //   showCharsCounter: false,
  //   showWordsCounter: false,
  //   showXPathInStatusbar: false,
  //   buttons: [
  //     'bold', 'italic', 'underline', 'strikethrough', 'eraser',
  //     '|', 'ul', 'ol', 'indent', 'outdent',
  //     '|', 'font', 'fontsize', 'brush', 'paragraph',
  //     '|', 'image', 'link', 'table',
  //     '|', 'align', 'undo', 'redo', 'hr',
  //     '|', 'copyformat', 'fullsize',
  //   ]
  // };
  const editorConfig = useMemo(() => ({
    readonly: false,
    toolbar: true,
    buttons: [
      'bold', 'italic', 'underline', 'eraser', 'ul', 'ol', 'indent', 'outdent',
      '|', 'font', 'fontsize', 'brush', 'paragraph',
      '|', 'table',
      '|', 'align', 'undo', 'redo', 'hr',
      '|', 'copyformat', 'fullsize',
      {
        name: 'uploadImage',
        iconURL: 'https://cdn-icons-png.flaticon.com/128/685/685669.png', // Biểu tượng hình ảnh
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

  return (
    <div className="edit-article-page">
      <h2>Chỉnh sửa bài viết</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label>Tiêu đề:</label>
          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group1">
          <label>
            Ngày công bố:
            <DatePicker
              selected={formData.PublishDate}
              onChange={handleDateChange}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </label>
        </div>
        <div className="form-group1">
          <label>Ảnh đầu trang:</label>
          <input type="file" onChange={handleImageChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="preview-image-2"
            />
          )}
        </div>
        <div className="col thinh-khung-hinhh">
          <label htmlFor="article-category-id">Loại bài viết:</label>
          <select
            className="form-control"
            id="article-category-id"
            name="ArticleCategoryID"
            value={formData.ArticleCategoryID}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Chọn loại bài viết</option>
            <option value="1">Sức Khỏe</option>
            <option value="2">Tin khuyến mãi</option>
            <option value="3">Tư vấn mua sắm</option>
          </select>
        </div>
        <div className="form-group1">
          <label>Nội dung:</label>
          <div className="edit-pso">
            <JoditEditor
              ref={editorRef}
              value={formData.Content}
              config={editorConfig}
            />
            {/* cái richtext do nếu bài nhiều nó bị cắn mất thanh slidebar nên bên css t chỉnh max-width 1200px
            nên là có chỉnh gì thì width đừng quá 1200px */}
          </div>

        </div>
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditArticleModal;
