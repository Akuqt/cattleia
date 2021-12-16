import React, { useState, useEffect } from "react";

interface Props {
  initial?: 0;
}

export const Counter: React.FC<Props> = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(props.initial || 0);
  }, [props.initial]);

  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount(props.initial || 0)}>reset</button>
        <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
      </div>
    </div>
  );
};
