const SidebarDeleteForm = ({ handleCancelClick, handleDeleteClick, label }) => (
  <div className="flex flex-col">
    <p>
      Are you sure you want to delete "<b>{label}</b>"?
    </p>
    <div className="flex justify-around mt-4">
      <button
        className=" bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-md"
        onClick={handleCancelClick}
      >
        Cancel
      </button>
      <button
        className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-white"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  </div>
);
export default SidebarDeleteForm;
