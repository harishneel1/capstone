"use client";

interface TextAreaProps {
  onSubmit: (e: React.FormEvent, query: string) => Promise<void>;
  currentQuery: string;
  setCurrentQuery: React.Dispatch<React.SetStateAction<string>>;
  isDisabled?: boolean;
}

const TextArea = ({
  onSubmit,
  currentQuery,
  setCurrentQuery
}: TextAreaProps) => {

  let outputs = []

  return (
    <form
      onSubmit={(e) => onSubmit(e, currentQuery)}
      className={`flex gap-3 z-10 ${outputs.length > 0 ? "fixed bottom-0 left-0 right-0 container pb-5" : ""
        }`}
    >
      <div className="w-full flex items-center bg-gray-800 rounded border border-gray-600">
        <textarea
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          className="w-full p-3 bg-transparent min-h-20 focus:outline-none resize-none"
          placeholder="Ask a question..."
        />

        <button
          type="submit"
          className="disabled:bg-gray-500 bg-[#09BDE1] transition-colors w-9 h-9 rounded-full shrink-0 flex items-center justify-center mr-2"
        >
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
};

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-right"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default TextArea;
