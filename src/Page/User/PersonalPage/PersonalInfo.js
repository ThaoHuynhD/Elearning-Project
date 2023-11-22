import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { capNhatThongTinNguoiDung } from '../../../Services/api';
import { userDetailLocalStorage } from '../../../Services/localServices';


export default function PersonalInfo({ userDetail }) {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 8,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 48,
      },
      sm: {
        span: 24,
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
      userDetailLocalStorage.set(response.data.content);
      message.success("Update Your Infomation Successfully");
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
    <div className=' bg-purple-100 border shadow-lg rounded-lg my-10'>
      <div className="text-center py-5">
        <span className='px-5 py-2 text-3xl my-5 mx-auto font-semibold text-center'>Your Profile</span>
        <img
          src={`https://i.pravatar.cc/150?u=${userDetail.hoTen}`}
          className='rounded-full m-auto mt-5'
          alt={userDetail.hoTen}
        />
        <div className='lg:p-5'>
          <table className='table p-5 text-left mx-auto rounded-2xl overflow-hidden'>
            <tbody>
              <tr>
                <th className='p-1 pr-4'>Account</th>
                <td>{userDetail.taiKhoan}</td>
              </tr>
              <tr>
                <th className='p-1 pr-4'>Password</th>
                <td>{userDetail.matKhau.toString().replace(/./g, '*')}</td>
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
        </div>
      </div>
      <div className="text-center lg:m-10 m-5">
        <button className='btnGlobal' onClick={showModal}>
          Update
        </button>
      </div>
      <Modal
        className='bg-white rounded-2xl text-center overflow-hidden pb-0 lg:max-w-4xl min-w-max lg:min-w-fit'
        // style={{ minWidth: "95%" }}
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h1 className='lg:text-3xl text-xl font-bold pt-5'>Update User Infomation</h1>
        <Form
          theme={'dark'}
          {...formItemLayout}
          form={form}
          name="register"
          className='lg:p-16 p-4 m-auto'
          onFinish={onFinish}
          style={{
            maxWidth: 800,
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
          <button className='btnGlobal w-40 mt-5' htmlType="submit">
            Update
          </button>
        </Form>
      </Modal>
    </div>

  );
};