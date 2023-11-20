import React, { useEffect, useState } from 'react'
import { message, Image, Button, Tag, ConfigProvider, Table } from 'antd';
import { FormOutlined, DeleteOutlined, ContactsOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { layDanhSachKhoaHocTheoTen } from '../../../Services/api';

export default function CourseManagement({ setSelectedItem, setSelectedCourse, courseList }) {
  dayjs.extend(customParseFormat);

  const [courseSearchList, setCourseSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const colorMap = { 'BackEnd': 'green', 'FrontEnd': 'blue', 'Design': 'red', 'DiDong': 'yellow', 'TuDuy': 'purple' };

  const fetchDataCourseSearch = async (searchValue) => {
    try {
      if (searchValue === '') message.error("Vui lòng nhập nội dung cần tìm vào ô tìm kiếm")
      if (searchValue === undefined || searchValue === '' || searchValue === null) return;
      let response = await layDanhSachKhoaHocTheoTen(searchValue);
      const updatedCourseSearchList = response.data;

      setCourseSearchList(updatedCourseSearchList);
      setIsSearch(true);

      message.success(`Có ${updatedCourseSearchList.length} kết quả tìm kiếm tương tự`)
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const handleSearchCancel = () => { setIsSearch(false); };
  const handleMoveToEnrollment = (maKhoaHoc) => {
    setSelectedItem('enrollmentByCourse');
    setSelectedCourse(maKhoaHoc);
  }
  const tableColumns = [
    { title: 'Ordinal', dataIndex: 'ordinal', key: 'ordinal', },
    { title: 'Image', dataIndex: 'image', key: 'image', },
    { title: 'Name', dataIndex: 'courseName', key: 'courseName', },
    { title: 'Type', dataIndex: 'courseType', key: 'courseType', },
    { title: 'Description', dataIndex: 'description', key: 'description', },
    { title: 'Create Date', dataIndex: 'dateCreate', key: 'dateCreate', sorter: (a, b) => a.dateCreate - b.dateCreate, },
    { title: 'Attendees Amount', dataIndex: 'courseAttendees', key: 'courseAttendees', },
    { title: 'Course Views', dataIndex: 'courseViews', key: 'courseViews', sorter: (a, b) => a.courseViews - b.courseViews, },
    { title: 'Create Account', dataIndex: 'createAccount', key: 'createAccount', },
    { title: 'Actions', dataIndex: 'actions', key: 'actions', },
  ];
  const courseData = [];
  let list = isSearch ? courseSearchList : courseList;
  list.forEach((course, index) => {
    let maDanhMucKhoahoc = course.danhMucKhoaHoc.maDanhMucKhoahoc;
    let tagColor = colorMap[maDanhMucKhoahoc] || 'default';
    let dataRow = {
      ordinal: index + 1,
      image: <Image width={50} height={80} src={course.hinhAnh} alt='' />,
      courseName: `${course.tenKhoaHoc.substring(0, 30)}${course.tenKhoaHoc.length > 30 ? '...' : ''}`,
      courseType: <Tag color={tagColor}>{maDanhMucKhoahoc}</Tag>,
      description: `${course.moTa.substring(0, 200)}${course.moTa.length > 200 ? '...' : ''}`,
      dateCreate: course.ngayTao,
      courseAttendees: course.soLuongHocVien,
      courseViews: course.luotXem,
      createAccount: course.nguoiTao.taiKhoan,
      actions: <div className='flex align-middle justify-center'>
        <ConfigProvider theme={{ token: { colorPrimary: 'black', borderRadius: 10, fontSize: 20, }, }}>
          <Button className='h-11 w-10 text-2xl border-none font-extrabold text-yellow-500 flex align-middle justify-center'
          ><FormOutlined /></Button>
          <Button className='h-11 w-10 text-2xl border-none font-extrabold text-red-500 mx-1 flex align-middle justify-center'
          ><DeleteOutlined /></Button>
          <Button className='h-11 w-10 text-2xl border-none font-extrabold text-green-500 flex align-middle justify-center'
            onClick={() => { handleMoveToEnrollment(course.maKhoaHoc) }}
          ><ContactsOutlined /></Button>
        </ConfigProvider>
      </div>,
    }
    courseData.push(dataRow);
  })

  useEffect(() => {
    fetchDataCourseSearch();
  }, []);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: 'black', borderRadius: 10 } }}>
      <div className="text-right mb-2">
        <Button className='btn bg-green-600 font-bold text-black hover:text-white hover:bg-green-700'
        >Thêm Phim Mới</Button>
      </div>
      <div className="flex searchCourse my-5">
        <Search
          enterButton size="large" onSearch={fetchDataCourseSearch}
          placeholder="input search text(phone number/name)"
          className='bg-blue-500 overflow-hidden rounded-lg'
        />
        <Button className={`btn bg-red-600 text-white font-bold ml-3 h-10 ${isSearch ? 'block' : 'hidden'}`}
          onClick={() => { handleSearchCancel() }}>Cancle Search</Button>
      </div>
      <Table columns={tableColumns} dataSource={courseData} />
    </ConfigProvider>
  )
}
