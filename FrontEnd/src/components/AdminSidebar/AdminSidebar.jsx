import React, { useState } from "react";
import "./AdminSidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const handledLoggedOut = () => {
    setIsLoggedOut(true);
    localStorage.removeItem("loggedInUser");
    navigate("/admin");
  };

  const toggleDropdown = (itemName) => {
    if (openDropdown === itemName) {
      setOpenDropdown("");
    } else {
      setOpenDropdown(itemName);
    }
  };

  const sideNavItems = [
    {
      path: "/admin/dash",
      text: "Admins",
      Icon: <i className="fas fa-users"></i>,
    },
    {
      path: "/admin/room",
      text: "Rooms & Suites",
      Icon: <i className="fa-solid fa-bed"></i>,
    },
    {
      path: "/admin/booking",
      text: "Bookings",
      Icon: <i className="fa-solid fa-hotel"></i>,
    },
    {
      path: "/admin/event",
      text: "Events",
      Icon: <i className="fas fa-calendar-alt"></i>,
    },

    {
      path: "/admin/meeting",
      text: "Meetings",
      Icon: <i className="fas fa-calendar-alt"></i>,
    },
    {
      path: "/admin/restaraunt",
      text: "Restaurant",
      Icon: <i className="fa-solid fa-bell-concierge"></i>,
      subItems: [
        { path: "/admin/restaurant/menu", text: "Restaurant Menu" },
        { path: "/admin/restaurant/restaurant-offers", text: "Menu Offers" },
      ],
    },
    {
      path: "/admin/gallery",
      text: "Gallery",
      Icon: <i className="fa-regular fa-image"></i>,
    },
    {
      path: "/admin/services",
      text: "Services",
      Icon: <i className="fa-solid fa-hand-holding-heart"></i>,
    },
    {
      path: "/admin/otherservices",
      text: "Other Services",
      Icon: <i className="fa-solid fa-hand-holding-heart"></i>,
    },
    {
      path: "/admin/inquery",
      text: "Inquiries",
      Icon: <i className="fa-solid fa-circle-question"></i>,
    },
    {
      path: "/admin/activities",
      text: "Activities",
      Icon: <i className="fa-solid fa-person-swimming"></i>,
    },
    {
      path: "/admin/offers",
      text: "Offers",
      Icon: <i className="fa-solid fa-money-check"></i>,
    },
  ];

  return (
    <div className="mainSideBar">
      <div className="admin-sidebar">
        <div className="admin-sidebar-content">
          {sideNavItems.map((item, index) =>
            item.subItems ? (
              <React.Fragment key={index}>
                <div
                  onClick={() => toggleDropdown(item.text)}
                  className={
                    item.text === "Restaurant" ? "sidebar-item-restaurant" : ""
                  }
                >
                  {item.Icon}
                  {item.text}
                </div>
                {openDropdown === item.text && (
                  <div
                    style={{ paddingLeft: "60px" }}
                    className={
                      item.text === "Restaurant"
                        ? "sidebar-subitems-restaurant"
                        : ""
                    }
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        style={{ textDecorationLine: "none" }}
                      >
                        <span>{subItem.text}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ) : (
              <NavLink
                key={index}
                to={item.path}
                style={{ textDecorationLine: "none" }}
                className={`sidebar-item ${
                  item.text === "Restaurant" ? "sidebar-item-restaurant" : ""
                }`}
              >
                <span style={{ textDecorationLine: "none" }}>
                  <a>
                    {item.Icon}
                    {item.text}
                  </a>
                </span>
              </NavLink>
            )
          )}
        </div>
        <div className="admin-sidebar-footer">
          <a onClick={handledLoggedOut} className="logout-btn">
            Logout
          </a>
          {/* <a   style ="color: #cd7f32;" className="logout-btn" routerLink="/logout"</a> */}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
