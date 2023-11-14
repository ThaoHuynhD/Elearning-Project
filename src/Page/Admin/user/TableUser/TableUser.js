import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, Button, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../../../Redux/listUserSlice/listUserSlice";

const TableUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.listUserSlice);
  let datasource = [];

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue(currentUser);
    }
  }, [currentUser, form]);

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue(currentUser);
    }
  }, [currentUser, form]);

  listUser?.forEach((item, index) => {
    datasource.push({
      key: index + 1,
      ...item,
    });
  });

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Here you can call your API to update the user
    // For example: thongTinNguoiDung(values).then(...).catch(...);
    setIsModalVisible(false); // Close the modal after submission
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Loại người dùng",
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
      title: "Hành động",
      render: (_, user) => (
        <div className='space-x-8'>
          <button
            className='text-2xl text-yellow-400 hover:text-yellow-500 duration-300'
            onClick={() => handleEditClick(user)}>
            <i className='editUser fa-solid fa-pen-to-square'></i>
          </button>
          {/* Other buttons if necessary */}
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Your existing code for Search and Add User Button */}
      <Table
        bordered
        columns={columns}
        dataSource={datasource}
      />

      <Modal
        title='Edit User'
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null} // Remove default buttons
      >
        <Form
          form={form}
          initialValues={{
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            soDT: "",
            maLoaiNguoiDung: "",
            maNhom: "",
            email: "",
          }}
          onFinish={handleSubmit}
          layout='vertical'>
          {/* Your form fields here */}
          <Form.Item
            name='taiKhoan'
            label='Tài khoản'>
            <Input />
          </Form.Item>
          {/* ... other form items ... */}
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'>
              Lưu lại
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableUser;
