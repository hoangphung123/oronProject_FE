import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Pagefriend from "./pages/listFriendPage/friend.jsx";
import Forgotpassword from "./pages/forgotpassword/forgotpassword.jsx";
import Ranking from "./pages/ranking/Ranking.jsx";
import Reportadmin from "./pages/reportadmin/Reportadmin.jsx";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/navbar/NavBar.jsx";
import LeftBar from "./components/leftbar/LeftBar.jsx";
import RightBar from "./components/rightbar/RightBar.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ProfileFriends from "./pages/profileFriends/profileFriends.jsx";
import Carousel from './components/carousel/Carousel.jsx';
import "./style.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import { AuthContext } from "./context/authContext.js";
import * as UserServices from "./server/userstore.js";



function App() {
  //common layout

  //not login
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const fecheslogin = async () => {
    const accessToken = JSON.parse(localStorage.getItem("access_token"));
    const profileUser = await UserServices.getProfile(accessToken);
    setCurrentUser(profileUser);
    console.log(currentUser.data.username);
  };

  useEffect(() => {
    fecheslogin();
  }, []);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const Layouts = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  //Protected Route (check login or not yet)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  //router
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        // {
        //   path: "/ranking",
        //   element: <Ranking />,
        // },
        // {
        //   path: "/reportadmin",
        //   element: <Reportadmin />,
        // },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/friends",
      element: <Pagefriend />,
    },
    {
      path: "/forgotpassword",
      element: <Forgotpassword />,
    },
    {
      path: "/ranking",
      element: <Ranking />,
    },
    {
      path: "/reportadmin",
      element: <Reportadmin />,
    },
    {
      path: "/profileFriends",
      element: (
        <ProtectedRoute>
          <Layouts />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/profileFriends",
          element: <ProfileFriends />,
        },
      ],
    },
  ]);
  //

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
