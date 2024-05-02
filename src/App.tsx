import "./App.css";
import { useDropzone } from "react-dropzone";
import img from "./assets/undraw_image_viewer_re_7ejc.svg";
import loadingimg from "./assets/loading.png";
import { useEffect, useState } from "react";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";

function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, SetResult] = useState({ text: "", json: [] });

  const { acceptedFiles, isDragActive, getRootProps, getInputProps } =
    useDropzone({ multiple: false, accept: { "image/*": [] } });

  useEffect(() => {
    if (acceptedFiles[0]) {
      setLoading(true);
      let reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setLoading(false);
      };
    }
  }, [acceptedFiles]);

  const generateInformation = async () => {
    if (!selectedImage) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("base64Image", selectedImage);
      formData.append("isOverlayRequired", "true");
      const { data } = await axios.post(
        "https://api.ocr.space/parse/image",
        formData,
        { headers: { apikey: "K86196340888957" } }
      );
      SetResult({
        text: data?.ParsedResults[0]?.ParsedText,
        json: data?.ParsedResults[0]?.TextOverlay?.Lines,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Image Recognition</h1>
      <div
        className={isDragActive ? "imagecontainer__active" : "imagecontainer"}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <img src={selectedImage || img} style={{ height: "75%" }} />
        {loading && (
          <div className="imageloading">
            <img className="image" src={loadingimg} />
          </div>
        )}
        {!selectedImage && (
          <span
            style={{
              color: `${isDragActive ? "teal" : "grey"}`,
              fontSize: "20px",
              padding: "10px",
              fontWeight: "600",
            }}
          >
            {isDragActive
              ? "Drag the image here"
              : "Click here or drag the image here"}
          </span>
        )}
      </div>
      <div className="card">
        <button onClick={generateInformation}>Start Recognition</button>
      </div>
      {result.text && (
        <>
          <div>
            <textarea className="textarea" value={result.text} readOnly />
          </div>
          <div>
            {/* <SyntaxHighlighter
              language="javascipt"
              customStyle={{ width: "550px", height: "300px" }}
            >
              {
                '{"browsers":{"firefox":{"name":"Firefox","pref_url":"about:config","releases":{"1":{"release_date":"2004-11-09","status":"retired","engine":"Gecko","engine_version":"1.7"}}}}}'
              }
            </SyntaxHighlighter> */}
          </div>
        </>
      )}
      <p className="read-the-docs">
        -----------------------Generating text from image-----------------------
      </p>
    </>
  );
}

export default App;
