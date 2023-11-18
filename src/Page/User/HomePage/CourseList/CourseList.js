import React, { useEffect, useState } from "react";
import { layDanhSachKhoaHoc } from "../../../../Services/api";
import "./CourseList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";
export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    let getCourseList = async () => {
      try {
        let res = await layDanhSachKhoaHoc();
        setCourseList(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getCourseList();
  }, []);
  let renderCourseItem = () => {
    return courseList?.map((item, index) => {
      return (
        <SwiperSlide key={`couseItem${index}`}>
          <div className=' p-5 '>
            <div className='rounded-3xl overflow-hidden shadow-md'>
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
                    {item.tenKhoaHoc}
                  </div>
                </div>
              </div>
              <div className='info__item'>
                <p>
                  {item.moTa.length > 50
                    ? item.moTa.slice(0, 50) + "..."
                    : item.moTa}
                </p>
                <div className='flex items-center py-2'>
                  <div>
                    <span className='text-sm text-[#787878]'>
                      (4.5 ratings)
                    </span>
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
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <section className='courseList'>
      <div className='container'>
        <div className='overlay'>
          <div className='courseList__title w-1/2 mx-auto'>
            <div className='text-center'>
              <h1 className='font-extrabold text-[42px] mb-5'>
                Most Featured Courses
              </h1>
              <p>
                Saepe quo labore aenean dictumst expedita commodi auctor, nisl,
                lorem iusto feugiat nemo reiciendis laboris.
              </p>
            </div>
          </div>
          <div className='courselist__Item mt-10'>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              navigation={true}
              modules={[Navigation]}
              className='mySwiper'
            >
              {renderCourseItem()}
            </Swiper>
          </div>
          <div className='flex justify-center mt-10'>
            <NavLink to={"/allCoursePage"}>
              <button className='btnViewAllCourse'>VIEW ALL COURSE</button>
            </NavLink>
          </div>
          <div className='bg-oval courseList_bg'></div>
          <div className='pattern-overlay courseList_bg'></div>
        </div>
      </div>
    </section>
  );
}
