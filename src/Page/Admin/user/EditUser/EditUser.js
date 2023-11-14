import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { thongTinNguoiDung } from "../../../../Services/api";
import { useParams } from "react-router";

const EditUser = () => {
    // extract taiKhoan param from URL
    const {taiKhoan} = useParams();
    const [initialValues, setInitialValues] = useState({
        
    })



  return (
    <div className='edit-user-container flex justify-center items-center h-screen'>
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
          hoTen: "",
          soDT: "",
          maLoaiNguoiDung: "",
          maNhom: "",
          email: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          thongTinNguoiDung(values)
            .then((response) => {
              console.log("User added successfully:", response);
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            })
            .finally(() => {
              setSubmitting(false); // Finish the submitting state
              resetForm(); // Optionally reset the form to initial values
            });
        }}>
        {({ isSubmitting }) => (
          <Form className='add-user-form w-full max-w-xl'>
            <h3 className='form-title text-center text-lg font-bold '>
              Thông tin người dùng
            </h3>
            <div className='form-group'>
              <label htmlFor='khoaHoc'>Khóa học ghi danh</label>
              <Field
                name='chiTietKhoaHocGhiDanh'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='taiKhoan'>Tài khoản</label>
              <Field
                name='taiKhoan'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='matKhau'>Mật khẩu</label>
              <Field
                name='matKhau'
                type='password'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='hoTen'>Họ tên</label>
              <Field
                name='hoTen'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='soDT'>Số điện thoại</label>
              <Field
                name='soDT'
                type='text'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='maLoaiNguoiDung'>Mã loại người dùng</label>
              <Field
                as='select'
                name='maLoaiNguoiDung'>
                <option value=''>Chọn loại người dùng</option>
                <option value='GV'>Giáo vụ</option>
                <option value='HV'>Học viên</option>
              </Field>
            </div>
            <div className='form-group'>
              <label htmlFor='maNhom'>Mã nhóm</label>
              <Field
                as='select'
                name='maNhom'>
                <option value=''>Chọn mã nhóm</option>
                <option value='GP00'>GP00</option>
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
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Field
                name='email'
                type='email'
              />
            </div>
            <div className='form-group'>
              <button
                type='submit'
                className='submit-button bg-blue-400 text-white'
                disabled={isSubmitting}>
                Lưu lại
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;

/*
{
  "chiTietKhoaHocGhiDanh": [],
  "taiKhoan": "DuyAdmin22",
  "matKhau": "123123",
  "hoTen": "DuyNguyen",
  "soDT": "01234567689",
  "maLoaiNguoiDung": "GV",
  "maNhom": "GP09",
  "email": "duyN@gmail.com\n"
}
*/