type ToggleSwitchProps = {
  checked: boolean;
  onToggle: () => void;
};

const ToggleSwitch = ({ checked, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`relative inline-flex h-5 sm:h-6 w-10 sm:w-11 items-center rounded-full transition-colors cursor-pointer ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 sm:h-4 w-4 sm:w-4 transform rounded-full bg-white transition-transform cursor-pointer ${
          checked ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
