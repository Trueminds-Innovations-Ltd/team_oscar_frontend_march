import { FiDownload } from "react-icons/fi";

const files = [
  {
    id: 1,
    type: "PDF",
    name: "ux fundamentals 1",
    meta: "4.5 MB",
    status: "uploading",
  },
  {
    id: 2,
    type: "PDF",
    name: "ux fundamentals 2",
    meta: "4.5 MB",
    status: "uploading",
  },
  {
    id: 3,
    type: "DOC",
    name: "Summary-of-php.docx",
    meta: "Microsoft Word",
    status: "ready",
    size: "350 KB",
  },
  {
    id: 4,
    type: "PDF",
    name: "Design thinking",
    meta: "Microsoft Excel",
    status: "ready",
    size: "25.7 MB",
  },
  {
    id: 5,
    type: "DOC",
    name: "Summary-of-php.docx",
    meta: "Microsoft Word",
    status: "ready",
    size: "350 KB",
  },
  {
    id: 6,
    type: "PDF",
    name: "Design thinking",
    meta: "Microsoft Excel",
    status: "ready",
    size: "25.7 MB",
  },
];

function FileBadge({ type }) {
  const isPdf = type === "PDF";

  return (
    <div
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[10px] font-bold text-white ${
        isPdf ? "bg-[#f34d3f]" : "bg-[#2f8ce6]"
      }`}
    >
      {type}
    </div>
  );
}

function MaterialsDownloadsPanel() {
  return (
    <section className="mt-5">
      <h2 className="text-[30px] font-bold text-[#1b2236] sm:text-[34px]">
        1. UX Fundamentals & Design Thinking
      </h2>
      <p className="mt-1 text-[11px] font-medium text-[#98a1b3]">
        Start : 28/03/2026 &nbsp;&nbsp; 12:00pm
      </p>

      <article className="mt-4 max-w-155 rounded-[14px] border border-[#d5dae5] bg-white p-4 sm:p-5">
        <h3 className="mb-4 text-[14px] font-bold text-[#2a3248]">
          Your Downloads
        </h3>

        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-start gap-3">
              <FileBadge type={file.type} />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[13px] font-semibold text-[#29314a]">
                    {file.name}
                  </p>

                  <div className="flex items-center gap-3 text-[11px]">
                    {file.status === "uploading" ? (
                      <>
                        <span className="whitespace-nowrap text-[#5a637c]">
                          {file.meta}
                        </span>
                        <button
                          type="button"
                          className="text-[#9ca4b8] hover:text-[#6d7487]"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="whitespace-nowrap text-[#5a637c]">
                          {file.size}
                        </span>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 font-semibold text-[#5576d9] hover:text-[#3e61cb]"
                        >
                          <FiDownload className="text-[12px]" /> Download
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {file.status === "uploading" ? (
                  <div className="mt-2 h-1 rounded-full bg-[#d9deeb]">
                    <div className="h-full w-[68%] rounded-full bg-[#2f8ce6]" />
                  </div>
                ) : (
                  <p className="mt-0.5 text-[10px] text-[#a1a8ba]">
                    {file.meta}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default MaterialsDownloadsPanel;
