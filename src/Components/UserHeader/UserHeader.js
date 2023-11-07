import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import "./UserHeader.scss";
import { useSelector } from "react-redux";
import { localServices } from "../../Services/localServices";
export default function UserHeader() {
  const [headerFixed, setheaderFixed] = useState(" ");
  let { info } = useSelector((state) => state.userSlice);
  let navigate = useNavigate();
  const onSearch = (value, _e) => {
    navigate(`/searchCourse/${value}`);
  };
  let handleLogOut = () => {
    localServices.remove();
  };
  const handleScrollHeader = () => {
    if (window.scrollY > 200) {
      setheaderFixed("header__fixed");
    } else {
      setheaderFixed(" ");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollHeader);
  }, []);
  let renderButton = () => {
    if (info) {
      return (
        <div className='flex items-center'>
          <NavLink to={"/personal"}>
            <span className='hover:text-orange-500 duration-300 flex items-center'>
              <img
                src={`https://i.pravatar.cc/150?u=${info.hoTen}`}
                className='w-8 rounded-full'
              />
              {info.hoTen}
            </span>
          </NavLink>

          <button
            onClick={handleLogOut}
            className='ml-3 hover:text-orange-500 duration-300'
          >
            <i className='fa-solid fa-right-from-bracket mr-2'></i>
            <span>Log Out</span>
          </button>
        </div>
      );
    } else {
      return (
        <>
          <button className='mr-4 '>
            <NavLink to={"/signIn"}>
              <i className='fa-solid fa-user mr-2'></i>
              <span>Sign In</span>
            </NavLink>
          </button>
          <button>
            <NavLink to={"/signUp"}>
              <i className='fa-solid fa-unlock mr-2'></i>
              <span>Sign Up</span>
            </NavLink>
          </button>
        </>
      );
    }
  };
  return (
    <div className='header'>
      <div className='header__top'>
        <div className='iconHeader flex justify-between items-center container '>
          <div className='space-x-6'>
            <i className='fa-brands fa-facebook' />
            <i className='fa-brands fa-twitter' />
            <i className='fa-brands fa-youtube' />
            <i className='fa-brands fa-instagram' />
            <i className='fa-brands fa-linkedin' />
          </div>
          <div>
            <Search
              placeholder='input search text'
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
          </div>
          <div>{renderButton()}</div>
        </div>
      </div>
      <div className={` header__bottom ${headerFixed}`}>
        <div className='container flex justify-between items-center py-3'>
          <div className='hover:opacity-60 duration-300'>
            <NavLink to={"/"}>
              <img src='../image/educator-logo1.png' alt='...' />
            </NavLink>
          </div>
          <nav>
            <ul className='flex items-center space-x-8'>
              <li>
                <a href='#' style={{ color: "#F24080" }}>
                  HOME
                </a>
              </li>
              <li>
                <a href='#'>ABOUT US</a>
              </li>
              <li>
                <a href='#'>PAGES</a>
              </li>
              <li>
                <a href='#'>BLOG</a>
              </li>
              <li>
                <a href='#'>SHOP</a>
              </li>
              <li>
                <a href='#'>CONTACT</a>
              </li>
            </ul>
          </nav>
          <div>
            <button className='btnGlobal'>JOIN US NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}
