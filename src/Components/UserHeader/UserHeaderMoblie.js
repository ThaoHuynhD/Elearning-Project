import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { localServices } from "../../Services/localServices";
import Search from "antd/es/input/Search";
import { Collapse, ConfigProvider } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
let navitems = [
  { navItem: "ABOUT US" },
  { navItem: "PAGES" },
  { navItem: "BLOG" },
  { navItem: "SHOP" },
  { navItem: "CONTACT" },
];

const items = [
  {
    key: "1",
    label: <p className='font-bold text-xl'>MENU</p>,
    children: (
      <ul className='menuList flex flex-col justify-start'>
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
    ),
  },
];

export default function UserHeaderMoblie() {
  let { info } = useSelector((state) => state.userSlice);
  let navigate = useNavigate();
  const onSearch = (value, _e) => {
    navigate(`/searchCourse/${value}`);
  };
  let handleLogOut = () => {
    localServices.remove();
  };

  let renderButton = () => {
    if (info) {
      return (
        <div className='flex items-center justify-between'>
          <NavLink to={"/personal"}>
            <span className='hover:text-[#961040] duration-300 flex items-center'>
              <img
                src={`https://i.pravatar.cc/150?u=${info.hoTen}`}
                className='w-5 rounded-full'
                alt='...'
              />
              {info.hoTen}
            </span>
          </NavLink>

          <button
            onClick={handleLogOut}
            className='ml-1 hover:text-[#961040] duration-300'
          >
            <i className='fa-solid fa-right-from-bracket mr-2'></i>
            <span>Log Out</span>
          </button>
        </div>
      );
    } else {
      return (
        <>
          <button className='mr-2'>
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
  const customExpandIcon = (panelProps) => {
    const { isActive } = panelProps;
    return <span>{isActive ? <CloseOutlined /> : <MenuOutlined />}</span>;
  };

  return (
    <div className='header'>
      <div className='header__top'>
        <div className='iconHeader flex justify-between items-center container'>
          <div className='space-x-2'>
            <i className='fa-brands fa-facebook' />
            <i className='fa-brands fa-twitter' />
            <i className='fa-brands fa-youtube' />
            <i className='fa-brands fa-instagram' />
            <i className='fa-brands fa-linkedin ' />
          </div>
          <div>{renderButton()}</div>
        </div>
      </div>
      <div className='header__middle '>
        <div className='container flex justify-between item-center py-3'>
          <div className='hover:opacity-60 duration-300'>
            <NavLink to={"/"}>
              <img
                src='../image/educator-logo1.png'
                className='w-[75%] sm:w-full'
                alt='...'
              />
            </NavLink>
          </div>
          <div className='flex items-center w-[200px] searchBar'>
            <Search enterButton placeholder='Search...' onSearch={onSearch} />
          </div>
        </div>
      </div>
      <nav>
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerBg: "#41246d",
                contentBg: "#fff",
              },
            },
            token: {
              borderRadiusLG: 0,
              colorBorder: "rgba(255, 255, 255, 0.11)",
              padding: 0,
            },
          }}
        >
          <Collapse expandIcon={customExpandIcon} items={items} />
        </ConfigProvider>
      </nav>
    </div>
  );
}
