import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseWatchProtectedRoute from "./components/PurchaseWatchProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./layout/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./pages/admin/Sidebar";
import AddWatch from "./pages/admin/watch/AddWatch";
import EditWatch from "./pages/admin/watch/EditWatch";
import WatchTable from "./pages/admin/watch/WatchTable";
import CreateWatch_Details from "./pages/admin/watch_details/CreateWatch_Details";
import EditWatch_Details from "./pages/admin/watch_details/EditWatch_Details";

import AboutUs from "./pages/buyer/About_us";
import MyLearning from "./pages/buyer/MyLearning";
import Profile from "./pages/buyer/Profile";
import SearchPage from "./pages/buyer/SearchPage";
import Services from "./pages/buyer/Services";
import WatchDetail from "./pages/buyer/WatchDetail";
import WatchProgress from "./pages/buyer/WatchProgress";
import Watchs from "./pages/buyer/Watchs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>

            <Watchs />

          </>
        ),
      },
      {
        path: "watchs",
        element: (

          <Watchs />

        ),
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "watch/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "watch-detail/:watchId",
        element: (
          <ProtectedRoute>
            <WatchDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "watch-progress/:watchId",
        element: (
          <ProtectedRoute>
            <PurchaseWatchProtectedRoute>
              <WatchProgress />
            </PurchaseWatchProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // admin routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "watch",
            element: <WatchTable />,
          },
          {
            path: "watch/create",
            element: <AddWatch />,
          },
          {
            path: "watch/:watchId",
            element: <EditWatch />,
          },
          {
            path: "watch/:watchId/watch_details",
            element: <CreateWatch_Details />,
          },
          {
            path: "watch/:watchId/watch_details/:watch_detailsId",
            element: <EditWatch_Details />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
