"use client";

import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IProps {
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  debounceTimeOut?: number;
}

const NextSearchBox: React.FC<IProps> = ({
  onValueChange,
  className,
  placeholder,
  debounceTimeOut = 500,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce<string>(inputValue, debounceTimeOut);

  // Auto-search: Call onValueChange when debounced value changes
  useEffect(() => {
    onValueChange(debouncedValue);
  }, [debouncedValue, onValueChange]);

  // Manual search on button click
  const handleSearch = () => {
    onValueChange(inputValue);
  };

  // Clear input with X button
  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder || "Search..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pr-10"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <Button onClick={handleSearch} type="button" className="bg-green-600 hover:bg-green-700">
        <Search size={20} />
      </Button>
    </div>
  );
};

export default NextSearchBox;