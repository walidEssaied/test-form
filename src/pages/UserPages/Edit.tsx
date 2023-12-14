import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Mode } from "../../Models/Mode";
import { UserFormModel } from "../../Models/UserModel";
import { UserForm } from "./Form";

export const EditUser: FC = (): JSX.Element => {
  const data = useLocation();
  const defaultValues = data.state as UserFormModel;
  return <UserForm defaultValues={defaultValues} mode={Mode.edit} />;
};
