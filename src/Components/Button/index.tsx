import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: "success" | "error";
}

const Button: FC<ButtonProps> = ({ children, variant, ...props }) => {
  const getButtonClasses = (): string => {
    switch (variant) {
      case "success":
        return "bg-blue-500 hover:bg-blue-700 text-white";
      case "error":
        return "bg-red-500 hover:bg-red-700 text-gray-900";
      default:
        return "";
    }
  };

  const buttonClasses = `font-bold py-2 px-4 rounded ${getButtonClasses()}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
