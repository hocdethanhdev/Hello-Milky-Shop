import React, { useState, useRef, useMemo } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uploadImage } from "../uimg/UpImage";
import sanitizeHtml from "sanitize-html";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";

function PostsAdd() {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [headerImageURL, setHeaderImageURL] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [articleCategoryID, setArticleCategoryID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  const editor = useRef(null);

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    setHeaderImage(imageFile);

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
    }

    if (imageFile) {
      try {
        const url = await uploadImage(imageFile, setProgress);
        setHeaderImageURL(url);
      } catch (error) {
        console.error("Error uploading header image:", error);
        setErrorMessage("Error uploading header image: " + error.message);
      }
    }
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
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', 'eraser',
      '|', 'ul', 'ol', 'indent', 'outdent',
      '|', 'font', 'fontsize', 'brush', 'paragraph',
      '|', 'link', 'table',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!headerImageURL) {
      setErrorMessage("Header image is required.");
      return;
    }

    try {
      const editorContent = editor.current.value;
      const sanitizedContent = sanitizeHtml(editorContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          img: ["src", "alt", "style", "width", "height"],
        },
      });

      const postData = {
        Title: title,
        HeaderImage: headerImageURL,
        Content: sanitizedContent,
        PublishDate: publishDate.toISOString().split("T")[0],
        AuthorID: userId,
        ArticleCategoryID: parseInt(articleCategoryID),
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/article/createArticle/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created successfully:", response.data);
      // Reset form or handle success action
    } catch (error) {
      console.error("Error creating post:", error.response);
      setErrorMessage(
        "Error creating post: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <div className="container post-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="header-image">Header Image:</label>
            <input
              type="file"
              className="form-control"
              id="header-image"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>
        {previewImage && (
          <div className="row mb-3">
            <div className="col">
              <img src={previewImage} alt="Preview" className="preview-image" />
            </div>
          </div>
        )}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="content">Content:</label>
            <div className="editor">
              <JoditEditor
                ref={editor}
                config={editorConfig}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="publish-date">Publish Date:</label>
            <DatePicker
              selected={publishDate}
              onChange={(date) => setPublishDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="article-category-id">Article Category ID:</label>
            <input
              type="number"
              className="form-control"
              id="article-category-id"
              value={articleCategoryID}
              onChange={(e) => setArticleCategoryID(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default PostsAdd;
