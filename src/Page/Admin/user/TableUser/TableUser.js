import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../../../Redux/listUserSlice/listUserSlice";
const columns = [
  {
    title: "Username",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
  },
  {
    title: "Name",
    dataIndex: "hoTen",
    key: "hoTen",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "soDt",
    key: "soDt",
  },
  {
    title: "Type",
    dataIndex: "maLoaiNguoiDung",
    key: "maLoaiNguoiDung",
    render: (text) => {
      if (text == "HV") {
        return <Tag color='green'>Học Viên</Tag>;
      } else {
        return <Tag color='red'>Giáo Viên</Tag>;
      }
    },
  },
  {
    title: "Action",
    render: (_, user) => {
      return (
        <div className='space-x-8'>
          <button className='text-2xl text-yellow-400 hover:text-yellow-500 duration-300'>
            <i className='fa-solid fa-pen-to-square'></i>
          </button>
          <button className='text-2xl text-red-600 hover:text-red-700 duration-300'>
            <i className='fa-solid fa-square-xmark '></i>
          </button>
        </div>
      );
    },
  },
];

export default function TableUser() {
  let datasource = [];
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.listUserSlice);

  useEffect(() => {
    // let fetchListUser = async () => {
    //   try {
    //     let res = await layDanhSachNguoiDung();
    //     setListUser(res.data);
    //   } catch (error) {
    //     throw error;
    //   }
    // };
    // fetchListUser();
    dispatch(fetchList());
  }, []);

  listUser?.map((item, index) => {
    datasource.push({
      key: index + 1,
      taiKhoan: item.taiKhoan,
      hoTen: item.hoTen,
      email: item.email,
      soDt: item.soDt,
      maLoaiNguoiDung: item.maLoaiNguoiDung,
    });
  });

  return (
    <div>
      <Table bordered columns={columns} dataSource={datasource} />
    </div>
  );
}
