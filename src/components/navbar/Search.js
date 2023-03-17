import { RiSearchLine } from "react-icons/ri";

const Search = () => {
  return (
    <div className="flex gap-3 px-4 items-center h-10 bg-gray-200 rounded-full mx-auto m-2 focus-within:outline outline-blue-400 -outline-offset-2 w-96">
      <div>
        <RiSearchLine />
      </div>
      <input
        className="w-full h-10 placeholder-gray-500 bg-transparent focus:outline-none"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
