function Button({
  children,
  type = "button",
  onClick,
  className = "",
  bgColor = "",
  textColor = "",
  border = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${bgColor} ${textColor} ${border} cursor-pointer`}
    >
      {children}
    </button>
  );
}

export default Button;
