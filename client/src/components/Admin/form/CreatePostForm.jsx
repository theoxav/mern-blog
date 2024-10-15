import { app } from "../../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PostService from "../../../services/api/post/post.api";

export default function CreatePostForm() {
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const placeholder = "Write something...";

  const { quill, quillRef } = useQuill({ modules, placeholder });
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setImageUploadProgress(progress.toFixed(0));
        },

        (error) => {
          setImageUploadError("Image upload failed.");
          setImageUploadProgress(null);
          setFile(null);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setFile(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError(error.message);
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const content = quill.root.innerHTML;
        setFormData((prev) => ({ ...prev, content }));
      });
    }
  }, [quill]);

  const handleSubmit = async (e) => {
    setPublishError(null);
    e.preventDefault();
    try {
      const data = await PostService.create(formData);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError(error.message);
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-4 h-screen" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput
          type="text"
          placeholder="Enter a title"
          id="title"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="uncategorized">Select Category</option>
          <option value="javascript">JavaScript</option>
          <option value="reactjs">React.js</option>
          <option value="nextjs">Next.js</option>
        </Select>
      </div>

      <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button
          type="button"
          gradientDuoTone="purpleToBlue"
          size="sm"
          outline
          onClick={handleUploadImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <div className="w-16 h-16">
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
              />
            </div>
          ) : (
            "Upload Image"
          )}
        </Button>
      </div>

      {imageUploadError && (
        <Alert color="failure">
          <span>{imageUploadError}</span>
        </Alert>
      )}

      {formData.image && (
        <div className="flex justify-center">
          <img
            src={formData.image}
            alt="uploaded image"
            className="w-full h-72 object-cover"
          />
        </div>
      )}

      <div style={{ height: "300px" }}>
        <div ref={quillRef} style={{ height: "80%" }} />
      </div>

      {publishError && (
        <Alert color="failure">
          <span>{publishError}</span>
        </Alert>
      )}
      <Button type="submit" gradientDuoTone="purpleToPink">
        Publish
      </Button>
    </form>
  );
}
