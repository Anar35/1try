import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./routes";
import { AuthorsContextProvider } from "./context/AuthorsContext";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <AuthorsContextProvider>
      <RouterProvider router={routes} />
    </AuthorsContextProvider>
  );
}

export default App;
