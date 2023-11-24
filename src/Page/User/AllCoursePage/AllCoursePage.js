import { Checkbox, ConfigProvider, Pagination, Rate } from "antd";
import React, { useEffect, useState } from "react";
import {
  layDanhSachKhoaHoc,
  layDanhSachKhoaHoc_PhanTrang,
} from "../../../Services/api";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./AllCoursePage.scss";
import BackToTop from "../../../Components/BackToTop/BackToTop";

export default function AllCoursePage() {
  const [page, setPage] = useState(1);
  const [listItemPage, setListItemPage] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  let { listCategories } = useSelector((state) => state.categoriesSlice);
  const { info } = useSelector((state) => state.userSlice);

  useEffect(() => {
    let getCourseListByPage = async () => {
      try {
        let res = await layDanhSachKhoaHoc_PhanTrang(page);
        setListItemPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourseListByPage();
  }, [page]);

  useEffect(() => {
    let getAllCourse = async () => {
      try {
        let res = await layDanhSachKhoaHoc();
        setAllCourse(res.data);
      } catch (err) {
        console.log("😐 ~ getAllCourse ~ err:", err);
      }
    };
    getAllCourse();
  }, []);

  let dataFilter = allCourse?.filter((item) =>
    selectedItems?.includes(item.danhMucKhoaHoc?.maDanhMucKhoahoc),
  );

  let listCourse =
    selectedItems?.length !== 0 ? dataFilter : listItemPage?.items;

  let renderItemPage = () => {
    if (listCourse) {
      return listCourse.map((item, index) => {
        return (
          <div
            id='cardItem'
            key={`item${index}`}
            className='h-full hover:shadow-xl hover:-translate-y-1 rounded-3xl duration-300 border border-[#ffffff]'
          >
            <NavLink to={info ? `/courseDetail/${item.maKhoaHoc}` : `/signIn`}>
              <div className='flex flex-col justify-between rounded-3xl overflow-hidden shadow-lg h-full'>
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
                      {item.danhMucKhoaHoc?.maDanhMucKhoahoc}
                    </div>
                  </div>
                </div>
                <div className='info__item'>
                  <p className='text-2xl font-bold'>{item.tenKhoaHoc}</p>
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
                    <div className='ml-4'>
                      <h1 className='text-[#8c8c8c]'>Lecturer</h1>
                      <p className=' font-semibold'>{item.nguoiTao.hoTen}</p>
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
    }
  };
  const onChange = (e) => {
    setSelectedItems(e);
  };

  return (
    <section className='allCoursePage py-10 bg-[#f8f8f8]'>
      <div className='containerAllCourse'>
        <div className=' grid grid-cols-1 lg:grid-cols-4 lg:gap-10 sticky '>
          <div className='course__filter relative '>
            <div className='p-4 border-2 border-gray-300 sticky top-8 rounded-xl'>
              <h1 className='font-bold'>Filter Categories</h1>
              <div className='flex flex-col text-xl mt-3'>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#f24080",
                      colorBorder: "#000",
                      fontSize: "1.25rem",
                    },
                  }}
                >
                  <Checkbox.Group
                    className='flex-col space-y-4'
                    options={
                      listCategories &&
                      listCategories.map((item, index) => {
                        return {
                          label: item.tenDanhMuc,
                          value: item.maDanhMuc,
                        };
                      })
                    }
                    onChange={onChange}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
          <div className='listCourse col-span-3'>
            <div className='grid grid-col-1 gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-8'>
              {renderItemPage()}
            </div>
            <div
              className={`flex justify-center mt-8 ${
                selectedItems?.length !== 0 ? "hidden" : "block"
              }`}
            >
              <Pagination
                current={page}
                onChange={(page) => {
                  setPage(page);
                }}
                defaultPageSize={9}
                total={listItemPage?.totalCount}
              />
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </section>
  );
}
