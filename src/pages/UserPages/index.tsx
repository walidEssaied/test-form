import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Dialog from "../../Components/Dialog/LoadingDialog";
import { EmptyContent } from "../../Components/EmptyContent";
import { ErrorComponent } from "../../Components/Errors/ErrorFetching";
import { Loading } from "../../Components/Loading/Loading";
import Snackbar from "../../Components/Snakbar";
import Table from "../../Components/Table/Table";
import TableCell from "../../Components/Table/TableCell";
import TableHeader from "../../Components/Table/TableHeader";
import TableRow from "../../Components/Table/TableRow";
import { UsersListItem } from "../../Models/UserModel";
import userService from "../../Services/UserServices";

export const ListUser: FC = (): JSX.Element => {
  const { data, isLoading, isError } = useQuery(
    "get-all-users",
    userService.getAllUsers,
    {
      refetchOnWindowFocus: false,
      enabled: true,
      cacheTime: 0,
    }
  );
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/create");
  };

  const handleRowClick = (item: UsersListItem) => {
    const _item = { ...item, sector: Number(item?.sector?.id) };
    navigate(`/edit/${item.id}`, {
      state: _item,
    });
  };

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(`delete-user`, userService.deleteUser, {
    onSuccess: () => queryClient.refetchQueries("get-all-users"),
  });

  const handleDelete = (user: UsersListItem) => {
    if (confirm(`Delete user ${user.name}`)) {
      deleteMutation.mutate(user.id);
    }
  };
  const renderUserList = (): JSX.Element => {
    if (isError) {
      return <ErrorComponent entity="user" />;
    }
    if (isLoading) {
      return <Loading entity="user" />;
    }
    if (!data || data.length === 0) {
      return <EmptyContent entity="user" />;
    }

    return (
      <div className="min-w-max">
        {deleteMutation.isLoading ? (
          <Dialog open={deleteMutation.isLoading} />
        ) : (
          ""
        )}

        <Table>
          <thead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Sector</TableHeader>
              <TableHeader>Agree to Terms</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {data.map((item: UsersListItem, index: number) => (
              <TableRow key={index}>
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(item);
                  }}
                >
                  {item?.name}
                </TableCell>
                <TableCell>{item?.sector?.name}</TableCell>
                <TableCell>
                  {item?.agree_to_terms ? "Agree" : "Not agree"}
                </TableCell>
                <TableCell>
                  <Button variant="error" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <Snackbar
          open={deleteMutation.isSuccess || deleteMutation.isError}
          title="Delete"
          message={
            deleteMutation.isSuccess ? "Delete success" : "Delete Failed"
          }
          handleClose={() => console.log("Close Snackbar")}
          variant={deleteMutation.isSuccess ? "success" : "error"}
        />
      </div>
    );
  };

  return (
    <div className="my-10 min-w-max">
      <div className="flex flex-row justify-between mb-5 w-full">
        <p className="text-3xl font-bold mr-5">Users list</p>
        <Button variant="success" onClick={() => handleCreateClick()}>
          Create
        </Button>
      </div>
      {renderUserList()}
    </div>
  );
};
