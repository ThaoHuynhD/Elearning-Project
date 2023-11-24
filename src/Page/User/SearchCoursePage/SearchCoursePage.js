import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Rate, message } from "antd";
import "./SearchCoursePage.scss";
import {
  dangKyKhoaHoc,
  layDanhSachKhoaHocTheoTen,
} from "../../../Services/api";
import { localServices } from "../../../Services/localServices";
import { useSelector } from "react-redux";

export default function SearchCoursePage() {
  const [listCourseByName, setListCourseByName] = useState([]);
  const [errorGetListCourse, setErrorGetListCourse] = useState("");
  const { info } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const param = useParams();

  useEffect(() => {
    let getListCourse = async () => {
      try {
        let res = await layDanhSachKhoaHocTheoTen(param.tenKhoaHoc);
        setListCourseByName(res.data);
      } catch (error) {
        setErrorGetListCourse(error.response.data);
      }
    };
    getListCourse();
  }, [param.tenKhoaHoc]);
  let handleEnrollCourse = async (maKhoaHoc) => {
    if (info) {
      try {
        let dataEnroll = {
          maKhoaHoc,
          taiKhoan: localServices?.get().taiKhoan,
        };
        let res = await dangKyKhoaHoc(dataEnroll);
        message.success(res.data);
      } catch (err) {
        message.error(err.response?.data);
      }
    } else {
      navigate("/signIn");
    }
  };

  let renderListCourseByName = () => {
    if (listCourseByName !== undefined) {
      return listCourseByName?.map((item, index) => {
        return (
          <div
            key={`item${index}`}
            className='search__item flex flex-wrap md:flex-nowrap border-dashed border-[#d9d9d9] border-2 p-5 rounded-md shadow-lg'
          >
            <div className='w-full md:w-[35%] item__img mr-0 md:mr-8 mb-5  md:mb-0 flex flex-col justify-around items-center'>
              <img src={item.hinhAnh} className='rounded' alt='...' />
              <div className='flex items-center mt-5 md:mt-0'>
                <img
                  src={`https://i.pravatar.cc/40?u=${item.nguoiTao.hoTen}`}
                  className='rounded-full'
                  alt='...'
                />
                <div className='ml-4'>
                  <h1 className='text-[#8c8c8c]'>Lecturer</h1>
                  <p className=' font-semibold'>{item.nguoiTao.hoTen}</p>
                </div>
              </div>
            </div>
            <div className='w-full md:w-[65%] item__content'>
              <h3 className='font-bold'>{item.tenKhoaHoc}</h3>
              <p className='my-3'>
                {item.moTa.length > 100
                  ? item.moTa.slice(0, 100) + "..."
                  : item.moTa}
              </p>
              <div className='item__view flex items-center space-x-4 my-3'>
                <div>
                  <i
                    className='fa-regular fa-eye mr-3'
                    style={{ color: "#F24080" }}
                  ></i>
                  <span>{item.luotXem}+ students</span>
                </div>
                <div>
                  <i className='fa-solid fa-signal text-[#F24080] mr-3'></i>
                  <span>All level</span>
                </div>
              </div>
              <div className='item__rating flex items-center '>
                <div>
                  <span className='text-sm text-[#787878]'>(4.5 ratings)</span>
                </div>
                <Rate
                  disabled
                  className='text-sm ml-4 text-[#F24080]'
                  allowHalf
                  defaultValue={4.5}
                />
              </div>
              <div className='item__creator'>
                <div className='space-x-4 mt-4 flex justify-center'>
                  <NavLink
                    to={info ? `/courseDetail/${item.maKhoaHoc}` : `/signIn`}
                  >
                    <button className='btnGlobal'>Detail</button>
                  </NavLink>
                  <button
                    onClick={() => {
                      handleEnrollCourse(item.maKhoaHoc);
                    }}
                    className='btnGlobal '
                  >
                    Enroll Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <h1 className='font-bold text-3xl'>{errorGetListCourse}</h1>;
    }
  };
  return (
    <div className='searchCourse'>
      <div className='search__banner'>
        <div className='overlay_purpil flex items-center justify-center'>
          <div className='container text-center text-white  '>
            <h1 className='text-6xl font-bold'>Search</h1>
            <p className='text-2xl font-medium'>Course Search Results !!</p>
          </div>
        </div>
      </div>
      <div className='search__list bg-[#f8f8f8]'>
        <div className='container'>
          <div className='py-20'>
            <div>
              <h1 className='font-semibold text-xl'>
                Founded {listCourseByName?.length} result !!
              </h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8'>
              {renderListCourseByName()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
