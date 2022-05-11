import { useEffect, useRef } from "react";
import "./App.css";

const root = document.documentElement;

function setCssVar(
  cssVar: string,
  rect: DOMRect,
  ratio: number,
  direction: "same" | "opposit"
) {
  let dir = direction === "same" ? 1 : -1;
  let distance = dir * (rect.left + rect.width / 2) * ratio;
  root.style.setProperty(cssVar, `${distance}px`);
}

function handleLight() {
  let mode = root.style.getPropertyValue("--mode");
  root.style.setProperty("--mode", mode === "black" ? "white" : "black");
  root.style.setProperty("--text", mode === "black" ? "black" : "white");
  root.style.setProperty("--bulb_on", mode === "black" ? "inline" : "none");
  root.style.setProperty("--bulb_off", mode === "black" ? "none" : "inline");
}

function App() {
  let ctrlup = useRef<HTMLSpanElement>(null);
  let date = useRef<HTMLSpanElement>(null);

  function handleKeyPress(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "ArrowUp") {
      handleLight();
      root.style.setProperty("--egg", "1");
    }
  }

  function handleOrientation(event: DeviceOrientationEvent) {
    if (!ctrlup.current || !date.current || !event.beta) return;
    setCssVar(
      "--x",
      ctrlup.current.getBoundingClientRect(),
      event.beta / 180,
      "same"
    );
    setCssVar(
      "--xDate",
      date.current.getBoundingClientRect(),
      event.beta / 180,
      "opposit"
    );
  }

  function handleMouseMove(event: MouseEvent) {
    if (!ctrlup.current || !date.current || !event.view) return;
    setCssVar(
      "--x",
      ctrlup.current.getBoundingClientRect(),
      event.clientX / event.view.innerWidth,
      "same"
    );
    setCssVar(
      "--xDate",
      date.current.getBoundingClientRect(),
      event.clientX / event.view.innerWidth,
      "opposit"
    );
  }

  useEffect(() => {
    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="App">
      <div onClick={handleLight}>
        💡 Light is <span className="bulb_on">on</span>
        <span className="bulb_off">off</span>
      </div>
      <br />
      <div className="ctrlup">
        <div>
          <span ref={date}>2021</span>
          <span ref={ctrlup}>CtrlUp</span>
        </div>
      </div>
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
