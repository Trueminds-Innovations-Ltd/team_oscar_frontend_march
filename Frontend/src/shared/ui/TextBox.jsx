import { memo } from "react";

const TextBox = memo(({ children, className = "", textColor = "" }) => {
  return <p className={`${textColor} ${className}`}>{children}</p>;
});

export default TextBox;
