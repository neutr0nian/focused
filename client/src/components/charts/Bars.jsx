import React from "react";

const Bars = ({ labels, data, height, scaleX, scaleY }) => {
  return (
    <>
      {labels.map((label) => {
        return (
          <rect
            key={`bar-${label}`}
            x={scaleX(label)}
            y={scaleY(data[label])}
            width={scaleX.bandwidth()}
            height={height - scaleY(data[label])}
            fill="#FD941F"
            rx="4px"
            ry="4px"
          />
        );
      })}
    </>
  );
};

export default Bars;
