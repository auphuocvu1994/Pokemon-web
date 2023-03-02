import { useRoutes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Detail from "./page/Detail";
import Mybag from "./page/MyBag";

export default function App() {

  const routers = [
    {
      path: "/",
      element: <Home />,
      private: false,
    },
    {
      path: "/pokemon/detail/:id",
      element: <Detail />,
      private: false,
    },
    {
      path: "/pokemon/mybag",
      element: <Mybag />,
      private: false,
    },
  ];

  return (
    <Routes>
      {routers.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.element
          }
        />
      ))}
    </Routes>
  );
}