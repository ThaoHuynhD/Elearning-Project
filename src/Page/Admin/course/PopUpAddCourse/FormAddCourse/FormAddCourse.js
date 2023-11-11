import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  InputNumber,
  Image,
  message,
} from "antd";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useState } from "react";
import { localServices } from "../../../../../Services/localServices";
import { themKhoaHocUploadHinh } from "../../../../../Services/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../../../../../Redux/modalFormSlice/modalFormSlice";
export default function FormAddCourse() {
  const [imgSrc, setImgSrc] = useState(" ");
  const [form] = Form.useForm();
  let { infoCourse } = useSelector((state) => state.modalFormSlice);
  console.log(
    "🚀 ~ file: FormAddCourse.js:23 ~ FormAddCourse ~ infoCourse:",
    infoCourse,
  );

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maKhoaHoc: infoCourse?.maKhoaHoc,
      biDanh: infoCourse?.biDanh,
      tenKhoaHoc: infoCourse?.tenKhoaHoc,
      moTa: infoCourse?.moTa,
      luotXem: infoCourse?.luotXem,
      danhGia: 0,
      hinhAnh: null,
      maNhom: infoCourse?.maNhom,
      // ngayTao: infoCourse?.ngayTao || " ",
      ngayTao: " ",
      nguoiTao: infoCourse.nguoiTao?.hoTen,
      maDanhMucKhoaHoc: infoCourse.danhMucKhoaHoc?.tenDanhMucKhoaHoc,
      taiKhoanNguoiTao: localServices?.get().taiKhoan,
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      let handleAddCourse = async () => {
        try {
          let res = await themKhoaHocUploadHinh(formData);
          if (res.status === 200) {
            dispatch(setIsModalOpen(false));
            message.success("Thêm khoá học thành công");
            handleClearForm();
          }
        } catch (err) {
          message.error(err.response.data);
        }
      };
      handleAddCourse();
    },
  });

  let handleClearForm = () => {
    form.setFieldsValue({
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: {},
      maNhom: "",
      ngayTao: "",
      nguoiTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    });
  };
  const handleUpdate = () => {};

  let handleChangeDatePicker = (date) => {
    let ngayTao = moment(date).format("DD/MM/YYYY");
    formik.setFieldValue("ngayTao", ngayTao);
  };
  let handleChangeListCourse = (value) => {
    formik.setFieldValue("maDanhMucKhoaHoc", value);
  };
  let handleChangeGroup = (value) => {
    formik.setFieldValue("maNhom", value);
  };
  let handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };
  return (
    <Form
      form={form}
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout='horizontal'
    >
      <Form.Item label='Mã khoá học'>
        <Input
          name='maKhoaHoc'
          onChange={formik.handleChange}
          value={formik.values.maKhoaHoc}
        />
      </Form.Item>
      <Form.Item label='Bí danh'>
        <Input
          name='biDanh'
          onChange={formik.handleChange}
          value={formik.values.biDanh}
        />
      </Form.Item>
      <Form.Item label='Đánh giá'>
        <InputNumber
          name='danhGia'
          type='number'
          min={1}
          max={10}
          defaultValue={3}
          onChange={(value) => {
            formik.setFieldValue("danhGia", value);
          }}
        />
      </Form.Item>
      <Form.Item label='Tên khoá học'>
        <Input
          name='tenKhoaHoc'
          onChange={formik.handleChange}
          value={formik.values.tenKhoaHoc}
        />
      </Form.Item>
      <Form.Item label='Lượt xem'>
        <InputNumber
          type='number'
          onChange={(value) => {
            formik.setFieldValue("luotXem", value);
          }}
          value={formik.values.luotXem}
        />
      </Form.Item>
      <Form.Item label='Danh mục khoá học'>
        <Select
          onChange={handleChangeListCourse}
          value={formik.values.maDanhMucKhoaHoc}
        >
          <Select.Option value='BackEnd'>Lập trình BackEnd</Select.Option>
          <Select.Option value='Design'>Thiết kế Web</Select.Option>
          <Select.Option value='DiDong'>Lập trình di động</Select.Option>
          <Select.Option value='FrontEnd'>Lập trình Front end</Select.Option>
          <Select.Option value='FullStack'>Lập trình Full Stack</Select.Option>
          <Select.Option value='TuDuy'>Tư duy lập trình</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label='Người tạo'>
        <Input
          name='nguoiTao'
          onChange={formik.handleChange}
          value={formik.values.nguoiTao}
        />
      </Form.Item>

      <Form.Item label='Mô tả'>
        <Input.TextArea
          name='moTa'
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label='Ngày tạo'>
        <DatePicker
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatePicker}
          // value={moment(formik.values.ngayTao, "DD/MM/YYYY")}
        />
      </Form.Item>
      <Form.Item label='Mã nhóm'>
        <Select
          style={{ width: 100 }}
          onChange={handleChangeGroup}
          value={formik.values.maNhom}
        >
          <Select.Option value='GP01'>GP01</Select.Option>
          <Select.Option value='GP02'>GP02</Select.Option>
          <Select.Option value='GP03'>GP03</Select.Option>
          <Select.Option value='GP04'>GP04</Select.Option>
          <Select.Option value='GP05'>GP05</Select.Option>
          <Select.Option value='GP06'>GP06</Select.Option>
          <Select.Option value='GP07'>GP08</Select.Option>
          <Select.Option value='GP09'>GP09</Select.Option>
          <Select.Option value='GP10'>GP10</Select.Option>
          <Select.Option value='GP11'>GP11</Select.Option>
          <Select.Option value='GP12'>GP12</Select.Option>
          <Select.Option value='GP13'>GP13</Select.Option>
          <Select.Option value='GP14'>GP14</Select.Option>
          <Select.Option value='GP15'>GP15</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label='Hình ảnh'>
        <input
          type='file'
          onChange={handleChangeFile}
          accept='image/png , image/jpeg , image/jpg'
        />
        <Image
          src={imgSrc === " " ? infoCourse.hinhAnh : imgSrc}
          width={100}
          height={100}
        />
      </Form.Item>

      <div className='flex items-center justify-end space-x-4'>
        <Button
          className='bg-green-500 hover:bg-green-600 duration-300 text-white'
          htmlType='submit'
        >
          Thêm
        </Button>

        <Button
          htmlType='submit'
          onClick={() => {
            handleUpdate();
          }}
          className='bg-pink-500 hover:bg-pink-600 duration-300 text-white'
        >
          Cập Nhật
        </Button>
      </div>
    </Form>
  );
}
