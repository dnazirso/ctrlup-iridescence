import { useEffect, useRef, useState } from "react";
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

function App() {
  let ctrlup = useRef<HTMLSpanElement>(null);
  let date = useRef<HTMLSpanElement>(null);

  const [mode, setMode] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("deviceorientation", handleOrientation, true);
    window.addEventListener("mousemove", handleMouseMove, true);
  }, []);

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

  function handleLight() {
    setMode(!mode);
    document.body.style.backgroundColor = mode ? "black" : "white";
    document.body.style.color = mode ? "white" : "black";
  }

  return (
    <div className="App">
      <div>💡 Light is {mode ? "on" : "off"}</div>
      <br />
      <div className="ctrlup" onClick={handleLight}>
        <div>
          <span ref={date}>2021</span>
          <span ref={ctrlup}>CtrlUp</span>
        </div>
      </div>
      <br />
      <code>Tilt me on mobile !</code>
    </div>
  );
}

export default App;
