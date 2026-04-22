import { FaCheck } from "react-icons/fa6";

interface Option {
  label: string;
  value: string;
}

interface PlanSelectorProps<T extends string> {
  value: T;
  onChange: (val: T) => void;
  options: Option[];
}

const PlanSelector = <T extends string>({
  value,
  onChange,
  options,
}: PlanSelectorProps<T>) => {
  return (
    <div className="flex items-center gap-4">
      {options.map((opt) => (
        <div key={opt.value} className="flex items-center gap-2">
          <div
            onClick={() => onChange(opt.value as T)}
            className={`w-5 h-5 border-2 rounded-md flex items-center justify-center cursor-pointer transition
              ${value === opt.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-600 bg-white hover:border-blue-400"
              }`}
          >
            {value === opt.value && <FaCheck className="text-blue-500 w-3 h-3" />}
          </div>
          <span className="text-sm text-gray-800 font-medium">{opt.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanSelector;
