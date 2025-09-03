import { useEffect, useRef, useState } from "react";

export default function Typewriter({ text = "", speed = 45, loop = false, className = "" }) {
  const [display, setDisplay] = useState("");
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Reset when text changes
    setDisplay("");
    idxRef.current = 0;

    function tick() {
      if (idxRef.current < text.length) {
        setDisplay((prev) => prev + text.charAt(idxRef.current));
        idxRef.current += 1;
        timerRef.current = setTimeout(tick, speed);
      } else if (loop) {
        // small pause then restart
        timerRef.current = setTimeout(() => {
          setDisplay("");
          idxRef.current = 0;
          tick();
        }, 1200);
      }
    }
    tick();
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [text, speed, loop]);

  return <span className={className} aria-label={text}>{display}</span>;
}
