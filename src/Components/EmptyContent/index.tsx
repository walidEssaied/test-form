import { FC } from "react";
import { MessageContextProps } from "../../Models/Props";

export const EmptyContent: FC<MessageContextProps> = ({
  entity,
}): JSX.Element => {
  return <h2>No {entity} found, go create one</h2>;
};
