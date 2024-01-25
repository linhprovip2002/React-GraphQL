import React from "react";
import CreateLink from "./forms/CreateLink";
import Header from "./layout/header";
import LinkList from "../views/linkList/LinkList";
import Login from "./forms/Login";
import { Route, Routes } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const App = () => {
  return (
    <div className="flex justify-center">
      <ReactNotifications />
      <div className="center w-[80%]">
        <div className="flex justify-between">
          <Header />
        </div>
        <div className="ph3 pv1 background-gray">
          <Routes>
            <Route path="/" element={<LinkList />} />
            <Route path="/create" element={<CreateLink />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
