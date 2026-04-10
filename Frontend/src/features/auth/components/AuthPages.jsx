function AuthPages({ children }) {
  return (
    <div className="flex justify-between gap-4 bg-bg-color-main min-h-screen w-full">
      {children}
    </div>
  );
}

export default AuthPages;
