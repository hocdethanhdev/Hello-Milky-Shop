import { storage } from "../../config/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      reject("Only image files are allowed. Allowed formats: .png, .jpg, .jpeg.");
      return;
    }
    console.log(456);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Uploading image...");
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
