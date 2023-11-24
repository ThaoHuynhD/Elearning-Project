import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { layKhoaHocTheoDanhMuc } from "../../../Services/api";
import { Rate } from "antd";
import { useSelector } from "react-redux";
import "./ListCourseByCategoriesPage.scss";

export default function ListCourseByCategoriesPage() {
  const { info } = useSelector((state) => state.userSlice);
  const [listItem, setListItem] = useState([]);

  let { maDanhMuc } = useParams();

  useEffect(() => {
    let getListCourseByCategories = async () => {
      try {
        let res = await layKhoaHocTheoDanhMuc(maDanhMuc);
        setListItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListCourseByCategories();
  }, [maDanhMuc]);
  let renderListCourseItem = () => {
    return listItem?.map((item, index) => {
      return (
        <div
          key={`item${index}`}
          className='listCourse__item rounded-3xl hover:shadow-xl hover:-translate-y-1 h-full duration-300'
        >
          <NavLink to={info ? `/courseDetail/${item.maKhoaHoc}` : `/signIn`}>
            <div className='flex flex-col justify-between h-full rounded-3xl overflow-hidden shadow'>
              <div>
                <div className='relative '>
                  <img
                    src={item.hinhAnh}
                    className='w-full h-[200px]'
                    alt='...'
                  />
                  <div
                    className={
                      (index + 1) % 2 !== 0
                        ? "nameCourse nameCourse_bg1"
                        : "nameCourse nameCourse_bg2"
                    }
                  >
                    {item.tenKhoaHoc.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className='info__item'>
                <p>
                  {item.moTa.length > 200
                    ? item.moTa.slice(0, 200) + "..."
                    : item.moTa}
                </p>
                <div className='flex items-center py-2'>
                  <div>
                    <span className='text-sm text-[#787878]'>
                      (4.5 ratings)
                    </span>
                  </div>
                  <Rate
                    disabled
                    className={
                      (index + 1) % 2 !== 0
                        ? "text-sm ml-4 text-[#F24080]"
                        : "text-sm ml-4 text-[#41246d]"
                    }
                    allowHalf
                    defaultValue={4.5}
                  />
                </div>
                <div className='flex items-center py-5'>
                  <img
                    src={`https://i.pravatar.cc/40?u=${item.nguoiTao.hoTen}`}
                    className='rounded-full'
                    alt='...'
                  />
                  <div className='ml-4'>
                    <h1 className='text-[#8c8c8c]'>Lecturer</h1>
                    <p className='font-semibold'>{item.nguoiTao.hoTen}</p>
                  </div>
                </div>
                <div className='flex items-center justify-between text-sm border-t-2 border-zinc-100 pt-3'>
                  <div>
                    <i
                      className='fa-regular fa-eye mr-3'
                      style={{ color: "#F24080" }}
                    ></i>
                    <span>{item.luotXem}+ students</span>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      );
    });
  };
  return (
    <div className='listCourseByCateGories py-20 bg-[#f8f8f8]'>
      <div className='container'>
        <div className='listCourse__title border-2 p-4 inline-block rounded-xl'>
          <i className='fa-solid fa-desktop text-[#f24080] '></i>
          <span className='ml-3 font-bold'>{maDanhMuc} Programming</span>
        </div>
        <div className='listCourse__allItem grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-8 mt-5'>
          {renderListCourseItem()}
        </div>
      </div>
    </div>
  );
}
