import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import { Box } from "@mui/system";

function RagAgent() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [useRetriever, setUseRetriever] = useState(false);
  const [uploadedDocumentName, setUploadedDocumentName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUploadedDocumentName(selectedFile ? selectedFile.name : "");
  };

  const uploadDocument = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload-document", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedDocumentName(res.data.document_name);
      alert(`Document uploaded successfully as "${res.data.document_name}"`);
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Failed to upload document.");
    }
  };

  const queryAnswer = async () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }
    if (!uploadedDocumentName) {
      alert("Please upload a document first.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/query-answer", {
        query,
        document_name: uploadedDocumentName,
      });
      const { response } = res.data;
      setResponse(response || "No response available.");
    } catch (error) {
      console.error("Error querying document:", error);
      alert("Failed to query document.");
    }
  };

  const queryRetrieve = async () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/query-retrieve", { query });
      const { response, sources } = res.data;
      setResponse(
        response || (sources ? `Sources:\n${sources.map((src) => src.document).join(", ")}` : "No response available.")
      );
    } catch (error) {
      console.error("Error querying documents:", error);
      alert("Failed to query documents.");
    }
  };

  const submitQuery = () => {
    if (useRetriever) {
      queryRetrieve();
    } else {
      queryAnswer();
    }
  };

  return (
    <Box sx={{ padding: "20px", fontFamily: "Arial" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Document Query App
      </Typography>

      {!useRetriever && (
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom="20px">
          <Typography variant="h6" component="h2" gutterBottom>
            Upload Document
          </Typography>

          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="upload-file"
          />
          <label htmlFor="upload-file">
            <Button variant="contained" color="secondary" component="span">
              Choose File
            </Button>
          </label>

          {uploadedDocumentName && (
            <Typography variant="body2" color="textSecondary" style={{ marginTop: "10px", color: "white" }}>
              Selected File: {uploadedDocumentName}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={uploadDocument}
            style={{ marginTop: "10px" }}
          >
            Upload
          </Button>
        </Box>
      )}

      <Box marginTop="20px">
        <Typography variant="h6" component="h2" gutterBottom>
          Enter Query
        </Typography>
        <TextareaAutosize
          minRows={4}
          placeholder="Type your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "50%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <Box marginTop="10px">
          <FormControlLabel
            control={
              <Checkbox
                checked={useRetriever}
                onChange={() => setUseRetriever(!useRetriever)}
                sx={{ color: "white", '&.Mui-checked': { color: "white" } }} // White checkbox
              />
            }
            label="Use Retriever for Querying All Documents"
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={submitQuery}
          style={{ marginTop: "10px" }}
        >
          Submit Query
        </Button>
      </Box>

      {response && (
        <Box marginTop="20px">
          <Typography variant="h6" component="h3">
            Response:
          </Typography>
          <Typography variant="body1" component="p">
            {response}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default RagAgent;
