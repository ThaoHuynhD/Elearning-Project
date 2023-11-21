import React, { useEffect, useState } from "react";
import { Modal, Table, Tag, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchList,
  updateUser,
  searchUser,
} from "../../../../Redux/listUserSlice/listUserSlice";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import FormEnrollment from "./FormEnrollment";
import { useNavigate } from "react-router-dom";
import UpdateUserModal from "./UpdateUserModal";
import { setTaiKhoan } from "../../../../Redux/formEnrollSlice/formEnrollSlice";
import AddUser from "../AddUser/AddUser";

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
            <button
              onClick={() => handleEditClick(user)}
              className='text-2xl text-yellow-400 hover:text-yellow-500 duration-300'
            >
              <i className='fa-solid fa-pen-to-square'></i>
            </button>
            <button
              onClick={() => handleDelete(user.taiKhoan)}
              className='text-2xl text-red-600 hover:text-red-700 duration-300'
            >
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
  let dataSource = [];
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
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

  if (isSearch) {
    searchResult?.map((item, index) =>
      dataSource.push({
        key: index + 1,
        ...item,
      }),
    );
  } else {
    listUser?.map((item, index) =>
      dataSource.push({
        key: index + 1,
        ...item,
      }),
    );
  }
  const handleAddUser = () => {
    navigate("/addUser");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleEditClick = (user) => {
    console.log("user:", user);
    setCurrentUser(user);
    setIsModalVisible(true);
    setIsUpdateModalVisible(true);
    console.log(`Modal visibility state: ${isModalVisible}`);
  };

  const handleDelete = (taiKhoan) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa người dùng này?",
      content: "Hành động này không thể đảo ngược",
      onOk: () => {
        dispatch(deleteUser(taiKhoan)).then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            message.success("Người dùng đã bị xóa");
          } else {
            message.error("Đã có lỗi xảy ra");
          }
        });
      },
    });
  };

  const handleSearch = (value) => {
    dispatch(searchUser(value))
      .then((action) => {
        if (action.type === "listUser/searchUser/fulfilled") {
          setSearchResult(action.payload);
          setIsSearch(true);
        } else {
          message.error("Tìm kiếm thất bại:", action.error);
        }
      })
      .catch((error) => {
        message.error("Lỗi tìm kiếm:", error);
      });
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    dispatch(fetchList());
  };

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
      <div className='search-bar'>
        <h3>Tìm kiếm</h3>
        <Input.Search
          placeholder='Nhập tài khoản người dùng'
          enterButton='Tìm kiếm'
          onSearch={handleSearch}
        />
        <Button onClick={handleClearSearch} className='clea-search-button'>
          Ngưng tìm kiếm
        </Button>
      </div>

      <Button type='default' icon={<PlusOutlined />} onClick={handleAddUser}>
        Thêm người dùng
      </Button>
      <UpdateUserModal
        isVisible={isModalVisible}
        onCancel={handleModalCancel}
        user={currentUser}
        onUpdate={(updatedUser) => {
          dispatch(updateUser(updatedUser));
          setIsModalVisible(false);
        }}
      />

      <Table bordered columns={columns} dataSource={dataSource} />
    </div>
  );
}
