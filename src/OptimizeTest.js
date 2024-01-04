import React, { useState, useEffect } from "react";

const CountA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`counteA update : ${count}`);
  });
  return <div>{count}</div>;
});

const CountB = ({ obj }) => {
  useEffect(() => {
    console.log(`countB update :${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  } else {
    return false;
  }
};

const MemoizedCountB = React.memo(CountB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div className="OptimizeTest" style={{ padding: 50 }}>
      <div>
        <h2>Count A</h2>
        <CountA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Count B</h2>
        <MemoizedCountB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
