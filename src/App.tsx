import "./App.css";

function App() {
  const fileInputHandler = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(files);
  };

  return (
    <>
      <h1>Image Recognition</h1>
      <div
        style={{
          height: "350px",
          width: "550px",
          border: "1px dashed grey",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{
            height: "100%",
            width: "100%",
            cursor: "pointer",
            position: "absolute",
            opacity: "0",
          }}
          onChange={fileInputHandler}
        />
        <span style={{ color: "gray", fontSize: "20px" }}>
          Click here or drag the image here
        </span>
      </div>
      <div className="card">
        <button>Start Recognition</button>
      </div>
      <p className="read-the-docs">
        -----------------------Generating text from image-----------------------
      </p>
    </>
  );
}

export default App;
