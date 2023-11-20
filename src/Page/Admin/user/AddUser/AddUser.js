import React from "react";
import { Formik, Field, Form } from "formik";
import { themNguoiDung } from "../../../../Services/api";

const AddUser = () => {
  return (
    <div className='admin-center-container'>
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
          themNguoiDung(values)
            .then((response) => {
              alert("Đã thêm người dùng thành công");
              resetForm();
            })
            .catch((error) => {
              alert("Error adding user:", error.message);
            })
            .finally(() => {
              setSubmitting(false);
              resetForm();
            });
        }}>
        {({ isSubmitting }) => (
          <Form className='add-form'>
            <h3 className='add-form-title '>Thêm người dùng mới</h3>
            <div className='add-form-group'>
              <label htmlFor='taiKhoan'>Tài khoản</label>
              <Field
                name='taiKhoan'
                type='text'
                className='add-input'
              />
            </div>
            <div className='add-form-group'>
              <label htmlFor='matKhau'>Mật khẩu</label>
              <Field
                name='matKhau'
                type='password'
                className='add-input'
              />
            </div>
            <div className='add-form-group'>
              <label htmlFor='hoTen'>Họ tên</label>
              <Field
                name='hoTen'
                type='text'
                className='add-input'
              />
            </div>
            <div className='add-form-group'>
              <label htmlFor='soDT'>Số điện thoại</label>
              <Field
                name='soDT'
                type='text'
                className='add-input'
              />
            </div>
            <div className='add-form-group'>
              <label htmlFor='maLoaiNguoiDung'>Mã loại người dùng</label>
              <Field
                as='select'
                name='maLoaiNguoiDung'
                className='add-input'>
                <option value=''>Chọn loại người dùng</option>
                <option value='GV'>Giáo vụ</option>
                <option value='HV'>Học viên</option>
              </Field>
            </div>
            <div className='add-form-group'>
              <label htmlFor='maNhom'>Mã nhóm</label>
              <Field
                as='select'
                name='maNhom'
                className='add-input'>
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
            <div className='add-form-group'>
              <label htmlFor='email'>Email</label>
              <Field
                name='email'
                type='email'
                className='add-input'
              />
            </div>
            <div className='add-form-group'>
              <button
                type='submit'
                className='add-submit-button bg-blue-400 text-white'
                disabled={isSubmitting}>
                Thêm người dùng
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser;
