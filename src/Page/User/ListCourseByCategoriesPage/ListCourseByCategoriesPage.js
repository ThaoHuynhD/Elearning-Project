import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { layKhoaHocTheoDanhMuc } from "../../../Services/api";
import { Rate } from "antd";
import "./ListCourseByCategoriesPage.scss";

export default function ListCourseByCategoriesPage() {

  let { maDanhMuc } = useParams();

  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    let getListCourseByCategories = async () => {
      try {
        let res = await layKhoaHocTheoDanhMuc(maDanhMuc);
        console.log(
          "🚀 ~ file: ListCourseByCateGories.js:15 ~ getListCourseByCategories ~ res:",
          res,
        );
        setListItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListCourseByCategories();
  }, []);
  let renderListCourseItem = () => {
    return listItem?.map((item, index) => {
      return (
        <div
          key={`item${index}`}
          className='listCourse__item rounded-3xl overflow-hidden shadow-md'
        >
          <div>
            <div className='relative'>
              <img src={item.hinhAnh} className='w-full h-[200px]' alt='...' />
              <div
                className={
                  (index + 1) % 2 !== 0
                    ? "nameCourse nameCourse_bg1"
                    : "nameCourse nameCourse_bg2"
                }
              >
                {item.tenKhoaHoc}
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
                <span className='text-sm text-[#787878]'>(4.5 ratings)</span>
              </div>
              <Rate
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
              <p className='ml-4 font-semibold'>{item.nguoiTao.hoTen}</p>
            </div>
            <div className='flex items-center justify-between text-sm border-t-2 border-zinc-100 pt-3'>
              <div>
                <i
                  className='fa-regular fa-eye mr-3'
                  style={{ color: "#F24080" }}
                ></i>
                <span>{item.luotXem}+ students</span>
              </div>
              <div className='hover:text-[#961040] duration-300'>
                <NavLink>
                  <span>ENROLL COURSE</span>
                  <i className='fa-solid fa-arrow-right ml-3'></i>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className='listCourseByCateGories my-20 '>
      <div className='container'>
        <div className='listCourse__title border-2 p-4 inline-block rounded-xl'>
          <i className='fa-solid fa-desktop text-[#f24080] '></i>
          <span className='ml-3 font-bold'>{maDanhMuc} Programming</span>
        </div>
        <div className='listCourse__allItem grid grid-cols-3 gap-8 mt-5'>
          {renderListCourseItem()}
        </div>
      </div>
    </div>
  );
}