import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { setInfo } from "../../../Redux/userSlice/userSlice";
import { dangNhap } from "../../../Services/api";
import { message } from "antd";
import { localServices } from "../../../Services/localServices";
import { useNavigate } from "react-router";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("🚀 ~ file: SignInPage.js:11 ~ handleSubmit ~ values:", values);
    let logIn = async () => {
      try {
        let res = await dangNhap(values);
        dispatch(setInfo(res.data));
        localServices.set(res.data);
        message.success("Đăng nhập thành công");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } catch (err) {
        message.error(err.response.data);
      }
    };
    logIn();
  };
  return (
    <div className='w-1/2 mx-auto'>
      <h1 className='text-center'>Đăng nhập</h1>
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form>
            <div className='form-group'>
              <label htmlFor='taiKhoan'>Tài khoản</label>
              <Field
                name='taiKhoan'
                onChange={handleChange}
                type='text'
                className='form-control'
              />
              <ErrorMessage name='taiKhoan' />
            </div>
            <div className='form-group'>
              <label htmlFor='matKhau'>Mật khẩu</label>
              <Field
                name='matKhau'
                onChange={handleChange}
                type='password'
                className='form-control'
              />
              <ErrorMessage name='matKhau' />
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='bg-green-600 text-white rounded py-2 px-4'
              >
                Đăng nhập
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}