import { message } from 'antd';
import React from 'react'
import { huyGhiDanh } from '../../../Services/api';
import { useNavigate } from 'react-router-dom';

export default function PersonalCourseBooking({ userDetail }) {
    const navigate = useNavigate();
    let chiTietKhoaHocGhiDanh = userDetail.chiTietKhoaHocGhiDanh;
    if (!chiTietKhoaHocGhiDanh || !userDetail) {
        return <div>Loading...</div>;
    }
    const fetchData = async (data) => {
        try {
            await huyGhiDanh(data);
            message.success("Terminate your course successful");
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
            return (
                <div key={index} className='bg-purple-100 grid lg:grid-cols-4 grid-cols-3 text-center shadow-lg lg:h-24 h-40 my-4 border py-4 rounded-xl'>
                    <img className='ml-5 rounded-full overflow-hidden lg:w-16 lg:h-16 w-20 h-20 lg:col-auto'
                        src={course.hinhAnh} alt={course.tenKhoaHoc} />
                    <div className="lg:ml-2 mt-3 col-span-2 text-center font-bold lg:text-left">
                        <p> {course.tenKhoaHoc}</p>
                        <p className='text-sm text-pink-500'><span className='text-black font-normal'>Enroll: </span>{course.ngayTao.substring(0, 10)}</p>
                    </div>
                    <button className='lg:mx-4 lg:my-4 lg:py-0 py-4 my-3 mx-auto w-11/12 lg:w-max btnGlobalOutline p-0 col-span-3 lg:col-auto'
                        onClick={() => { handleCancleUserCourse(course.maKhoaHoc) }}>Cancel Enrollment</button>
                </div>
            )
        })
    }
    return (
        <div className='lg:ml-10 mt-10'>
            <div className="text-center">
                <span className='text-3xl font-semibold'>Course List you have assign</span>
            </div>
            <div>{renderUserRegisteredCourseList()}</div>
            <div className="text-right">
                <p className='lg:text-3xl text-md lg:p-10 py-4'>View Other Courses of Educator at <span className='cursor-pointer font-semibold underline text-purple-900'
                    onClick={() => { navigate('/') }}>HERE</span></p>
            </div>
        </div>
    )
}