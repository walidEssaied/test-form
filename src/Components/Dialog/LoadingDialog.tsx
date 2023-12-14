import { FC } from "react";

interface DialogProps {
  open: boolean;
}

const Dialog: FC<DialogProps> = ({ open }) => {
  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-white opacity-20 z-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-8 z-50 rounded-lg shadow-lg w-3/4 sm:w-1/2 lg:w-1/3 flex flex-col items-center justify-center">
        <div className="flex space-x-2 items-center mb-4">
          <div className="w-4 h-4 bg-blue-900 rounded-full animate-bounce animation-delay-20"></div>
          <div className="w-4 h-4 bg-blue-800 rounded-full animate-bounce animation-delay-150"></div>
          <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce animation-delay-20"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading ...</h2>
          <p className="text-lg">Action in progress</p>
        </div>
      </div>
    </>
  );
};

export default Dialog;
