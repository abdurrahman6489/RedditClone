import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Layout from "./containers/Layout";
import Homepage from "./containers/Homepage";
import LoginPage from "./containers/LoginPage";
import SignupPage from "./containers/SignupPage";
import NewPost from "./containers/NewPost";
import SinglePost from "./containers/SinglePost";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useLocalStorage from "./CustomHook";
import { routepath } from "./routepaths";

function App() {
  useLocalStorage();
  const { home, login, signup, createPost, singlepost } = routepath;
  const router = createBrowserRouter([
    {
      path: home,
      element: (
        <Layout>
          <Homepage />
        </Layout>
      ),
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
      path: createPost,
      element: (
        <Layout>
          <NewPost />
        </Layout>
      ),
    },
    {
      path: `${singlepost}/:id`,
      element: (
        <Layout>
          <SinglePost />
        </Layout>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
