import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p className="text-red">
      {typeof message === "string" ? <p>{message}</p> : <p>{message}</p>}
    </p>
  );
};

export default ErrorMessage;
