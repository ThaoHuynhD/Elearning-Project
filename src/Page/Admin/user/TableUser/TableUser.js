import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchList,
  updateUser,
  searchUser,
} from "../../../../Redux/listUserSlice/listUserSlice";
import UpdateUserModal from "./UpdateUserModal";
import AddUser from "../AddUser/AddUser";

const TableUser = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.listUserSlice);
  let dataSource = [];

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  if (isSearch) {
    searchResult?.map((item, index) =>
      dataSource.push({
        key: index + 1,
        ...item,
      })
    );
  } else {
    listUser?.map((item, index) =>
      dataSource.push({
        key: index + 1,
        ...item,
      })
    );
  }

  console.log("result", searchResult);

  const handleAddUser = () => {
    navigate("/addUser");
  };

  // const handleModalCancel = () => {
  //   setIsModalVisible(false);
  //   setCurrentUser(null);
  // };

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
  }

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
        <Button
          onClick={handleClearSearch}
          className="clea-search-button"
        >Ngưng tìm kiếm</Button>
      </div>

      <Button
        type='default'
        icon={<PlusOutlined />}
        onClick={handleAddUser}>
        Thêm người dùng
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default TableUser;
