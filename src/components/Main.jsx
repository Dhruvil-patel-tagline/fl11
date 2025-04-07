import React from 'react'
import './css/main.css'

const Main = ({ currentPath }) => {
  return (
    <div>
      <span style={{ color: "gray" }}>
        {currentPath.slice(1).split("/").join(" > ")}
      </span>
    </div>
  );
}

export default Main
