import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";

const CodeEditor = () => {
  const editorRef = useRef(null); // Reference to attach Monaco Editor
  const editorInstance = useRef(null);
  
  // Store code for each language
  const [code, setCode] = useState({
    javascript: "// Write your JavaScript code here...",
    python: "# Write your Python code here...",
    java: "// Write your Java code here...",
  });

  const [output, setOutput] = useState(""); // To store execution result
  const [language, setLanguage] = useState("javascript"); // Language state

  // Initialize Monaco Editor
  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: code[language], // Set initial code based on language
        language: language, // Set initial language
        theme: "vs-dark", // Set default theme
        automaticLayout: true, // Auto adjust layout
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.dispose(); // Clean up the editor instance
      }
    };
  }, [language, code]); // Reinitialize when language or code changes

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage); // Update the language state
  };

  // Handle code change and store it for each language
  const handleEditorChange = () => {
    const currentCode = editorInstance.current.getValue();
    setCode((prevCode) => ({
      ...prevCode,
      [language]: currentCode, // Save current code for the active language
    }));
  };

  // Execute the code in the editor (basic eval for JavaScript, custom logic for others)
  const handleRunCode = () => {
    const currentCode = code[language];
    try {
      let result;
      if (language === "javascript") {
        // Execute JavaScript code
        result = new Function(currentCode)();
      } else {
        // In real scenarios, you would need to send the code to the backend to execute other languages
        result = "Execution only supported for JavaScript in this demo.";
      }
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <div ref={editorRef} style={{ height: "500px" }}></div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleLanguageChange("javascript")}>JavaScript</button>
        <button onClick={() => handleLanguageChange("python")}>Python</button>
        <button onClick={() => handleLanguageChange("java")}>Java</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleRunCode}>Run Code</button>
      </div>

      {output && (
        <div style={{ marginTop: "20px" }}>
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
