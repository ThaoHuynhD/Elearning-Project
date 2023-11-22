import { https } from "./config";

/*********************** QUẢN LÝ KHOÁ HỌC ******************************/
export let layDanhSachKhoaHoc = () => {
    return https.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP09");
};
export let layDanhSachKhoaHocTheoTen = (tenKhoaHoc) => {
    return https.get(
    `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP09`,
  );
};
export let layDanhMucKhoaHoc = () => {
    return https.get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
};
export let layKhoaHocTheoDanhMuc = (maDanhMuc) => {
    return https.get(`/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP09`);
};
export let layDanhSachKhoaHoc_PhanTrang = (number) => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${number}&pageSize=9&MaNhom=GP09`);
};
export let layThongTinKhoaHoc = (maKhoaHoc) => {
    return https.get(
    `/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
  );
};
export let layThongTinHocVienKhoaHoc = (maKhoaHoc) => {
    return https.get(`/api/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
};
export let themKhoaHoc = (data) => {
    return https.post("/api/QuanLyKhoaHoc/ThemKhoaHoc", data);
};
export let capNhatKhoaHoc = (data) => {
    return https.put("/api/QuanLyKhoaHoc/CapNhatKhoaHoc", data);
};
export let xoaKhoaHoc = (maKhoaHoc) => {
    return https.delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`);
};
export let ghiDanhKhoaHoc = (data) => {
    return https.post("/api/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
};
export let dangKyKhoaHoc = (data) => {
    return https.post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", data);
};
export let huyGhiDanh = (data) => {
    return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
};
export let themKhoaHocUploadHinh = (data) => {
    return https.post("/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", data);
};
export let capNhatKhoaHocUpload = (formdata) => {
    return https.post("/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload", formdata);
};


export let layDanhSachNguoiDungChuaGhiDanh = (maKhoaHoc) => {
    return https.post(`/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`, { "maKhoaHoc": maKhoaHoc });
};
export let layDanhSachHocVienChoXetDuyet = (maKhoaHoc) => {
    return https.post(`/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, { "maKhoaHoc": maKhoaHoc });
};
export let layDanhSachHocVienKhoaHoc = (maKhoaHoc) => {
    return https.post(`/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, { "maKhoaHoc": maKhoaHoc });
};
/*********************** QUẢN LÝ NGƯỜI DÙNG ******************************/

export let dangNhap = (data) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
};
export let dangKy = (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
};
export let thongTinNguoiDung = () => {
    return https.post("/api/QuanLyNguoiDung/ThongTinNguoiDung");
};
export let thongTinTaiKhoan = () => {
    return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
};
export let layDanhSachNguoiDung = () => {
    return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09");
};
export let timKiemNguoiDung = (data) => {
    return https.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP09&?tuKhoa=${data}`);
};
export let capNhatThongTinNguoiDung = (data) => {
    return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
};
export let layDanhSachNguoiDungChuaGhiDanh = (maKhoaHoc) => {
  return https.post(`/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`, maKhoaHoc);
};
export let layDanhSachHocVienChoXetDuyet = (maKhoaHoc) => {
  return https.post(`/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, maKhoaHoc);
};
export let layDanhSachHocVienKhoaHoc = (maKhoaHoc) => {
  return https.post(`/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, maKhoaHoc);
};
