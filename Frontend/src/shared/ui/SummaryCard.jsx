function SummaryCard ({children}) {
  return (
    <section className="bg-white border border-gray-300 p-4 w-[250px] rounded-xl flex items-center gap-4">
        {children}
    </section>
  )
}

export default SummaryCard;