"use client";

import ArrowIcon from "./ArrowIcon";

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

export default TextArea;
