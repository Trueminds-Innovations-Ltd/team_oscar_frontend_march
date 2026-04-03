import { memo } from "react";

const Image = memo(({ src, alt = "", className = "" }) => {
  if (!src) {
    throw new Error("Image source (src) is required!");
  }

  return <img src={src} alt={alt} className={`object-cover ${className}`} />;
});

export default Image;
