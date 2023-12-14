import { FC, useEffect, useState } from "react";

interface SnackbarProps {
  open: boolean;
  message: string;
  title: string;
  variant: "success" | "error";
  handleClose: () => void;
}

const Snackbar: FC<SnackbarProps> = ({
  open,
  message,
  handleClose,
  title,
  variant,
}) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
        handleClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isVisible, handleClose]);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2  ${
            variant === "success" ? "bg-green-700" : "bg-red-700"
          } text-white py-2 px-4 rounded-md shadow-md z-50 transition-opacity duration-500`}
          style={{ opacity: 1 }}
        >
          <b>{title}</b> {message}
        </div>
      )}
      {!isVisible && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
          style={{ opacity: 0 }}
        ></div>
      )}
    </>
  );
};

export default Snackbar;
