import { FC } from "react";
import { MessageContextProps } from "../../Models/Props";

export const Loading: FC<MessageContextProps> = ({ entity }): JSX.Element => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center space-x-2">
        <svg
          className="animate-spin h-5 w-5 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4a8 8 0 00-8 8h4zm10-1.373A8 8 0 0012 20v-4a8 8 0 008-8h-4zm-2-5.373A8 8 0 018 12h-4a8 8 0 018-8v4z"
          ></path>
        </svg>
        <h3 className="text-gray-700">Loading {entity}...</h3>
      </div>
    </div>
  );
};
