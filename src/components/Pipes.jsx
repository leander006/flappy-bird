import React from "react";
function Pipes({ pipePosition, src }) {
  return (
    <div>
      <img
        src={src}
        alt="pipe"
        className="pipe"
        style={{
          left: pipePosition.x,
          top: pipePosition.y,
        }}
        draggable={true}
      />
    </div>
  );
}

export default Pipes;
