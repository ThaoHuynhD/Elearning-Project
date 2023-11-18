import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { localServices } from "../../../../Services/localServices";
import { Button, DatePicker, Form, Image, Input, Select, message } from "antd";
import { useSelector } from "react-redux";
import { capNhatKhoaHocUpload } from "../../../../Services/api";

export default function FormEdit({ setIsModalEditOpen, fetchDataCourseList }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [form] = Form.useForm();
  let { infoCourse } = useSelector((state) => state.popupEditModal);
  useEffect(() => {
    if (infoCourse) {
      form.setFieldsValue({
        maKhoaHoc: infoCourse.maKhoaHoc,
        biDanh: infoCourse.biDanh,
        danhGia: 0,
        tenKhoaHoc: infoCourse.tenKhoaHoc,
        luotXem: infoCourse.luotXem,
        maDanhMucKhoaHoc: infoCourse.danhMucKhoaHoc.maDanhMucKhoahoc,
        nguoiTao: infoCourse.nguoiTao.hoTen,
        ngayTao: dayjs(infoCourse.ngayTao, "DD/MM/YYYY"),
        maNhom: infoCourse.maNhom,
        hinhAnh: infoCourse.hinhAnh,
        moTa: infoCourse.moTa,
        taiKhoanNguoiTao: infoCourse.nguoiTao.taiKhoan,
      });
    }
  }, [form, infoCourse]);
  const onFinish = async (values) => {
    const formData = new FormData();
    for (let key in values) {
      if (key !== "hinhAnh" && key !== "ngayTao") {
        formData.append(key, values[key]);
      }
    }
    formData.append("ngayTao", dayjs(values.ngayTao).format("DD/MM/YYYY"));
    if (selectedImg) {
      formData.append("hinhAnh", selectedImg, selectedImg.name);
    }
    try {
      await capNhatKhoaHocUpload(formData);
      message.success("Cập nhật khoá học thành công");
      fetchDataCourseList();
      setIsModalEditOpen(false);
    } catch (err) {
      message.error("Đã có lỗi xảy ra...");
    }
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    console.log("🚀 ~ file: FormAdd.js:28 ~ handleChangeFile ~ file:", file);
    setSelectedImg(file);
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
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      taiKhoanNguoiTao: localServices?.get().taiKhoan,
    });
  }, [form]);
  return (
    <>
      <Form
        form={form}
        name='FormAddCourse'
        onFinish={onFinish}
        layout='horizontal'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          maDanhMucKhoaHoc: "Chọn khoá học",
          maNhom: "GP09",
        }}
      >
        <Form.Item
          label='Tài khoản người tạo'
          name='taiKhoanNguoiTao'
          className='hidden'
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Mã khoá học'
          name='maKhoaHoc'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã khoá học",
              whitespace: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label='Bí danh'
          name='biDanh'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập bí danh",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Đánh giá'
          name='danhGia'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đánh giá",
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Tên khoá học'
          name='tenKhoaHoc'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên khoá học",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Lượt xem'
          name='luotXem'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lượt xem",
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Danh mục khoá học'
          name='maDanhMucKhoaHoc'
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục khoá học",
              whitespace: true,
            },
          ]}
        >
          <Select
            options={[
              {
                value: "BackEnd",
                label: "BackEnd",
              },
              {
                value: "Design",
                label: "Design",
              },
              {
                value: "DiDong",
                label: "DiDong",
              },
              {
                value: "FrontEnd",
                label: "FrontEnd",
              },
              {
                value: "FullStack",
                label: "FullStack",
              },
              {
                value: "TuDuy",
                label: "TuDuy",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label='Người tạo'
          name='nguoiTao'
          rules={[
            {
              required: true,
              message: "Vui lòng không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Mô tả'
          name='moTa'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
              whitespace: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label='Ngày tạo'
          name='ngayTao'
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày tạo",
            },
          ]}
        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          label='Mã nhóm'
          name='maNhom'
          rules={[
            {
              required: true,
              message: "Vui lòng chọn mã nhóm",
              whitespace: true,
            },
          ]}
        >
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "GP01",
                label: "GP01",
              },
              {
                value: "GP02",
                label: "GP02",
              },
              {
                value: "GP03",
                label: "GP03",
              },
              {
                value: "GP04",
                label: "GP04",
              },
              {
                value: "GP05",
                label: "GP05",
              },
              {
                value: "GP06",
                label: "GP06",
              },
              {
                value: "GP07",
                label: "GP07",
              },
              {
                value: "GP08",
                label: "GP08",
              },
              {
                value: "GP09",
                label: "GP09",
              },
              {
                value: "GP10",
                label: "GP10",
              },
              {
                value: "GP11",
                label: "GP11",
              },
              {
                value: "GP12",
                label: "GP12",
              },
              {
                value: "GP13",
                label: "GP13",
              },
              {
                value: "GP14",
                label: "GP14",
              },
              {
                value: "GP15",
                label: "GP15",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label='Hình ảnh'
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình ảnh",
              whitespace: true,
            },
          ]}
        >
          <input
            type='file'
            onChange={handleChangeFile}
            accept='image/png , image/jpeg , image/jpg'
          />
          <Image
            src={imgSrc === null ? infoCourse.hinhAnh : imgSrc}
            width={100}
            height={100}
          />
        </Form.Item>
        <div className='flex justify-end'>
          <Button
            className='bg-green-500 hover:bg-green-600 duration-300 text-white'
            htmlType='submit'
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </>
  );
}
