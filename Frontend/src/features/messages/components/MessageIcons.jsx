import React from "react";

export const MessageFolderIcon = ({ type, className = "h-4 w-4" }) => {
  const baseProps = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "mail") {
    return (
      <svg {...baseProps}>
        <path d="M4 7.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" />
        <path d="m5 8 7 5 7-5" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg {...baseProps}>
        <path d="M12 3v4" />
        <path d="M12 17v4" />
        <path d="M4.9 4.9 7.7 7.7" />
        <path d="m16.3 16.3 2.8 2.8" />
        <path d="M3 12h4" />
        <path d="M17 12h4" />
        <path d="m4.9 19.1 2.8-2.8" />
        <path d="m16.3 7.7 2.8-2.8" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    );
  }

  if (type === "cap") {
    return (
      <svg {...baseProps}>
        <path d="m3 9 9-4 9 4-9 4-9-4Z" />
        <path d="M7 11.5v4.2c0 .4.2.8.6 1 1.1.8 2.7 1.3 4.4 1.3s3.3-.5 4.4-1.3c.4-.2.6-.6.6-1v-4.2" />
        <path d="M21 10v5" />
      </svg>
    );
  }

  return (
    <svg {...baseProps}>
      <path d="M5 6.5h14A1.5 1.5 0 0 1 20.5 8v7A1.5 1.5 0 0 1 19 16.5H10l-4 3v-3H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5Z" />
      <path d="M8 10h8" />
      <path d="M8 13h5" />
    </svg>
  );
};

export const NotificationBell = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const SearchIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.4-3.4" />
  </svg>
);

export const PaperclipIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.44 11.05-8.49 8.49a5.5 5.5 0 0 1-7.78-7.78l9.2-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.19 9.2a1.5 1.5 0 1 1-2.13-2.12l8.49-8.5" />
  </svg>
);

export const SmileyIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" />
    <path d="M9 10h.01" />
    <path d="M15 10h.01" />
  </svg>
);

export const SendIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4Z" />
  </svg>
);

export const CheckIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 13 4 4L19 7" />
  </svg>
);
