import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function CreatePostForm() {
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

  return (
    <form className="flex flex-col gap-4 h-screen">
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput
          type="text"
          placeholder="Enter a title"
          id="title"
          className="flex-1"
        />
        <Select>
          <option value="uncategorized">Select Category</option>
          <option value="javascript">JavaScript</option>
          <option value="reactjs">React.js</option>
          <option value="nextjs">Next.js</option>
        </Select>
      </div>

      <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
        <FileInput type="file" accept="image/*" />
        <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline>
          Upload Image
        </Button>
      </div>

      <div style={{ width: "100%", height: 300, marginBottom: "16px" }}>
        <div ref={quillRef} />
      </div>
      <Button
        type="submit"
        gradientDuoTone="purpleToPink"
        className="mt-12 lg:mt-8"
      >
        Publish
      </Button>
    </form>
  );
}
