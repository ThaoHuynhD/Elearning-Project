import React from "react";
import { Formik, Field, Form } from "formik";
import { themNguoiDung } from "../../../../Services/api";

const AddUser = () => {
  return (
    <div className='add-user-container flex justify-center items-center h-screen'>
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
              console.log("User added successfully:", response);
              // Handle success (e.g., show success message, navigate to another page, etc.)
            })
            .catch((error) => {
              console.error("Error adding user:", error);
              // Handle error (e.g., show error message)
            })
            .finally(() => {
              setSubmitting(false); // Finish the submitting state
              resetForm(); // Optionally reset the form to initial values
            });
        }}>
          
        {({ isSubmitting }) => (
          <Form className='add-user-form w-full max-w-xl'>
            <h3 className='form-title text-center text-lg font-bold '>
              Thêm người dùng mới
            </h3>
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
                className='submit-button bg-blue-400 text-white' disabled={isSubmitting}>
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

// import React, { useState } from "react";
// import { Button, Form, Input, Radio, Select } from "antd";
// import { useFormik } from "formik";

// const AddUser = () => {
//   const [componentSize, setComponentSize] = useState("default");
//   const onFormLayoutChange = ({ size }) => {
//     setComponentSize(size);
//   };

//   const formik = useFormik({
//     initialValues: {
//       taiKhoan: "",
//       matKhau: "",
//       hoTen: "",
//       soDT: "",
//       maLoaiNguoiDung: "",
//       maNhom: "",
//       email: "",
//     },
//     onSubmit: (values) => {
//       console.log("values:", values);
//     },
//   });

//   return (
//     <div className='flex justify-center items-center h-screen'>
//       <Form
//         onSubmitCapture={formik.handleSubmit}
//         labelCol={{
//           span: 6,
//         }}
//         wrapperCol={{
//           span: 18,
//         }}
//         layout='horizontal'
//         initialValues={{
//           size: componentSize,
//         }}
//         onValuesChange={onFormLayoutChange}
//         size={componentSize}
//         style={{
//           maxWidth: 900,
//         }}
//         className='w-full max-w-xl'>
//         <h3 className='text-center text-lg font-bold '>Thêm người dùng mới</h3>
//         <Form.Item
//           label='Form Size'
//           name='size'>
//           <Radio.Group>
//             <Radio.Button value='small'>Small</Radio.Button>
//             <Radio.Button value='default'>Default</Radio.Button>
//             <Radio.Button value='large'>Large</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label='Tài khoản'>
//           <Input
//             name='taiKhoan'
//             onChange={formik.handleChange}
//           />
//         </Form.Item>
//         <Form.Item label='Mật khẩu'>
//           <Input
//             name='matKhau'
//             onChange={formik.handleChange}
//           />
//         </Form.Item>
//         <Form.Item label='Họ tên'>
//           <Input
//             name='hoTen'
//             onChange={formik.handleChange}
//           />
//         </Form.Item>
//         <Form.Item label='Số điện thoại'>
//           <Input
//             name='sdt'
//             onChange={formik.handleChange}
//           />
//         </Form.Item>
//         <Form.Item
//           label='Mã loại người dùng'
//           name='maLoaiNguoiDung'>
//           <Select
//             onChange={(value) =>
//               formik.setFieldValue("maLoaiNguoiDung", value)
//             }>
//             <Select.Option value='GV'>Giáo vụ</Select.Option>
//             <Select.Option value='HV'>Học viên</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label='Mã nhóm'
//           name='maNhom'>
//           <Select onChange={(value) => formik.setFieldValue("maNhom", value)}>
//             <Select.Option value='GP00'>GP00</Select.Option>
//             <Select.Option value='GP01'>GP01</Select.Option>
//             <Select.Option value='GP02'>GP02</Select.Option>
//             <Select.Option value='GP03'>GP03</Select.Option>
//             <Select.Option value='GP04'>GP04</Select.Option>
//             <Select.Option value='GP05'>GP05</Select.Option>
//             <Select.Option value='GP06'>GP06</Select.Option>
//             <Select.Option value='GP07'>GP07</Select.Option>
//             <Select.Option value='GP08'>GP08</Select.Option>
//             <Select.Option value='GP09'>GP09</Select.Option>
//             <Select.Option value='GP010'>GP010</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label='Email'>
//           <Input name='email' />
//         </Form.Item>

//         <Form.Item label='Button'>
//           <Button
//             type='submit'
//             className='bg-blue-400 text-white'>
//             Thêm người dùng
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };
// export default AddUser;

// /*
// {
//   "taiKhoan": "string",
//   "matKhau": "string",
//   "hoTen": "string",
//   "soDT": "string",
//   "maLoaiNguoiDung": "string",
//   "maNhom": "string",
//   "email": "string"
// }
// */
