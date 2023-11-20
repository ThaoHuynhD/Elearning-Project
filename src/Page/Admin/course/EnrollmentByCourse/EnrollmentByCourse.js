import { Button, ConfigProvider, Select, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { ghiDanhKhoaHoc, huyGhiDanh, layDanhSachHocVienChoXetDuyet, layDanhSachHocVienKhoaHoc, layDanhSachNguoiDungChuaGhiDanh } from '../../../../Services/api';

export default function EnrollmentByCourse({ selectedCourse, setSelectedCourse, courseList }) {
    const [enrollmentList, setEnrollmentList] = useState(null);
    const [enrollmentType, setEnrollmentType] = useState('notRegister');
    const [courseDataList, setCourseDataList] = useState(null);
    const [tableData, setTableData] = useState([]);

    const tableColumns = [
        { title: 'Ordinal', dataIndex: 'ordinal', key: 'ordinal', },
        { title: 'User Name', dataIndex: 'hoTen', key: 'hoTen', },
        { title: 'Account Name', dataIndex: 'taiKhoan', key: 'taiKhoan', },
        { title: 'Actions', dataIndex: 'thaoTac', key: 'thaoTac', },
    ];
    const listTypes = [
        { value: 'notRegister', label: 'Not Register List' },
        { value: 'waitingApproval', label: 'Waiting Approval List' },
        { value: 'attendees', label: 'Attendees List' },
    ]

    const handleCourseChange = (value) => {
        setSelectedCourse(value);
    };
    const handleTypeChange = (value) => {
        setEnrollmentType(value);
    };
    const handleAcceptEnrollment = async (value) => {
        try {
            await ghiDanhKhoaHoc(value);
            message.success("Ghi danh thành công");
        } catch (error) {
            message.error(error.response.data);
        }
    };
    const handleDeniedEnrollment = async (value) => {
        try {
            await huyGhiDanh(value);
            message.success("Xóa ghi danh thành công");
        } catch (error) {
            message.error(error.response.data);
        }
    };

    const fetchDataList = async (selectedCourse) => {
        try {
            let response;
            if (enrollmentType === 'notRegister') { response = await layDanhSachNguoiDungChuaGhiDanh(selectedCourse); }
            else if (enrollmentType === 'waitingApproval') { response = await layDanhSachHocVienChoXetDuyet(selectedCourse); }
            else if (enrollmentType === 'attendees') { response = await layDanhSachHocVienKhoaHoc(selectedCourse); }
            setEnrollmentList(response.data);
        } catch {
            message.error(`Đã có lỗi xảy ra. Vui lòng thử lại sau`);
        }
    };

    useEffect(() => {
        if (courseList !== undefined && courseList !== null) {
            let dataList = [];
            courseList.forEach(item => {
                let updateCourse = { value: item.maKhoaHoc, label: item.tenKhoaHoc };
                dataList.push(updateCourse);
                setCourseDataList(dataList);
            })
        }
    }, []);
    useEffect(() => {
        fetchDataList(selectedCourse);
        if (enrollmentList !== null) {
            let dataList = [];
            enrollmentList.forEach((item, index) => {
                let updateRow = {
                    key: index,
                    ordinal: index + 1,
                    hoTen: item.hoTen,
                    taiKhoan: item.taiKhoan,
                    thaoTac: (
                        <div className='flex align-middle justify-center'>
                            <ConfigProvider theme={{ token: { colorPrimary: 'white', borderRadius: 10, fontSize: 20, }, }}>
                                {enrollmentType === 'notRegister' || enrollmentType === 'waitingApproval' ?
                                    <Button className='h-11 w-15 text-sm btn bg-green-500 p-3 flex align-middle justify-center'
                                        onClick={() => {
                                            handleAcceptEnrollment({
                                                "maKhoaHoc": selectedCourse,
                                                "taiKhoan": item.taiKhoan
                                            })
                                        }}
                                    >{enrollmentType === 'notRegister' ? 'Enroll' : 'Accept'}</Button>
                                    : null}
                                {enrollmentType === 'waitingApproval' || enrollmentType === 'attendees' ?
                                    <Button className='h-11 w-15 text-sm btn bg-red-500 mx-1 p-3 flex align-middle justify-center'
                                        onClick={() => {
                                            handleDeniedEnrollment({
                                                "maKhoaHoc": selectedCourse,
                                                "taiKhoan": item.taiKhoan
                                            })
                                        }}
                                    >{enrollmentType === 'waitingApproval' ? 'Denied' : 'Delete'}</Button>
                                    : null}
                            </ConfigProvider>
                        </div>
                    ),
                }
                dataList.push(updateRow);
            })
            setTableData(dataList);
        }
    }, [selectedCourse, enrollmentList]);

    return (
        <div>
            <div className="text-right">
                <div className='py-3'>
                    <span className='pr-3'>Choose Course:</span>
                    <Select
                        defaultValue={null} style={{ width: 300 }}
                        onChange={handleCourseChange}
                        options={courseDataList}
                        value={{
                            label: selectedCourse === null ? "Chọn Khóa Học Khác" : selectedCourse.tenKhoaHoc,
                            value: selectedCourse,
                        }} />
                </div>
                <div className='pb-3'>
                    <span className='pr-3'>Choose List Type:</span>
                    <Select
                        defaultValue="notRegister" style={{ width: 300 }}
                        onChange={handleTypeChange}
                        options={listTypes}
                    />
                </div>
            </div>
            <Table dataSource={tableData} columns={tableColumns} />
        </div>
    )
}
