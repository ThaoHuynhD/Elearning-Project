import React from 'react';
import { Modal, Descriptions } from 'antd';

const SearchUserModal = ({ isVisible, onCancel, user }) => {
  
  return (
    <Modal
      title="Thông tin người dùng"
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      {user ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tài khoản">{user.taiKhoan}</Descriptions.Item>
          <Descriptions.Item label="Họ tên">{user.hoTen}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{user.soDt}</Descriptions.Item>
          <Descriptions.Item label="Mật khẩu">{user.matKhau}</Descriptions.Item>
          <Descriptions.Item label="Loại người dùng">{user.maLoaiNguoiDung}</Descriptions.Item>
          <Descriptions.Item label="Tên loại người dùng">{user.tenLoaiNguoiDung}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No user data found</p>
      )}
    </Modal>
  );
};

export default SearchUserModal;
