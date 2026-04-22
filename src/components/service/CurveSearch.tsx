import { useState, useRef, useEffect, type FC } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface CurveSearchProps {
  className?: string;
  border?: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

const CurveSearch: FC<CurveSearchProps> = ({
  className,
  border = "border-[#2563EB]",
  value = "",
  onChange,
  placeholder = "What Service Do you Need?",
  suggestions = [],
  onSuggestionSelect,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSelectionRef = useRef(false);

  // Filter suggestions based on input value
  useEffect(() => {
    if (value && value.trim().length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);

      // If this change was a manual selection, don't show suggestions
      if (isSelectionRef.current) {
        setShowSuggestions(false);
        isSelectionRef.current = false;
      } else {
        setShowSuggestions(filtered.length > 0);
      }
    } else {
      setFilteredSuggestions((prev) => (prev.length === 0 ? prev : []));
      setShowSuggestions(false);
    }
  }, [value, suggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    isSelectionRef.current = true;
    onChange?.(suggestion);
    onSuggestionSelect?.(suggestion);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (value && value.trim().length > 0 && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };


  return (
    <div ref={containerRef} className={` ${className} w-full relative`}>
      <div className="font-Geist">
        <div
          className={`${border} flex items-center w-full h-13 gap-3 px-1 border rounded-md bg-white`}
        >
          <button className="w-12 h-12 relative flex items-center justify-center transition-colors duration-200">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 60 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.37263 6.80328e-05 1.90735e-05 5.37262 0 12V36C0 42.6274 5.37262 47.9999 12 48H36C42.6274 48 48 42.6274 48 36V32.3145L58.7998 26.0781C60.3998 25.1544 60.3998 22.8456 58.7998 21.9219L48 15.6865V12C48 5.37257 42.6274 0 36 0H12Z"
                fill="#1D4ED8"
              />
            </svg>

            <IoSearchOutline size={24} className="relative text-white z-10" />
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="flex-grow outline-none bg-transparent text-gray-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <IoSearchOutline className="text-gray-400 flex-shrink-0" size={18} />
              <span className="text-sm">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurveSearch;
