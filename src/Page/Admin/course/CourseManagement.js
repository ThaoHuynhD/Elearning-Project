import React, { useEffect, useState } from "react";

import { message, Image, Button, Tag, ConfigProvider } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

import {
  layDanhSachKhoaHoc,
  layDanhSachKhoaHocTheoTen,
  xoaKhoaHoc,
} from "../../../Services/api";

import PopUpAddCourse from "./PopUpAddCourse/PopUpAddCourse";
import { useDispatch } from "react-redux";
import {
  getInfoCourse,
  setIsModalEditOpen,
} from "../../../Redux/modalEditFormSlice/modalEditFormSlice";
import PopUpEditCourse from "./PopUpEditCourse/PopUpEditCourse";

export default function CourseManagement() {
  const [courseList, setCourseList] = useState([]);
  const [courseSearchList, setCourseSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  dayjs.extend(customParseFormat);

  const fetchDataCourseList = async () => {
    try {
      let response = await layDanhSachKhoaHoc();
      setCourseList(response.data);
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const fetchDataCourseSearch = async (searchValue) => {
    try {
      if (
        searchValue === undefined ||
        searchValue === "" ||
        searchValue === null
      )
        return;
      let response = await layDanhSachKhoaHocTheoTen(searchValue);
      const updatedCourseSearchList = response.data;
      setCourseSearchList(updatedCourseSearchList);
      setIsSearch(true);
      message.success(
        `Có ${updatedCourseSearchList.length} kết quả tìm kiếm tương tự`,
      );
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const handleSearchCancel = () => {
    setIsSearch(false);
  };
  const handleDeleteCourse = async (maKhoaHoc) => {
    try {
      let res = await xoaKhoaHoc(maKhoaHoc);
      message.success("Xoá khoá học thành công");
      fetchDataCourseList();
    } catch (error) {
      message.error(error.response.data);
    }
  };
  const handleSendStatus = () => {
    dispatch(setIsModalEditOpen(true));
  };

  const renderList = () => {
    let list = isSearch ? courseSearchList : courseList;
    return (
      <table className='listCourse text-center overflow-hidden'>
        <thead>
          <tr>
            <th className='max-w-150 border'>STT</th>
            <th className='max-w-150 border'>HÌNH ẢNH</th>
            <th className='max-w-300 border'>TÊN KHÓA HỌC</th>
            <th className='max-w-150 border'>MÃ DANH MỤC KHÓA HỌC</th>
            <th className='max-w-300 border'>MÔ TẢ</th>
            <th className='max-w-150 border'>NGÀY TẠO</th>
            <th className='max-w-150 border'>SỐ LƯỢNG HỌC VIÊN</th>
            <th className='max-w-150 border'>LƯỢT XEM</th>
            <th className='max-w-150 border'>NGƯỜI TẠO</th>
            <th className='max-w-150 border'>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {list.map((course, index) => {
            let maDanhMucKhoahoc = course.danhMucKhoaHoc.maDanhMucKhoahoc;
            let tagColor;
            if (maDanhMucKhoahoc === "BackEnd") tagColor = "green";
            else if (maDanhMucKhoahoc === "FrontEnd") tagColor = "blue";
            else if (maDanhMucKhoahoc === "Design") tagColor = "red";
            else if (maDanhMucKhoahoc === "DiDong") tagColor = "yellow";
            else if (maDanhMucKhoahoc === "TuDuy") tagColor = "purple";
            return (
              <tr key={index} className='border'>
                <td className='border px-2'>{index + 1}</td>
                <td className='border px-2 xl:px-5 py-1'>
                  <Image width={50} height={80} src={course.hinhAnh} alt='' />
                </td>
                <td className='border px-2 text-left'>
                  {course.tenKhoaHoc.substring(0, 30)}
                  {course.tenKhoaHoc.length > 30 ? "..." : ""}
                </td>
                <td className='border px-2'>
                  <Tag color={tagColor}>{maDanhMucKhoahoc}</Tag>
                </td>
                <td className='border px-2 xl:px-5 text-left'>
                  {course.moTa.substring(0, 200)}
                  {course.moTa.length > 200 ? "..." : ""}
                </td>
                <td className='border px-2'>{course.ngayTao}</td>
                <td className='border px-2'>{course.soLuongHocVien}</td>
                <td className='border px-2'>{course.luotXem}</td>
                <td className='border px-2'>{course.nguoiTao.taiKhoan}</td>

                <td className='m-auto'>
                  <div className='flex align-middle justify-center'>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "white",
                          borderRadius: 10,
                          fontSize: 20,
                        },
                      }}
                    >
                      <Button
                        className='h-11 w-15 btn bg-yellow-500 p-3 flex align-middle justify-center'
                        onClick={() => {
                          handleSendStatus();
                        }}
                      >
                        <FormOutlined />
                      </Button>
                      <PopUpEditCourse />
                      <Button
                        className='h-11 w-15  btn bg-red-500 mx-1 p-3 flex align-middle justify-center'
                        onClick={() => {
                          handleDeleteCourse(course.maKhoaHoc);
                        }}
                      >
                        <DeleteOutlined />
                      </Button>
                    </ConfigProvider>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  useEffect(() => {
    fetchDataCourseList();
    fetchDataCourseSearch();
  }, []);

  return (
    <div>
      <div className='text-right mb-2'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "white",
              borderRadius: 10,
            },
          }}
        >
          {/* <Button className='btn bg-green-600 font-bold text-black hover:text-white hover:bg-green-800'>
            Thêm Phim Mới
          </Button> */}
          <PopUpAddCourse />
        </ConfigProvider>
      </div>

      <div className='flex searchCourse my-5'>
        <Search
          enterButton
          size='large'
          onSearch={fetchDataCourseSearch}
          placeholder='input search text(phone number/name)'
          className='bg-blue-500 overflow-hidden rounded-lg'
        />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "white",
              borderRadius: 10,
            },
          }}
        >
          <Button
            className={`btn bg-red-600 text-white font-bold ml-3 h-10 ${
              isSearch ? "block" : "hidden"
            }`}
            onClick={() => {
              handleSearchCancel();
            }}
          >
            Cancel Search
          </Button>
        </ConfigProvider>
      </div>
      {renderList()}
    </div>
  );
}
