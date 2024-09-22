import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://localhost:5000/bfhl",
        parsedInput
      );
      setResponseData(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or request error");
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter((f) => f !== value));
    }
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter JSON"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <div>
          <h3>Response</h3>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleFilterChange}
            />
            Highest Lowercase Alphabet
          </label>

          <div>
            {filters.includes("alphabets") && (
              <p>Alphabets: {responseData.alphabets.join(", ")}</p>
            )}
            {filters.includes("numbers") && (
              <p>Numbers: {responseData.numbers.join(", ")}</p>
            )}
            {filters.includes("highest_lowercase_alphabet") && (
              <p>
                Highest Lowercase Alphabet:{" "}
                {responseData.highest_lowercase_alphabet.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
