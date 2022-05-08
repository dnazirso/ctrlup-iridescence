import { useRef } from "react";
import "./App.css";

function App() {
  let ctrlup = useRef<HTMLDivElement>(null);
  const root = document.documentElement;
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ctrlup.current) return;
    var rect = ctrlup.current.getBoundingClientRect();
    let x = e.clientX - (rect.left + rect.right) / 2;
    let y = e.clientY - (rect.top + rect.bottom) / 2;
    let angle = (Math.atan2(x, y) * 360) / Math.PI;
    root.style.setProperty("--angle", `${angle}deg`);
  };

  return (
    <div className="App" onMouseMove={onMouseMove}>
      <div className="ctrlup-container" ref={ctrlup}>
        <span className="ctrlup">CtrlUp</span>
      </div>
    </div>
  );
}

export default App;
