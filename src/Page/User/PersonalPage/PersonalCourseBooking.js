import { Button, Image, message } from 'antd';
import React from 'react'
import { huyGhiDanh } from '../../../Services/api';

export default function PersonalCourseBooking({ userDetail }) {

    let chiTietKhoaHocGhiDanh = userDetail.chiTietKhoaHocGhiDanh;
    if (!chiTietKhoaHocGhiDanh || !userDetail) {
        return <div>Loading...</div>;
    }
    const fetchData = async (data) => {
        try {
            const response = await huyGhiDanh(data);
            console.log("response.data.content: ", response);
            message.success("Hủy ghi danh thành công");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            message.error(error.response.data.content);
            console.log(error);
        }
    };
    const handleCancleUserCourse = (maKhoaHoc) => {
        let data = {
            "maKhoaHoc": maKhoaHoc,
            "taiKhoan": userDetail.taiKhoan,
        }
        fetchData(data);
    }
    const renderUserRegisteredCourseList = () => {
        return chiTietKhoaHocGhiDanh.map((khoaHoc, index) => {
            return (
                <div key={index}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Tên Khóa Học: </th>
                                <td><span className="text-yellow-500 font-bold"> {khoaHoc.tenKhoaHoc}</span></td>
                            </tr>
                            <tr>
                                <th>Ngày Đăng Ký: </th>
                                <td>
                                    <span className='text-success'>{khoaHoc.ngayTao.substring(0, 10)} - {khoaHoc.ngayTao.substring(14, 20)}</span>
                                </td>
                            </tr>

                            <tr>
                                <th>Mô Tả: </th>
                                <td><span>{khoaHoc.moTa}</span></td>
                            </tr>
                            <tr>
                                <th>Hình Ảnh: </th>
                                <td><Image width={100} height={100} src={khoaHoc.hinhAnh} alt='' /></td>
                            </tr>
                            <tr>
                                <th>Lượt Xem: </th>
                                <td>{khoaHoc.luotXem}</td>
                            </tr>
                            <tr>
                                <td><Button onClick={() => { handleCancleUserCourse(khoaHoc.maKhoaHoc) }}>HỦY GHI DANH</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>)
        })
    }
    return (
        <div className='container'>
            <div className="text-center">
                <span className='text-3xl font-semibold'
                >Danh Sách Khóa Học Bạn Đã Đăng Ký</span>
            </div>
            <div className='grid grid-cols-4'>{renderUserRegisteredCourseList()}</div>
        </div>
    )
}