"use client";

interface QuantitySelectorProps {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  inStock: number;
}

const QuantitySelector = ({
  quantity,
  increment,
  decrement,
  inStock,
}: QuantitySelectorProps) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center gap-4">
        <button
          onClick={decrement}
          disabled={quantity <= 0}
          type="button"
          id="decrement-button"
          data-input-counter-decrement="bedrooms-input"
          className="bg-[#00b51b] hover:bg-[#057d23] border rounded-e-lg p-3 h-11  focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <div className=" h-11 font-medium text-center text-lg  block lg:w-20 pb-6 pt-2  border-gray-600 placeholder-gray-400 text-black ">
          {quantity}
        </div>
        
        <button
          type="button"
          onClick={increment}
          disabled={inStock <= 0}
          id="increment-button"
          data-input-counter-increment="bedrooms-input"
          className="bg-[#00b51b] hover:bg-[#057d23] border rounded-e-lg p-3 h-11  focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      
    </div>
  );
};

export default QuantitySelector;
