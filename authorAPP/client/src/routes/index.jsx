import AddAuthor from "../pages/AddAuthor";
import AuthorDetail from "../pages/AuthorDetail";
import Authors from "../pages/Authors";
import EditAuthor from "../pages/EditAuthor";
import Home from "../pages/Home";
import MainRoot from "../pages/MainRoot";
import NotFound from "../pages/NotFound";

export const ROUTES = [
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "authors/:id",
        element: <AuthorDetail />,
      },
      {
        path: "add-author",
        element: <AddAuthor />,
      },
      {
        path: "edit-authors/:id",
        element: <EditAuthor />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
