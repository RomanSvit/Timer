import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";

function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const observable$ = new Observable((subscriber) => {
      const intER = setInterval(() => {
        if (status === "run") {
          subscriber.next(setSec((val) => val + 1000));
          console.log(status);
        }
        if (status === "stop") {
          subscriber.complete();
          subscription.unsubscribe();
        }
      }, 1000);
      console.log(status);
      return function unsubscribe() {
        clearInterval(intER);
      };
    });
    const subscription = observable$.subscribe({ next: console.log() });
  }, [status]);

  const start = () => {
    setStatus("run");
  };
  const stop = () => {
    setSec(0);
    setStatus("stop");
  };
  const reset = () => {
    setSec(0);
  };
  const wait = () => {
    setStatus("wait");
  };
  return (
    <div>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button className="start-button" onClick={start}>
        Start
      </button>
      <button className="stop-button" onClick={stop}>
        Stop
      </button>
      <button onClick={reset}>Reset</button>
      <button onClick={wait}>Wait</button>
    </div>
  );
}
export default App;
