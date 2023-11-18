import React, { useEffect, useState } from "react";
import { Modal, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../../../Redux/listUserSlice/listUserSlice";
import { CloseOutlined } from "@ant-design/icons";
import FormEnrollment from "./FormEnrollment";
import { setTaiKhoan } from "../../../../Redux/formEnrollSlice/formEnrollSlice";

export default function TableUser() {
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
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
        if (text === "HV") {
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
            <button
              onClick={() => {
                showModal(user);
              }}
              className='text-2xl text-green-400 hover:text-green-500 duration-300'
            >
              <i className='fa-solid fa-user-check'></i>
            </button>
          </div>
        );
      },
    },
  ];
  let datasource = [];

  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.listUserSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (user) => {
    dispatch(setTaiKhoan(user.taiKhoan));
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  listUser?.map((item, index) =>
    datasource.push({
      key: index,
      stt: index + 1,
      ...item,
    }),
  );

  return (
    <div>
      <Modal
        footer={null}
        centered
        width={"60%"}
        closeIcon={<CloseOutlined className='text-black' />}
        okType={"default"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormEnrollment />
      </Modal>

      <Table bordered columns={columns} dataSource={datasource} />
    </div>
  );
}
