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
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PostService from "../../../services/api/post.api";
import { filterEmptyFields } from "../../../utils/filteredData";

export default function PostForm({ post = null }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { quill, quillRef } = useQuill({
    modules: {
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
    },
    placeholder: "Write something...",
  });

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
  });

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    progress: null,
    error: null,
    publishError: null,
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setFormData((prev) => ({ ...prev, content: quill.root.innerHTML }));
      });
    }
  }, [quill]);

  useEffect(() => {
    if (post) {
      setFormData(post);

      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(post.content);
      }
    }
  }, [post, quill]);

  const handleUploadImage = async () => {
    if (!file) {
      setUploadStatus((prev) => ({ ...prev, error: "Please select an image" }));
      return;
    }
    setUploadStatus((prev) => ({ ...prev, error: null }));

    try {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadStatus((prev) => ({
            ...prev,
            progress: progress.toFixed(0),
          }));
        },
        (error) => {
          setUploadStatus({ progress: null, error: "Image upload failed." });
          setFile(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadStatus({ progress: null, error: null });
            setFile(null);
            setFormData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setUploadStatus({ progress: null, error: error.message });
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus((prev) => ({ ...prev, publishError: null }));

    try {
      if (location.pathname.includes("update-post")) {
        await PostService.update(post._id, filterEmptyFields(formData));
      } else {
        await PostService.create(filterEmptyFields(formData));
      }
      navigate("/dashboard?tab=posts");
    } catch (error) {
      setUploadStatus((prev) => ({ ...prev, publishError: error.message }));
      console.error(error);
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
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          value={formData.category}
        >
          <option value="uncategorized">Select Category</option>
          <option value="Javascript">JavaScript</option>
          <option value="Node.js">Node.js</option>
          <option value="TypeScript">TypeScript</option>
          <option value="React.js">React.js</option>
          <option value="Next.js">Next.js</option>
          <option value="APIs">APIs</option>
          <option value="CSS">CSS</option>
          <option value="Coding">Coding</option>
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
          disabled={uploadStatus.progress !== null}
        >
          {uploadStatus.progress ? (
            <div className="w-16 h-16">
              <CircularProgressbar
                value={uploadStatus.progress}
                text={`${uploadStatus.progress || 0}%`}
              />
            </div>
          ) : (
            "Upload Image"
          )}
        </Button>
      </div>

      {uploadStatus.error && (
        <Alert color="failure">
          <span>{uploadStatus.error}</span>
        </Alert>
      )}

      {formData.image && (
        <div className="flex justify-center">
          <img
            src={formData.image}
            alt="uploaded"
            className="w-full h-72 object-cover"
          />
        </div>
      )}

      <div style={{ height: "300px" }}>
        <div ref={quillRef} style={{ height: "80%" }} />
      </div>

      {uploadStatus.publishError && (
        <Alert color="failure">
          <span>{uploadStatus.publishError}</span>
        </Alert>
      )}
      <Button type="submit" gradientDuoTone="purpleToPink">
        {post ? "Edit" : "Publish"}
      </Button>
    </form>
  );
}
