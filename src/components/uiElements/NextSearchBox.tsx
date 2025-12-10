"use client";

import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";

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
  const debouncedValue = useDebounce<string>(inputValue, debounceTimeOut);

  // Fire when debounced value changes
  useEffect(() => {
    onValueChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onValueChange(inputValue)}
      />
      <Button onClick={() => onValueChange(inputValue)}>
        <Search size={20} />
      </Button>
    </div>
  );
};

export default NextSearchBox;
