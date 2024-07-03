import React, { useEffect, useState } from "react";
import { imageDb } from "./firebase.config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function UploadImage() {
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${uuidv4()}`);
      uploadBytes(imgRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImgUrl((prevUrls) => [...prevUrls, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files")).then((result) => {
      result.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgUrl((prevUrls) => [...prevUrls, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={handleClick}>Upload</button>
      <br />
      {imgUrl.map((url, index) => (
        <div key={url}>
          <img src={url} alt={`Image ${index}`} height="200px" width="200px" />
          <br />
        </div>
      ))}
    </div>
  );
}

export default UploadImage;
