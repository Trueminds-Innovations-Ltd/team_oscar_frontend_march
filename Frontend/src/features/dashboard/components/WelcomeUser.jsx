function WelcomeUser() {
  return (
    <section className="min-w-0">
      <h1 className="bean text-2xl font-extrabold sm:text-3xl lg:text-[35px] break-words">
        Good Morning, Oscar <span>👋</span>
      </h1>
      <p className="mt-2 text-sm font-medium text-gray-500 sm:text-base">
        3 tasks due this week
      </p>
    </section>
  );
}

export default WelcomeUser;
