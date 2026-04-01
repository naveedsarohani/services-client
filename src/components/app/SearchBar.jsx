import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex justify-end mb-6">
      <div className="relative w-full max-w-sm">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search Control, id's, owner..."
          className="w-full pr-10 pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Icon inside input */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;