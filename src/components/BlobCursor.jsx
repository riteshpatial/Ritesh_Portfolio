import { useEffect } from "react";
import "./BlobCursor.css";

const BlobCursor = () => {
  useEffect(() => {
    const blob = document.createElement("div");
    blob.classList.add("blob-cursor");
    document.body.appendChild(blob);

    const move = (e) => {
      blob.style.left = `${e.clientX}px`;
      blob.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      blob.remove();
    };
  }, []);

  return null;
};

export default BlobCursor;
