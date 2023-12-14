import { FC } from "react";
import { UserFormModel } from "../../Models/UserModel";
import { UserForm } from "./Form";
import { Mode } from "../../Models/Mode";

export const CreateUser: FC = (): JSX.Element => {
  return <UserForm defaultValues={{} as UserFormModel} mode={Mode.create} />;
};
