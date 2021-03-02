import React from "react";
import "./Timer.css";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";


export default function Timer() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState ("stop");

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSec((val) => val + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  const start = React.useCallback(() => {
    setStatus("run");
  }, []);

  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);

  const reset = React.useCallback(() => {
    setSec(0);
  }, []);

  const wait = React.useCallback(() => {
    setStatus("wait");
  }, []);

  return (
    <div className="block-timer">
      <span className="view"> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button className="btn" onClick={start}>
        Start
      </button>
      <button className="btn" onClick={stop}>
        Stop
      </button>
      <button className="btn" onClick={reset}>
        Reset
      </button>
      <button className="btn" onClick={wait}>
        Wait
      </button>
    </div>
  );
}
