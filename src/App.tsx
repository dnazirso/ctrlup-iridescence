/* eslint-disable no-restricted-globals */
import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  let ctrlup = useRef<HTMLSpanElement>(null);
  let date = useRef<HTMLSpanElement>(null);
  const root = document.documentElement;

  useEffect(() => {
    window.addEventListener("deviceorientation", handleOrientation, true);

    function handleOrientation(event: DeviceOrientationEvent) {
      if (!event.beta) return;

      if (ctrlup.current) {
        let rect = ctrlup.current.getBoundingClientRect();
        root.style.setProperty(
          "--x",
          `${
            (rect.left + rect.right) * (event.beta / 180) -
            (rect.left + rect.right) / 2
          }px`
        );
      }
      if (date.current) {
        let rectd = date.current.getBoundingClientRect();
        root.style.setProperty(
          "--xDate",
          `${
            -(
              (rectd.left + rectd.right) * (event.beta / 180) +
              (rectd.left + rectd.right) / 2
            ) / 3
          }px`
        );
      }
    }
  }, [root.style]);

  const onMouseMove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (ctrlup.current) {
      let rect = ctrlup.current.getBoundingClientRect();
      root.style.setProperty(
        "--x",
        `${
          ((rect.left + rect.right) * (e.clientX / screen.width) -
            (rect.left + rect.right) / 2) /
          5
        }px`
      );
    }
    if (date.current) {
      let rectd = date.current.getBoundingClientRect();
      root.style.setProperty(
        "--xDate",
        `${
          -(
            (rectd.left + rectd.right) * (e.clientX / screen.width) +
            (rectd.left + rectd.right) / 2
          ) / 60
        }px`
      );
    }
  };

  return (
    <div className="App" onMouseMove={onMouseMove}>
      <div>
        <div>
          <span className="date" ref={date}>
            2021
          </span>
          <span className="ctrlup" ref={ctrlup}>
            CtrlUp
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
