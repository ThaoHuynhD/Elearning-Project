import React, { useEffect, useState } from 'react'

import { message, Image, Button, Tag } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
// import Search from 'antd/es/input/Search';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { layDanhSachKhoaHoc } from '../../../Services/api';


dayjs.extend(customParseFormat);

export default function CourseManagement() {

  const [courseList, setCourseList] = useState([]);
  const [courseSearchList, setCourseSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const fetchDataCourseList = async () => {
    try {
      let response = await layDanhSachKhoaHoc();
      setCourseList(response.data);
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  // const fetchDataCourseSearch = async (searchValue) => {
  //   try {
  //     if (searchValue === undefined || searchValue === '' || searchValue === null) return;
  //     let response = await getCourseListSearchByName(searchValue);
  //     const updatedCourseSearchList = response.data.content;
  //     setCourseSearchList(updatedCourseSearchList);
  //     setIsSearch(true);
  //     message.success(`Có ${updatedCourseSearchList.length} kết quả tìm kiếm tương tự`)
  //   } catch {
  //     message.error("Đã có lỗi xảy ra");
  //   }
  // };
  // const handleSearchCancel = () => { setIsSearch(false); };

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
            let maDanhMucKhoahoc = course.danhMucKhoaHoc.maDanhMucKhoahoc
            let tagColor;
            if (maDanhMucKhoahoc === 'BackEnd') tagColor = 'green'
            else if (maDanhMucKhoahoc === 'FrontEnd') tagColor = 'blue'
            else if (maDanhMucKhoahoc === 'Design') tagColor = 'red'
            else if (maDanhMucKhoahoc === 'DiDong') tagColor = 'yellow'
            else if (maDanhMucKhoahoc === 'TuDuy') tagColor = 'purple';
            return (
              <tr key={index} className='border'>
                <td className='border px-2'>{index + 1}</td>
                <td className='border px-2 xl:px-5 py-1'><Image width={50} height={80} src={course.hinhAnh} alt='' /></td>
                <td className='border px-2 text-left'>{course.tenKhoaHoc.substring(0, 30)}{course.tenKhoaHoc.length > 30 ? '...' : ''}</td>
                <td className='border px-2'><Tag color={tagColor}>{maDanhMucKhoahoc}</Tag></td>
                <td className='border px-2 xl:px-5 text-left'>{course.moTa.substring(0, 200)}{course.moTa.length > 200 ? '...' : ''}</td>
                <td className='border px-2'>{course.ngayTao}</td>
                <td className='border px-2'>{course.soLuongHocVien}</td>
                <td className='border px-2'>{course.luotXem}</td>
                <td className='border px-2'>{course.nguoiTao.taiKhoan}</td>

                <td className='m-auto'>
                  <div className='flex align-middle justify-center'>
                    <Button className='btn bg-yellow-500 p-2 flex align-middle justify-center'
                    ><FormOutlined /></Button>
                    <Button className='btn bg-red-500 mx-1 p-2 flex align-middle justify-center'
                    ><DeleteOutlined /></Button>
                  </div>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    )

  }
  useEffect(() => {
    fetchDataCourseList();
  }, []);

  return (
    <div>
      {/* <div className="flex searchCourse">
        <Search
          enterButton size="large" onSearch={fetchDataCourseSearch}
          placeholder="input search text(phone number/name)"
          className='bg-blue-500 overflow-hidden rounded-lg'
        />
        <button className={`btn btn-danger ${isSearch ? 'block' : 'hidden'}`}
          onClick={() => { handleSearchCancel() }}>CancleSearch</button>
      </div> */}
      {renderList()}
    </div >
  )
}
