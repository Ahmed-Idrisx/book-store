import { cn } from "@/lib/utils";

interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  onChange: (value: string) => void;
  labelClassName?: string;
}

const AuthInput = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  className,
  onChange,
  labelClassName,
}: AuthInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "mb-2 block text-sm font-bold text-neutral-900",
          labelClassName,
        )}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-neutral-200 bg-white px-4 py-4 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-pink",
          className,
        )}
      />
    </div>
  );
};

export default AuthInput;
