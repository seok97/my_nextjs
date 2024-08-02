import React, { useEffect, useState } from 'react'

const ToastMessage: React.FC<string> = (props) => {
  return (
    <div className="toast_container">
      <div className="toast_text">{props}</div>
    </div>
  );
};

export default ToastMessage;