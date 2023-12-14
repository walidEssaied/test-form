import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Components/Errors/ErrorMessage";
import { SectorSelect } from "../../Components/SectorSelct";
import Snackbar from "../../Components/Snakbar";
import { Mode } from "../../Models/Mode";
import { UserFormModel } from "../../Models/UserModel";
import { sectorServices } from "../../Services/SecotServices";
import userService from "../../Services/UserServices";
import userFormSchema from "./hooks/userSchema";

interface Props {
  defaultValues: UserFormModel & { id?: number };
  mode: Mode;
}

export const UserForm: React.FC<Props> = ({
  defaultValues,
  mode,
}): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<UserFormModel>({
    defaultValues:
      mode === Mode.create
        ? {
            agree_to_terms: false,
            name: "",
            sector: null,
          }
        : defaultValues,
    resolver: yupResolver(userFormSchema),
  });
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const onMutationSuccess = () => {
    queryClient.refetchQueries("get-all-users");
    navigate(-1);
  };

  const updateMutation = useMutation({
    mutationFn: userService.updateUser,
    mutationKey: `update-user-${defaultValues?.id}`,
    onSuccess() {
      onMutationSuccess();
    },
  });

  const createMutation = useMutation({
    mutationFn: userService.createUser,
    mutationKey: `create-user`,
    onSuccess() {
      onMutationSuccess();
    },
  });

  const seedMutation = useMutation({
    mutationFn: sectorServices.seedSectors,
    mutationKey: "seed sectors",
    onSuccess: () => {
      queryClient.refetchQueries("sectors");
    },
    // onError: () => {},
  });

  const onSubmit = (data: any) => {
    if (mode === Mode.create) {
      createMutation.mutate(data);
    }
    if (mode === Mode.edit) {
      updateMutation.mutate(data);
    }
  };

  console.log({ fv: watch() });

  return (
    <div className="p-2">
      <Snackbar
        open={seedMutation.isSuccess || seedMutation.isError}
        title="Seeding"
        message={seedMutation.isSuccess ? "Seeding sectores success" : "Seeding sectores Failed"}
        handleClose={() => console.log("Close Snackbar")}
        variant={seedMutation.isSuccess ? "success" : "error"}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div className="">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-white"
          >
            Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  id="name"
                  className="block w-full p-2 mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <ErrorMessage message={errors.name?.message ?? null} />
              </div>
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="sector"
            control={control}
            render={({ field }) => (
              <div>
                <SectorSelect field={field} />
                <ErrorMessage message={errors.sector?.message ?? null} />
              </div>
            )}
          />
        </div>
        <div className="flex items-center mt-5">
          <Controller
            name="agree_to_terms"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={!!field.value}
                {...field}
                value={field.value ? "true" : "false"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            )}
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Agree to Terms
          </label>
        </div>

        <button
          type="submit"
          className=" inline-flex items-center justify-center px-4 py-2 mt-5 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={createMutation.isLoading || updateMutation.isLoading}
        >
          {createMutation.isLoading || updateMutation.isLoading ? (
            <div className="animate-spin rounded-full mr-3 h-5 w-5 border-t-2 border-b-2 border-blue-500" />
          ) : (
            "Submit"
          )}
        </button>
      </form>

      <div className="flex flex-col justify-center mt-10">
        <p className="font-semibold mb-1">
          In case no sector are showing u can seed sector from click to seed
          button
        </p>
        <button className="bg-gray-900" onClick={() => seedMutation.mutate()}>
          {seedMutation.isLoading ? (
            <div className="animate-spin rounded-full mr-3 h-5 w-5 border-t-2 border-b-2 border-blue-500" />
          ) : (
            "Seed Sectors"
          )}
        </button>
      </div>
    </div>
  );
};
