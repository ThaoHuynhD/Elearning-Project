import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, Input, Button, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchList,
  updateUser,
  searchUser,
} from "../../../../Redux/listUserSlice/listUserSlice";
import UpdateUserModal from "./UpdateUserModal";
import SearchUserModal from "./SearchUserModal";
import AddUser from "../AddUser/AddUser";

const TableUser = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.listUserSlice);

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  let datasource = listUser?.map((item, index) => ({
    key: index + 1,
    ...item,
  }));

  const handleAddUser = () => {
    navigate("/addUser");
  }

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleEditClick = (user) => {
    console.log("user:", user);
    setCurrentUser(user);
    setIsModalVisible(true);
    setIsUpdateModalVisible(true);
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
          setIsSearchModalVisible(true);
        } else {
          console.error("Search failed:", action.error);
        }
      })
      .catch((error) => {
        console.error("Search error:", error);
      });
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
            className='text-2xl text-yellow-400 hover:text-yellow-700 duration-300'
            onClick={() => handleEditClick(user)}>
            <i className='editUser fa-solid fa-pen-to-square'></i>
          </button>

          <button
            className='text-2xl text-red-400 hover:text-red-700 duration-300'
            onClick={() => handleDelete(user.taiKhoan)}>
            <i class='fa-solid fa-trash'></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className='search-bar'>
        <h3>Tìm kiếm</h3>
        <Input.Search
          placeholder='Nhập tài khoản người dùng'
          enterButton='Tìm kiếm'
          onSearch={handleSearch}
        />
      </div>

      <Button
        type="primary"
        icon={<PlusOutlined/>}
        onClick={handleAddUser}
      >
        Thêm người dùng
      </Button>


      <Table
        bordered
        columns={columns}
        dataSource={datasource}
      />

      {/* UpdateUserModal for editing user information */}
      <UpdateUserModal
        isVisible={isModalVisible}
        onCancel={handleModalCancel}
        user={currentUser}
        onUpdate={(updatedUser) => {
          dispatch(updateUser(updatedUser));
          setIsUpdateModalVisible(false);
        }}
      />

      {/* SearchUserModal for displaying search results */}
      <SearchUserModal
        isVisible={isSearchModalVisible}
        onCancel={() => setIsSearchModalVisible(false)}
        user={searchResult}
      />
    </div>
  );
};

export default TableUser;
