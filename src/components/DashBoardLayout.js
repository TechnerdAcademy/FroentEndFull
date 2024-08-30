// components/DashBoardLayout.js
import React from "react";
import DashboardHeader from "../components/DashboardHeader/index"; // Your dashboard header
import { Link, Outlet } from "react-router-dom"; // Outlet to render nested routes

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <nav className="dashboard-nav">
        <ul>
          {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
          {/* <li><Link to="/dashboard/courses">Courses</Link></li> */}
          {/* <li><Link to="/dashboard/profile">Profile</Link></li> */}
          {/* Add more links as needed */}
        </ul>
      </nav>
      <main>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>
    </>
  );
};

export default DashboardLayout;
