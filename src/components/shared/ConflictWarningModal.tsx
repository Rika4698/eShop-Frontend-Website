/* eslint-disable @typescript-eslint/no-explicit-any */
const WarningModal = ({ isOpen, onConfirm, onCancel }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-[90%] md:w-[500px]">
        {/* Icon */}
        <div className="flex justify-center items-center">
        <svg
    className="w-16 text-red-500"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
        </div>

        {/* Text */}
       {/* Text */}
       <p className="mt-4 text-gray-700 text-center font-medium">
          You already have items in your cart from <span className="text-green-700 font-bold">another shop</span> . Adding these
          new items will replace your existing cart. Do you want to continue?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-[#03b500] hover:bg-[#00b50f] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
            onClick={onConfirm}
          >
            Yes, Replace Items
          </button>
          <button
            className="bg-gray-200 hover:bg-[#00b518] text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
