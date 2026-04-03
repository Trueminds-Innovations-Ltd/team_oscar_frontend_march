function Input({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
  ...rest
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`text-gray-900 text-[16px] font-medium leading-[140%] border-0 outline-none placeholder:text-gray-500 w-full ${className}`}
      {...rest}
    />
  );
}

export default Input;
