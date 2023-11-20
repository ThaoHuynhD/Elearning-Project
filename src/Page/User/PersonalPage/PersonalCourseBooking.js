import { Button, message } from 'antd';
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
        return chiTietKhoaHocGhiDanh.map((course, index) => {
            return <div key={index} className='grid grid-cols-4 shadow-lg h-24 my-4 border py-4 rounded-lg overflow-hidden'>
                <img className='ml-5 rounded-full overflow-hidden w-16 h-16' src={course.hinhAnh} alt='null' />
                <span className="text-yellow-500 font-bold col-span-2 mt-5"> {course.tenKhoaHoc}</span>
                <Button className='mt-4 btn-red' onClick={() => { handleCancleUserCourse(course.maKhoaHoc) }}>HỦY GHI DANH</Button>
            </div>
        })
    }
    return (
        <div className='container'>
            <div className="text-center">
                <span className='text-3xl font-semibold'
                >Course List you have assign</span>
            </div>
            <div>{renderUserRegisteredCourseList()}</div>
        </div>
    )
}