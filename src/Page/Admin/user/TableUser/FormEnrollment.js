import { Divider, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ghiDanhKhoaHoc,
  huyGhiDanh,
  layDanhSachKhoaHocChoXetDuyet,
  layDanhSachKhoaHocChuaGhiDanh,
  layDanhSachKhoaHocDaXetDuyet,
} from "../../../../Services/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  setListKhoaHocChoXetDuyet,
  setListKhoaHocChuaGhiDanh,
  setListKhoaHocDaXacThuc,
} from "../../../../Redux/formEnrollSlice/formEnrollSlice";

export default function FormEnrollment() {
  const columnsKhoaHocChoXacThuc = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Xác nhận",
      render: (_, record) => {
        return (
          <div className='space-x-4'>
            <button
              onClick={() => {
                handleGhiDanhKhoaHoc(record.maKhoaHoc);
              }}
              className='px-2 py-1 bg-green-500 rounded hover:scale-105 duration-500'
            >
              <CheckOutlined className='text-white font-bold text-xl' />
            </button>
            <button
              onClick={() => {
                handleCancelCourse(
                  record.maKhoaHoc,
                  layDanhSachKhoaHocChoXetDuyet,
                  setListKhoaHocChoXetDuyet,
                );
              }}
              className='px-2 py-1 bg-red-500 rounded hover:scale-105 duration-500'
            >
              <CloseOutlined className='text-white font-bold text-xl' />
            </button>
          </div>
        );
      },
    },
  ];
  const columnsKhoaHocDaXacThuc = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Xác nhận",
      render: (_, record) => {
        return (
          <div className='space-x-4'>
            <button
              onClick={() => {
                handleCancelCourse(
                  record.maKhoaHoc,
                  layDanhSachKhoaHocDaXetDuyet,
                  setListKhoaHocDaXacThuc,
                );
              }}
              className='px-2 py-1 bg-red-500 rounded hover:scale-105 duration-500'
            >
              <CloseOutlined className='text-white font-bold text-xl' />
            </button>
          </div>
        );
      },
    },
  ];
  const {
    listKhoaHocChuaGhiDanh,
    listKhoaHocChoXetDuyet,
    listKhoaHocDaXacThuc,
    taiKhoan,
  } = useSelector((state) => state.formEnrollSlice);
  const [maKhoaHoc, setMaKhoaHoc] = useState(null);
  const dispatch = useDispatch();
  const dataSource = [];
  const dataSource1 = [];

  useEffect(() => {
    let danhSachKhoaHocChuaGhiDanh = async () => {
      try {
        let res = await layDanhSachKhoaHocChuaGhiDanh(taiKhoan);
        dispatch(setListKhoaHocChuaGhiDanh(res.data));
      } catch (err) {
        message.error("Đã có lỗi xảy ra...");
      }
    };
    let danhSachKhoaHocChoXetDuyet = async () => {
      try {
        let res = await layDanhSachKhoaHocChoXetDuyet({
          taiKhoan: taiKhoan,
        });
        dispatch(setListKhoaHocChoXetDuyet(res.data));
      } catch (err) {
        message.error("Đã có lỗi xảy ra...");
      }
    };
    let danhSachKhoaHocDaXetDuyet = async () => {
      try {
        let res = await layDanhSachKhoaHocDaXetDuyet({
          taiKhoan: taiKhoan,
        });
        dispatch(setListKhoaHocDaXacThuc(res.data));
      } catch (err) {
        console.log("Đã có lỗi xảy ra...");
      }
    };
    danhSachKhoaHocDaXetDuyet();
    danhSachKhoaHocChuaGhiDanh();
    danhSachKhoaHocChoXetDuyet();
  }, [dispatch, taiKhoan]);

  if (listKhoaHocChoXetDuyet.length > 0) {
    listKhoaHocChoXetDuyet?.map((item, index) =>
      dataSource.push({
        key: index,
        stt: index + 1,
        ...item,
      }),
    );
  }
  if (listKhoaHocDaXacThuc.length > 0) {
    listKhoaHocDaXacThuc?.map((item, index) =>
      dataSource1.push({
        key: index,
        stt: index + 1,
        ...item,
      }),
    );
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setMaKhoaHoc(value);
  };
  let renderListKhoaHocChuaGhiDanh = () => {
    return listKhoaHocChuaGhiDanh?.map((item) => {
      return {
        value: item.maKhoaHoc,
        label: item.tenKhoaHoc,
      };
    });
  };
  const handleCourseEnrollmentSelected = () => {
    let handleGhiDanhKhoaHoc = async () => {
      try {
        await ghiDanhKhoaHoc({
          maKhoaHoc: maKhoaHoc,
          taiKhoan: taiKhoan,
        });
        message.success("Ghi danh thành công");
        setMaKhoaHoc(null);
        let res = await layDanhSachKhoaHocDaXetDuyet({
          taiKhoan: taiKhoan,
        });
        dispatch(setListKhoaHocDaXacThuc(res.data));
      } catch (err) {
        message.error(err.response.data);
      }
    };
    handleGhiDanhKhoaHoc();
  };

  let handleGhiDanhKhoaHoc = async (maKhoaHoc) => {
    try {
      await ghiDanhKhoaHoc({
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      });
      message.success("Ghi danh thành công");
      let res = await layDanhSachKhoaHocChoXetDuyet({
        taiKhoan: taiKhoan,
      });
      dispatch(setListKhoaHocChoXetDuyet(res.data));
      let res1 = await layDanhSachKhoaHocDaXetDuyet({
        taiKhoan: taiKhoan,
      });
      dispatch(setListKhoaHocDaXacThuc(res1.data));
    } catch (err) {
      message.error(err.response.data);
    }
  };

  let handleCancelCourse = async (maKhoaHoc, danhSach, setList) => {
    try {
      await huyGhiDanh({
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      });
      message.success("Huỷ ghi danh thành công");
      let res = await danhSach({
        taiKhoan: taiKhoan,
      });
      dispatch(setList(res.data));
    } catch (err) {
      message.error(err.response.data);
    }
  };
  return (
    <>
      <div className='flex flex-col justify-between'>
        <h1 className='text-3xl font-bold text-center'>Ghi danh khoá học</h1>
        <div className='flex items-center w-full'>
          <Select
            defaultValue='Chọn khoá học'
            style={{
              width: "80%",
            }}
            onChange={handleChange}
            value={{
              label:
                maKhoaHoc === null ? "Chọn khoá học" : maKhoaHoc.tenKhoaHoc,
              value: maKhoaHoc,
            }}
            options={renderListKhoaHocChuaGhiDanh()}
          />
          <button
            onClick={() => {
              handleCourseEnrollmentSelected();
            }}
            className='px-4 py-2 ml-4 bg-green-500 hover:bg-green-600 text-white rounded duration-300 w-[20%]'
          >
            Ghi danh
          </button>
        </div>
        <Divider className='h-[2px] bg-slate-600' />
        <div
          className={`${
            listKhoaHocChoXetDuyet.length > 0 ? "block" : "hidden"
          }`}
        >
          <h1 className='text-xl italic'>Khoá học chờ xác thực :</h1>
          <Table dataSource={dataSource} columns={columnsKhoaHocChoXacThuc} />
        </div>
        <div
          className={`${listKhoaHocDaXacThuc.length > 0 ? "block" : "hidden"}`}
        >
          <h1 className='text-xl italic'>Khoá học đã xác thực :</h1>
          <Table dataSource={dataSource1} columns={columnsKhoaHocDaXacThuc} />
        </div>
      </div>
    </>
  );
}
