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

const EditArticleModal = () => {
  const { articleID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Title: "",
    HeaderImage: "",
    PublishDate: null,
    AuthorID: "",
    ArticleCategoryID: "",
    Content: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/article/getArticlesByArticleID/${articleID}`
      )
      .then((response) => {
        const article = response.data[0];
        const publishDate = new Date(article.PublishDate);
        setFormData({
          Title: article.Title,
          HeaderImage: article.HeaderImage,
          PublishDate: isNaN(publishDate) ? null : publishDate,
          AuthorID: article.AuthorID,
          ArticleCategoryID: article.ArticleCategoryID,
          Content: article.Content,
        });
        setPreviewImage(article.HeaderImage);
      })
      .catch((error) => {
        console.error("There was an error fetching the article!", error);
      });
  }, [articleID]);

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      try {
        const imageUrl = await uploadImage(imageFile);
        setPreviewImage(imageUrl);
        setFormData({ ...formData, HeaderImage: imageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
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
    if (!formData.Title.trim()) {
      message.warning("Tiêu đề không được để trống.");
      window.scrollTo(0, 0);
      return;
    }
    if (!formData.ArticleCategoryID) {
      message.warning("Hãy chọn loại bài viết.");
      window.scrollTo(0, 0);
      return;
    }
    if (!formData.HeaderImage) {
      message.warning("Hãy thêm ảnh vào.");
      window.scrollTo(0, 0);
      return;
    }
    if (!formData.PublishDate) {
      message.warning("Ngày không được bỏ trống.");
      window.scrollTo(0, 0);
      return;
    }
    if (!editorContent.trim()) {
      message.warning("Nội dung không được để trống.");
      window.scrollTo(0, 0);
      return;
    }

    try {
      const sanitizedContent = DOMPurify.sanitize(editorContent, {
        ADD_TAGS: ["img"],
        ADD_ATTR: ["src", "alt"],
      });

      const postData = {
        ...formData,
        Content: sanitizedContent,
        PublishDate: formData.PublishDate
          ? formData.PublishDate.toISOString().split("T")[0]
          : null,
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

      message.success("Bài viết đã được sửa thành công.");
      navigate("/posts");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết!", error);
    }
  };


  const handleResizeImage = (editor) => {
    editor.events.on("mouseup", () => {
      const images = editor.container.querySelectorAll("img");
      images.forEach((image) => {
        const width = image.style.width;
        const height = image.style.height;
        if (width && height) {
          image.setAttribute("width", width);
          image.setAttribute("height", height);
        }
      });
    });
  };

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      toolbar: true,
      buttons: [
        "bold",
        "italic",
        "underline",
        "eraser",
        "ul",
        "ol",
        "indent",
        "outdent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "table",
        "|",
        "align",
        "undo",
        "redo",
        "hr",
        "|",
        "copyformat",
        "fullsize",
        {
          name: "uploadImage",
          iconURL: "https://cdn-icons-png.flaticon.com/128/685/685669.png",
          exec: async (editor) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async (event) => {
              const file = event.target.files[0];
              if (file) {
                try {
                  const url = await uploadImage(file);
                  const img = document.createElement("img");
                  img.src = url;
                  img.alt = "Image";
                  img.style.width = "100px";
                  img.style.height = "auto";
                  editor.selection.insertNode(img);
                  handleResizeImage(editor);
                } catch (error) {
                  console.error("Error uploading image:", error);
                }
              }
            };
            input.click();
          },
          tooltip: "Upload Image",
        },
      ],
      events: {
        afterInit: (editor) => {
          handleResizeImage(editor);
        },
        change: (newContent) => {
          const maxChars = 4000;
          if (newContent.length > maxChars) {
            editorRef.current.value = newContent.substring(0, maxChars);
            message.warning(`Nội dung không được vượt quá ${maxChars} ký tự.`);
          }
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
          setEditorContent(newContent); // cập nhật trạng thái editorContent
        }
      }
    }),
    []
  );


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
            <img src={previewImage} alt="Preview" className="preview-image-2" />
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
            <option value="" disabled>
              Chọn loại bài viết
            </option>
            <option value="1">Sức Khỏe</option>
            <option value="2">Tin khuyến mãi</option>
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
          </div>
        </div>
        <button type="submit" className="btn btn-primary long-nut-daga">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditArticleModal;
