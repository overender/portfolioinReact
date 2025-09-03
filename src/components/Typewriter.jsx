import { useEffect, useRef, useState } from "react";

export default function Typewriter({ text = "", speed = 45, loop = false, className = "" }) {
  const [display, setDisplay] = useState("");
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setDisplay("");       // reset display string
    idxRef.current = 0;   // reset index

    function tick() {
      if (idxRef.current < text.length) {
        setDisplay((prev) => prev + text.charAt(idxRef.current));
        idxRef.current += 1;
        timerRef.current = setTimeout(tick, speed);
      } else if (loop) {
        timerRef.current = setTimeout(() => {
          setDisplay("");
          idxRef.current = 0;
          tick();
        }, 1200);
      }
    }

    //  small delay so first letter isn’t swallowed
    timerRef.current = setTimeout(tick, speed);

    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [text, speed, loop]);

  return <span className={className} aria-label={text}>{display}</span>;
}
