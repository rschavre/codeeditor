import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import postPythonCode from "./backendController/pythonBackend";
import './Code.css'

const CodeEditor = () => {
    
  const editorRef = useRef(null); // Attach to Monaco Editor. No re render
  const editorInstance = useRef(null);
  
  // Store code for each language
  const code = useRef({
    javascript: "// Write your JavaScript code here...\nalert('hi')",
    python: "# Write your Python code here...\nprint(\"hi\")",
    java: "// Write your Java code here...",
  });

  const [output, setOutput] = useState(""); // To store execution result
  const [stateLanguage, setLanguage] = useState("javascript"); // Language state

  // Initialize Monaco Editor
  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: code.current[stateLanguage], // Set initial code based on language
        language: stateLanguage, // Set initial language
        theme: "vs-dark", // Set default theme

        automaticLayout: true, // Auto adjust layout
      });
    }

    return () => {
      if (editorInstance?.current) {
        editorInstance?.current?.dispose(); // Clean up the editor instance
      }
    };
  }, [stateLanguage]); // Reinitialize when language or code changes
    
  // Handle code change and store it for each language
    const handleEditorChange = () => {
        const currentCode = editorInstance?.current?.getValue();
        code.current[stateLanguage] = currentCode
        // setCode((prevCode) => ({
        // ...prevCode,
        // stateLanguage: currentCode||"", // Save current code for the active language
        // }));
    };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    handleEditorChange();
    setLanguage(newLanguage); // Update the language state
  };

  
  // Execute the code in the editor (basic eval for JavaScript, custom logic for others)
  const handleRunCode = async () => {
    handleEditorChange();
    const currentCode = code.current[stateLanguage];
    try {
      let result;
      if (stateLanguage === "javascript") {
        // Execute JavaScript code
        result = new Function(currentCode)();
      }
      else if (stateLanguage === "python") {
        // Execute Python code
        // result = await postPythonCode(currentCode).then((output) => result = output).catch((error)=> result=error);
        let res = await postPythonCode(currentCode);
        result = res?.output?.output;

      } else {
        // to execute other languages
        result = "Execution only supported for JavaScript, Python";
      }
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div id="main-container" >
      <div id="left-container">
      <div ref={editorRef} style={{ minHeight: "324px" ,height:"80vh"}}></div>
      </div>
      <div id="right-container">
      <div id="language-selector">

      <div style={{ marginTop: "20px" }}>
        <button style={{ color: stateLanguage=="javascript"?"red":"white"}} onClick={() => handleLanguageChange("javascript")}>JavaScript</button>
        <button style={{ color: stateLanguage=="python"?"red":"white"}} onClick={() => handleLanguageChange("python")}>Python</button>
        <button style={{ color: stateLanguage=="java"?"red":"white"}} onClick={() => handleLanguageChange("java")}>Java</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleRunCode}>Run Code</button>
      </div>
      </div>

      {output && (
        <>
        <h3>Output:</h3>
        <div id="output-view">
          <pre>{output}</pre>
        </div>
        </>
      )}
      </div>

    </div>
  );
};

export default CodeEditor;
