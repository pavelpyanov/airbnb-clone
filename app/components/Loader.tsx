"use client";

import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <FallingLines width="100" color="red" />
    </div>
  );
};

export default Loader;
