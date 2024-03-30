import React from "react";

function Search({onHandleSearchInput}) {
  return (
    <div className="w-full flex justify-center mt-5">
      <input
        type="text"
        onChange={(e) => onHandleSearchInput(e)}
        className="border pt-2 rounded py-2 px-2 font-mono w-full lg:w-1/2"
        placeholder="Search your location..."
      />
      <button className="bg-transparent border border-sky-950 py-2 w-11 px-2 ml-2 hover:bg-sky-950">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send hover:fill-white"
            viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </div>
      </button>
    </div>
  );
}
export default Search;
