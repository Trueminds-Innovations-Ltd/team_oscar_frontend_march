function SummaryCard ({children}) {
  return (
    <section className="w-full rounded-xl border border-gray-300 bg-white p-4 flex items-center gap-4 min-w-0">
        {children}
    </section>
  )
}

export default SummaryCard;
