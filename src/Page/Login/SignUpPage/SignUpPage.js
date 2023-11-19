import React from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { dangKy } from "../../../Services/api";
import { message } from "antd";

const signupUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("Tài khoản không được bỏ trống!"),
  hoTen: yup.string().required("Họ và tên không được bỏ trống!"),
  matKhau: yup.string().required("Mật khẩu không được bỏ trống!"),
  email: yup
    .string()
    .required("email không được bỏ trống!")
    .email("email không hợp lệ!"),
  soDT: yup
    .string()
    .required("Số điện thoại không được bỏ trống!")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ!"),
  maNhom: yup.string().required("Mã nhóm không được bỏ trống!"),
});

export default function SignUpPage() {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    let fetchDataUserRegister = async () => {
      try {
        let res = await dangKy(values);
        console.log(
          "🚀 ~ file: SignUpPage.js:28 ~ fetchDataUserRegister ~ res:",
          res,
        );
        message.success("Đăng ký thành công");
      } catch (err) {
        console.log(
          "🚀 ~ file: SignUpPage.js:34 ~ fetchDataUserRegister ~ err:",
          err,
        );
        message.error(err.response.data);
      }
    };
    fetchDataUserRegister();
  };
  return (
    <div className="page-container">
      <div className='sign-up-container w-1/2 mx-auto'>
        <h1 className='text-center'>Đăng ký</h1>
        <Formik
          initialValues={{
            taiKhoan: "",
            hoTen: "",
            matKhau: "",
            email: "",
            soDT: "",
            maNhom: "",
          }}
          validationSchema={signupUserSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <div className='form-group'>
                <label htmlFor='taiKhoan'>Tài khoản</label>
                <Field
                  name='taiKhoan'
                  type='text'
                  className='form-control'
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name='taiKhoan' />
              </div>
              <div className='form-group'>
                <label htmlFor='hoTen'>Họ tên</label>
                <Field
                  name='hoTen'
                  type='text'
                  className='form-control'
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name='hoTen' />
              </div>
              <div className='form-group'>
                <label htmlFor='matKhau'>Mật khẩu</label>
                <Field
                  name='matKhau'
                  type='password'
                  className='form-control'
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name='matKhau' />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <Field
                  name='email'
                  type='email'
                  className='form-control'
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name='email' />
              </div>
              <div className='form-group'>
                <label htmlFor='soDT'>Số điện thoại</label>
                <Field
                  name='soDT'
                  type='text'
                  className='form-control'
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name='soDT'>
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className='form-group'>
                <label htmlFor='maNhom'>Mã nhóm</label>
                <Field
                  as='select'
                  name='maNhom'
                  className='form-control'
                  onChange={formikProps.handleChange}
                >
                  <option value='GP01'>GP01</option>
                  <option value='GP02'>GP02</option>
                  <option value='GP03'>GP03</option>
                  <option value='GP04'>GP04</option>
                  <option value='GP05'>GP05</option>
                  <option value='GP06'>GP06</option>
                  <option value='GP07'>GP07</option>
                  <option value='GP08'>GP08</option>
                  <option value='GP09'>GP09</option>
                  <option value='GP010'>GP010</option>
                </Field>
                <ErrorMessage name='maNhom' />
              </div>
              <div className='text-center'>
                <button
                  type='submit'
                  className='dang-ky-button bg-green-600 text-white rounded py-2 px-4'
                >
                  Đăng ký
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}