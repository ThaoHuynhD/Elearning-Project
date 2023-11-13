import React, { useEffect } from "react";
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
import {
  capNhatKhoaHocUpload,
  themKhoaHocUploadHinh,
} from "../../../../../Services/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../../../../../Redux/modalFormSlice/modalFormSlice";
import dayjs from "dayjs";
import * as Yup from "yup";

export default function FormAddCourse() {
  const [imgSrc, setImgSrc] = useState(" ");
  const [form] = Form.useForm();
  let { infoCourse, isChecked } = useSelector((state) => state.modalFormSlice);

  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    maKhoaHoc: Yup.string().required("Mã khóa học không được bỏ trống"),
    biDanh: Yup.string().required("Bí danh không được bỏ trống"),
    tenKhoaHoc: Yup.string().required("Tên khoá học không được bỏ trống"),
    moTa: Yup.string().required("Mô tả không được bỏ trống"),
    luotXem: Yup.string().required("Lượt xem không được bỏ trống"),
    danhGia: Yup.string().required("Lượt xem không được bỏ trống"),
    maNhom: Yup.string().required("Mã nhóm không được bỏ trống"),
    ngayTao: Yup.string().required("Ngày tạo không được bỏ trống"),
    nguoiTao: Yup.string().required("Vui lòng không được bỏ trống"),
    maDanhMucKhoaHoc: Yup.string().required("Vui lòng không được bỏ trống"),
  });

  const formik = useFormik({
    initialValues: {
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
      taiKhoanNguoiTao: localServices?.get().taiKhoan,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      if (isChecked) {
        let handleAddCourse = async () => {
          try {
            let res = await themKhoaHocUploadHinh(formData);
            if (res.status === 200) {
              dispatch(setIsModalOpen(false));
              message.success("Thêm khoá học thành công");
              handleClearForm();
            }
          } catch (err) {
            message.error(err.response?.data);
          }
        };
        handleAddCourse();
      } else {
        let handleUpdate = async () => {
          try {
            let res = await capNhatKhoaHocUpload(formData);
            if (res.status === 200) {
              dispatch(setIsModalOpen(false));
              message.success("Cập nhật khoá học thành công");
              handleClearForm();
            }
          } catch (err) {
            message.error(err.response?.data);
          }
        };
        handleUpdate();
      }
    },
  });
  useEffect(() => {
    if (isChecked === false) {
      formik.setValues({
        maKhoaHoc: infoCourse?.maKhoaHoc,
        biDanh: infoCourse?.biDanh,
        tenKhoaHoc: infoCourse?.tenKhoaHoc,
        moTa: infoCourse?.moTa,
        luotXem: infoCourse?.luotXem,
        danhGia: 0,
        hinhAnh: null,
        maNhom: infoCourse?.maNhom,
        ngayTao: infoCourse?.ngayTao,
        nguoiTao: infoCourse.nguoiTao?.hoTen,
        maDanhMucKhoaHoc: infoCourse?.danhMucKhoaHoc?.maDanhMucKhoahoc,
        taiKhoanNguoiTao: infoCourse.nguoiTao?.taiKhoan,
      });
    }
  }, [isChecked, infoCourse]);

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

  let handleChangeDatePicker = (date) => {
    let ngayTao = dayjs(date).format("DD/MM/YYYY");
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
          disabled={isChecked ? false : true}
          onChange={formik.handleChange}
          value={formik.values.maKhoaHoc}
          onBlur={formik.handleBlur}
        />
        {formik.touched.maKhoaHoc && formik.errors.maKhoaHoc ? (
          <div className='text-red-500'>{formik.errors.maKhoaHoc}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Bí danh'>
        <Input
          name='biDanh'
          onChange={formik.handleChange}
          value={formik.values.biDanh}
          onBlur={formik.handleBlur}
        />
        {formik.touched.biDanh && formik.errors.biDanh ? (
          <div className='text-red-500'>{formik.errors.biDanh}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Đánh giá'>
        <InputNumber
          name='danhGia'
          type='number'
          min={1}
          max={10}
          defaultValue={3}
          onBlur={formik.handleBlur}
          onChange={(value) => {
            formik.setFieldValue("danhGia", value);
          }}
        />
        {formik.touched.danhGia && formik.errors.danhGia ? (
          <div className='text-red-500'>{formik.errors.danhGia}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Tên khoá học'>
        <Input
          name='tenKhoaHoc'
          onChange={formik.handleChange}
          value={formik.values.tenKhoaHoc}
          onBlur={formik.handleBlur}
        />
        {formik.touched.tenKhoaHoc && formik.errors.tenKhoaHoc ? (
          <div className='text-red-500'>{formik.errors.tenKhoaHoc}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Lượt xem'>
        <InputNumber
          type='number'
          min={0}
          onChange={(value) => {
            formik.setFieldValue("luotXem", value);
          }}
          value={formik.values.luotXem}
          onBlur={formik.handleBlur}
        />
        {formik.touched.luotXem && formik.errors.luotXem ? (
          <div className='text-red-500'>{formik.errors.luotXem}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Danh mục khoá học'>
        <Select
          onChange={handleChangeListCourse}
          defaultValue={" "}
          value={formik.values.maDanhMucKhoaHoc}
          onBlur={formik.handleBlur}
        >
          <Select.Option value='BackEnd'>BackEnd</Select.Option>
          <Select.Option value='Design'>Design</Select.Option>
          <Select.Option value='DiDong'>DiDong</Select.Option>
          <Select.Option value='FrontEnd'>FrontEnd</Select.Option>
          <Select.Option value='FullStack'>FullStack</Select.Option>
          <Select.Option value='TuDuy'>TuDuy</Select.Option>
        </Select>
        {formik.touched.maDanhMucKhoaHoc && formik.errors.maDanhMucKhoaHoc ? (
          <div className='text-red-500'>{formik.errors.maDanhMucKhoaHoc}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Người tạo'>
        <Input
          name='nguoiTao'
          onChange={formik.handleChange}
          value={formik.values.nguoiTao}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nguoiTao && formik.errors.nguoiTao ? (
          <div className='text-red-500'>{formik.errors.nguoiTao}</div>
        ) : null}
      </Form.Item>

      <Form.Item label='Mô tả'>
        <Input.TextArea
          name='moTa'
          onChange={formik.handleChange}
          value={formik.values.moTa}
          onBlur={formik.handleBlur}
        />
        {formik.touched.moTa && formik.errors.moTa ? (
          <div className='text-red-500'>{formik.errors.moTa}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Ngày tạo'>
        <DatePicker
          allowClear={false}
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatePicker}
          value={
            isChecked ? undefined : dayjs(formik.values.ngayTao, "DD/MM/YYYY")
          }
          onBlur={formik.handleBlur}
        />
        {formik.touched.ngayTao && formik.errors.ngayTao ? (
          <div className='text-red-500'>{formik.errors.ngayTao}</div>
        ) : null}
      </Form.Item>
      <Form.Item label='Mã nhóm'>
        <Select
          style={{ width: 100 }}
          onChange={handleChangeGroup}
          value={formik.values.maNhom}
          onBlur={formik.handleBlur}
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
        {formik.touched.maNhom && formik.errors.maNhom ? (
          <div className='text-red-500'>{formik.errors.maNhom}</div>
        ) : null}
      </Form.Item>

      <Form.Item label='Hình ảnh'>
        <input
          type='file'
          onChange={handleChangeFile}
          accept='image/png , image/jpeg , image/jpg'
        />
        <Image
          src={imgSrc === " " ? infoCourse?.hinhAnh : imgSrc}
          width={100}
          height={100}
        />
      </Form.Item>

      <div className='flex items-center justify-end space-x-4'>
        <Button
          className={`bg-green-500 hover:bg-green-600 duration-300 text-white ${
            isChecked ? "block" : "hidden"
          }`}
          htmlType='submit'
        >
          Thêm
        </Button>
        <Button
          className={`bg-blue-500 hover:bg-blue-600 duration-300 text-white ${
            isChecked ? "hidden" : "block"
          }`}
          htmlType='submit'
        >
          Cập nhật
        </Button>
      </div>
    </Form>
  );
}
