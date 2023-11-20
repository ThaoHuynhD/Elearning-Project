import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import { capNhatThongTinNguoiDung } from '../../../Services/api';
import { userDetailLocalStorage } from '../../../Services/localServices';


export default function PersonalInfo({ userDetail }) {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  useEffect(() => {
    if (userDetail !== null) {
      form.setFieldsValue({
        taiKhoan: userDetail.taiKhoan,
        matKhau: userDetail.matKhau,
        soDT: userDetail.soDT,
        hoTen: userDetail.hoTen,
        email: userDetail.email,
        maLoaiNguoiDung: userDetail.maLoaiNguoiDung,
        maNhom: userDetail.maNhom,
      });
    }
  }, [userDetail, form]);

  if (!userDetail || userDetail.length === 0) {
    return <div>Loading...</div>;
  }

  const fetchData = async (data) => {
    try {
      const response = await capNhatThongTinNguoiDung(data);
      console.log("response.data.content: ", response.data.content);
      userDetailLocalStorage.set(response.data.content);
      message.success("Cập nhật thành công");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      message.error(error.response.data.content);
      console.log(error);
    }
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    fetchData(values);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container'>
      <div className="text-center py-5">
        <span className='px-5 py-2 text-3xl my-5 mx-auto font-semibold text-center'>Your Profile</span>
        <img
          src={`https://i.pravatar.cc/150?u=${userDetail.hoTen}`}
          className='rounded-full m-auto mt-5'
          alt=''
        />
      </div>
      <div className=' w-1/2 mx-auto'>
        <table className='table p-5 text-left rounded-2xl overflow-hidden'>
          <tbody>
            <tr>
              <th className='p-1 pr-4'>Account</th>
              <td>{userDetail.taiKhoan}</td>
            </tr>
            <tr>
              <th className='p-1 pr-4'>Password</th>
              <td>{userDetail.matKhau}</td>
            </tr>
            <tr>
              <th className='p-1 pr-4'>Phone Number</th>
              <td>{userDetail.soDT}</td>
            </tr>
            <tr>
              <th className='p-1 pr-4'>Fullname</th>
              <td>{userDetail.hoTen}</td>
            </tr>
            <tr>
              <th className='p-1 pr-4'>Email</th>
              <td>{userDetail.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center m-10">
          <button className='btnGlobal' onClick={showModal}>
            Update
          </button>
        </div>
      </div>
      <Modal title="updateInfo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='p-10 mb-20 border bg-white rounded-2xl text-center'>
          <Form
            theme={'dark'}
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
              maxWidth: 1000,
            }}
            scrollToFirstError
          >
            <Form.Item name="taiKhoan"
              label="Account Name"
              rules={[
                {
                  required: true,
                  message: 'Insert your account',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="matKhau"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Insert your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="soDT"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Insert Your Phone Number!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="maNhom"
              label="Group Code"
              className='d-none'
              rules={[
                {
                  required: true,
                  message: 'Insert Group Code!',
                  whitespace: true,
                },
              ]}>
              <Input disabled={true} placeholder={userDetail.maNhom} />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung"
              label="User Type"
              className='d-none'
              rules={[
                {
                  required: true,
                  message: 'Insert User Type!',
                  whitespace: true,
                },
              ]}>
              <Input disabled={true} placeholder={userDetail.maLoaiNguoiDung} />
            </Form.Item>
            <Form.Item name="hoTen"
              label="Fullname"
              rules={[
                {
                  required: true,
                  message: 'Insert Your Fullname!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <button className='btnGlobal' htmlType="submit">
              Update
            </button>
          </Form>
        </div>
      </Modal>
    </div>

  );
};