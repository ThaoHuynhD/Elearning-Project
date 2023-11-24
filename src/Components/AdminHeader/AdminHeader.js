import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { localServices } from "../../Services/localServices";

export default function AdminHeader() {
  let { info } = useSelector((state) => state.userSlice);

  let handleLogOut = () => {
    localServices.remove();
  };
  let renderButton = () => {
    if (info) {
      return (
        <div className='flex items-center gap-3'>
          <NavLink to={"/personal"}>
            <span className='hover:text-orange-500 duration-300 flex items-center'>
              <img
                src={`https://i.pravatar.cc/150?u=${info.hoTen}`}
                className='w-8 rounded-full mr-2'
                alt=''
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
  return <div className='flex float-right text-white'>{renderButton()}</div>;
}
