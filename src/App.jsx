import React, { useState, useEffect } from "react";
import "./App.css";

const DEFAULT_TEXT = "Asmit";
const DEFAULT_COLOR = "#000000";

const DifficultyTag = ({ difficulty, color }) => (
  <div
    className={`difficulty-tag ${difficulty.toLowerCase()}`}
    style={{ color }}
  >
    {difficulty}
  </div>
);

const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`custom-input ${className}`}
  />
);

const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={`custom-button ${className}`}>
    {children}
  </button>
);

const ColorPicker = ({ color, onChange }) => (
  <input
    type="color"
    value={color}
    onChange={onChange}
    className="color-picker"
  />
);

const App = () => {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [color, setColor] = useState(DEFAULT_COLOR);

  const changeDifficultyTag = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab) {
      console.error("No active tab found.");
      return;
    }

    chrome.tabs.sendMessage(tab.id, {
      action: "updateTags",
      text: text,
      color: color,
    });
  };

  const onClickChange = () => {
    changeDifficultyTag();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">LeetCode Difficulty Changer</h1>
      <Input
        type="text"
        placeholder="Enter custom tag"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="full-width"
      />
      <div className="color-picker-container">
        <label htmlFor="colorPicker">Tag Color:</label>
        <ColorPicker color={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <Button onClick={onClickChange} className="full-width">
        Change Tag
      </Button>
      <div className="difficulty-tags-container">
        <DifficultyTag difficulty="Easy" color={color} />
        <DifficultyTag difficulty="Medium" color={color} />
        <DifficultyTag difficulty="Hard" color={color} />
      </div>
    </div>
  );
};

export default App;
