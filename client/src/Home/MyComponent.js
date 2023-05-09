import React, { useState } from 'react';


export default function MyComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  }
  
  const maxCount = 2; // maximum number of iterations
  const numbers = Array.from({ length: maxCount }, (_, index) => index); // create an array of numbers from 0 to maxCount
  
  return (
    <div>
      {numbers.slice(0, count).map(index => (
        <div key={index}>This is div number {index + 1}</div>
      ))}
      {count < maxCount && (
        <button onClick={handleClick}>Show Next Div</button>
      )}
    </div>
  );
}
