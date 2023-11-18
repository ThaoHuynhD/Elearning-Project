import { https } from "./config";

/*********************** QUẢN LÝ KHOÁ HỌC ******************************/
export let layDanhSachKhoaHoc = () => {
  return https.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP09");
};
//api tìm kiếm khoá học
export let layDanhSachKhoaHocTheoTen = (tenKhoaHoc) => {
  return https.get(
    `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP09`,
  );
};
export let layDanhMucKhoaHoc = () => {
  return https.get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
};
export let layKhoaHocTheoDanhMuc = (maDanhMuc) => {
  return https.get(
    `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP09`,
  );
};
export let layDanhSachKhoaHoc_PhanTrang = (number) => {
  return https.get(
    `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${number}&pageSize=9&MaNhom=GP09`,
  );
};
export let layThongTinKhoaHoc = (maKhoaHoc) => {
  return https.get(
    `/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
  );
};
export let dangKyKhoaHoc = (data) => {
  return https.post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", data)
}
export let ghiDanhKhoaHoc = (data) => {
  return https.post("/api/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
};
export let huyGhiDanh = (data) => {
  return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
};
export let themKhoaHocUploadHinh = (data) => {
  return https.post("/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", data);
};

/*********************** QUẢN LÝ NGƯỜI DÙNG ******************************/

export let dangNhap = (data) => {
  return https.post("/api/QuanLyNguoiDung/DangNhap", data);
};
export let dangKy = (data) => {
  return https.post("/api/QuanLyNguoiDung/DangKy", data);
};
//lấy thông tin người dùng
export let thongTinNguoiDung = () => {
  return https.post("/api/QuanLyNguoiDung/ThongTinNguoiDung");
};
//lấy thông tin tài khoản
export let thongTinTaiKhoan = () => {
  return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
};
export let capNhatThongTinNguoiDung = (data) => {
  return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
};
export let layDanhSachNguoiDung = () => {
  return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09");
};
export let timKiemNguoiDung = (taiKhoan) => {
  return https.get("/api/QuanLyNguoiDung/TimKiemNguoiDung", {
    params: {
      MaNhom: "GP09",
      tuKhoa: taiKhoan
    }
  });
};
export let themNguoiDung = (data) => {
  return https.post("/api/QuanLyNguoiDung/ThemNguoiDung", data);
};
export let xoaNguoiDung = (taiKhoan) => {
  return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
};