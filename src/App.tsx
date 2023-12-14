import { QueryClient, QueryClientProvider } from "react-query";
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import "./App.scss";
import { ListUser } from "./pages/UserPages";
import { CreateUser } from "./pages/UserPages/Create";
import { EditUser } from "./pages/UserPages/Edit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      ErrorBoundary,
      element: <ListUser />,
    },
    {
      path: "/create",
      element: <CreateUser />,
    },
    {
      path: "/edit/:id",
      element: <EditUser />,
    },
  ]);
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return <div>Ahaa i got u!</div>;
}
