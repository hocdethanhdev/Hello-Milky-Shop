import { storage } from "../../config/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Tải ảnh thành công");
      },
      (error) => {
        console.error("Upload failed:", error);
        reject("Upload failed: " + error.message);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject("Error getting download URL: " + error.message);
        }
      }
    );
  });
};
