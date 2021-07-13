import React, { useEffect, useState } from "react";
import "./App.css";
import { interval, Subject } from "rxjs";
import { takeUntil, exhaustMap } from "rxjs/operators";

function App() {
    const [sec, setSec] = useState(0);
    const [status, setStatus] = useState("");
    const action$ = new Subject();
    const doubleClick = action$.pipe(
        exhaustMap(() => action$.pipe(takeUntil(interval(300))))
    );
    doubleClick.subscribe(() => setStatus("wait"));

    useEffect(() => {
        const observable$ = interval(1000);
        const sub = observable$.subscribe(() => {
            if (status === "start") {
                setSec((prevSec) => prevSec + 1000);
            }
        });
        return () => {
            sub.unsubscribe();
        };
    }, [status]);

    const stop = () => {
        setSec(0);
        setStatus("stop");
    };
    return (
        <div className="block-timer">
            <span className="view">
                {new Date(sec).toISOString().slice(11, 19)}
            </span>
            <button className="btn" onClick={() => setStatus("start")}>
                Start
            </button>
            <button className="btn" onClick={stop}>
                Stop
            </button>
            <button className="btn" onClick={() => setSec(0)}>
                Reset
            </button>
            <button className="btn" onClick={() => action$.next()}>
                Wait2
            </button>
        </div>
    );
}
export default App;
