import { useState } from "react";
import "./index.css";

function App() {
  const [text, useText] = useState("");

  // function for changing text

  const textPreview = () => {
    return useText;
  };

  return (
    <>
      <textarea id="editor" onChange={textPreview}>
        {text}
      </textarea>
      <div id="preview"></div>
    </>
  );
}

export default App;
