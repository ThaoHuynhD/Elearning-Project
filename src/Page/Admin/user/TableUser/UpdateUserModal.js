import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const UpdateUserModal = ({ isVisible, onCancel, user, onUpdate }) => {

  const handleSubmit = (values) => {
    console.log("Submitting form with values:", values);
    onUpdate(values);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);
  
  return (
    <Modal
      title='Cập nhật người dùng'
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button
          key='cancel'
          onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={() => form.submit()}>
          Update
        </Button>,
      ]}>
      <Form
        form={form}
        initialValues={user}
        onFinish={handleSubmit}
        layout='vertical'>
        <Form.Item
          name='taiKhoan'
          label='Tài khoản'>
          <Input />
        </Form.Item>
        <Form.Item
          name='matKhau'
          label='Mật Khẩu'>
          <Input />
        </Form.Item>
        <Form.Item
          name='hoTen'
          label='Họ tên'>
          <Input />
        </Form.Item>
        <Form.Item
          name='soDt'
          label='Số điện thoại'>
          <Input />
        </Form.Item>
        <Form.Item
          name='maLoaiNguoiDung'
          label='Mã loại người dùng'>
          <Input />
        </Form.Item>
        <Form.Item
          name='maNhom'
          label='Mã nhóm'>
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='email'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'>
            Lưu lại
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
