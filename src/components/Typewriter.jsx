import { useEffect, useRef, useState } from "react";

/**
 * StrictMode-safe typewriter:
 * - Uses a "runId" to cancel stale timers when React re-invokes effects in dev.
 * - Always renders display via slice(0, n) so we never miss a character.
 */
export default function Typewriter({ text = "", speed = 60, loop = false, className = "" }) {
  const [display, setDisplay] = useState("");
  const idxRef = useRef(0);
  const timerRef = useRef(null);
  const runIdRef = useRef(0);

  useEffect(() => {
    // bump run id to invalidate any previous timers
    runIdRef.current += 1;
    const myRun = runIdRef.current;

    // cleanup any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // reset
    idxRef.current = 0;
    setDisplay("");

    function tick() {
      // if a new run started, abort this one (StrictMode/dev safe)
      if (runIdRef.current !== myRun) return;

      // render up to current index (never skips)
      setDisplay(text.slice(0, idxRef.current + 1));
      idxRef.current += 1;

      if (idxRef.current < text.length) {
        timerRef.current = setTimeout(tick, speed);
      } else if (loop) {
        timerRef.current = setTimeout(() => {
          if (runIdRef.current !== myRun) return;
          idxRef.current = 0;
          setDisplay("");
          tick();
        }, 1200);
      }
    }

    // start after one interval tick; avoids initial render race
    timerRef.current = setTimeout(tick, speed);

    return () => {
      // invalidate this run & clear timers
      runIdRef.current += 1;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [text, speed, loop]);

  return <span className={className} aria-label={text}>{display}</span>;
}
