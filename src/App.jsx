import React, { useState } from "react";
import "./App.css";
import Layout from "./containers/Layout";
import Homepage from "./containers/Homepage";
import LoginPage from "./containers/LoginPage";
import SignupPage from "./containers/SignupPage";
import NewPost from "./containers/NewPost";
import SinglePost from "./containers/SinglePost";
import Modalcomponent from "./components/Modalcomponent";
import useLocalStorage from "./Utils/CustomHook";
import { routepath } from "./Utils/routepaths";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

function App() {
  useLocalStorage();
  const { home, login, signup, createPost, singlepost } = routepath;
  const selectedPost = useSelector((state) => state.selectedPost);
  const modalOpen = useSelector((state) => state.popUp.open);
  const router = createBrowserRouter([
    {
      path: home,
      element: (
        <Layout>
          <Homepage />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: login,
      element: <LoginPage />,
    },
    {
      path: signup,
      element: <SignupPage />,
    },
    {
      path: `${singlepost}/:id`,
      element: (
        <Layout>
          <SinglePost {...selectedPost} />
        </Layout>
      ),
    },
  ]);
  return (
    <>
      {modalOpen && <Modalcomponent />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
