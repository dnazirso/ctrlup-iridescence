import { useEffect, useRef } from "react";
import "./CtrlUp.css";

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

export default function CtrlUp() {
  let ctrlup = useRef<HTMLSpanElement>(null);
  let date = useRef<HTMLSpanElement>(null);

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
  }, []);

  return (
    <div className="ctrlup">
      <div>
        <span ref={date}>2021</span>
        <span ref={ctrlup}>CtrlUp</span>
      </div>
    </div>
  );
}
