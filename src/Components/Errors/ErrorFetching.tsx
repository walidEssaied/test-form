import { FC } from "react";
import { MessageContextProps } from "../../Models/Props";
import { ErrorIcon } from "./ErrorIcon";

export const ErrorComponent: FC<MessageContextProps> = ({
  entity,
}): JSX.Element => {
  return (
    <div className="error-message">
      <ErrorIcon className="error-icon" />
      <p>Error while fetching {entity}(s)</p>
    </div>
  );
};
