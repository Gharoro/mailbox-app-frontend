import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Home = lazy(() => import("../pages/Home"));
const Inbox = lazy(() => import("../pages/Inbox"));
const Message = lazy(() => import("../pages/Message"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inbox",
    element: <Inbox />,
  },
  {
    path: "/message/:id",
    element: <Message />,
  },
]);

export default router;
