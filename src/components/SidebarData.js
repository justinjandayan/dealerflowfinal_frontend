import React from "react";
import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import * as MdIcons from "react-icons/md";

// import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Vehicles",
    path: "/vehicle/vehicle-list",
    icon: <FaIcons.FaCarSide />,
    cName: "nav-text",
  },
  {
    title: "Dealer Profile",
    path: "/vehicle/dealer-profile",
    icon: <FaIcons.FaUserTie />,
    cName: "nav-text",
  },
  {
    title: "Manufacturer",
    path: "/vehicle/manufacturer",
    icon: <FaIcons.FaBuilding />,
    cName: "nav-text",
  },
  {
    title: "Sales",
    path: "/vehicle/sales",
    icon: <FaIcons.FaDollarSign />,
    cName: "nav-text",
  },
];
