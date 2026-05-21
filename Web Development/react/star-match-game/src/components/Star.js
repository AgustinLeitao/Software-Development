import React from "react";

const Star = props => {
  return (
    <>
      {utils.range(1, props.count).map((starId, index) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
};

export default Star;

const utils = {
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i)
};
