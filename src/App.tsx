import { useEffect } from "react";
import "./App.css";
import CtrlUp from "./CtrlUp";

const root = document.documentElement;

function handleLight() {
  let mode = root.style.getPropertyValue("--mode");
  root.style.setProperty("--mode", mode === "black" ? "white" : "black");
  root.style.setProperty("--text", mode === "black" ? "black" : "white");
  root.style.setProperty("--bulb_on", mode === "black" ? "inline" : "none");
  root.style.setProperty("--bulb_off", mode === "black" ? "none" : "inline");
}

function App() {
  function handleKeyPress(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "ArrowUp") {
      handleLight();
      root.style.setProperty("--egg", "1");
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="App">
      <div onClick={handleLight}>
        💡 Light is <span className="bulb_on">on</span>
        <span className="bulb_off">off</span>
      </div>
      <br />
      <CtrlUp />
      <br />
      <code>Tilt me on mobile !</code>
      <div className="easter_egg">
        <br />
        <code>You've found the shortcut ! </code>
      </div>
    </div>
  );
}

export default App;
