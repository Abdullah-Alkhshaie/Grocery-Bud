import React from "react";

function Alert({ type, msg }) {
  return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default Alert;
