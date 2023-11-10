import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetail } from "../../../Redux/courseDetailSlice";
import { dangKyKhoaHoc } from "../../../Services/api";
import { message } from "antd";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courseDetail, isLoading, error } = useSelector((state) => state.courseDetail);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetail(courseId));
    }
  }, [dispatch, courseId]);

  // Replace 'userAccount' with actual user account from state or context
  // const userAccount = "userAccount"; // This should be dynamic

  const handleCourseRegistration = async () => {
    const userAccount = localStorage.getItem("userAccount");
    if (!userAccount) {
      message.error("You must be logged in to register for a course.");
      return;
    }
    try {
      const data = {
        taiKhoan: userAccount,
        maKhoaHoc: courseId,
      };
      const response = await dangKyKhoaHoc(data);
      if (response.data === "Ghi danh thành công!") {
        message.success("Đã đăng ký thành công");
      } else {
        message.info("Lỗi!");
      }
    } catch (error) {
      message.error("Đăng ký không thành công vì có thể bạn đã đăng ký khóa học này rồi");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!courseDetail) {
    return <div>No course details available.</div>;
  }

  return (
    <div className="course-detail-page">
      <section className="course-header">
        <h1 className="course-title">{courseDetail.tenKhoaHoc}</h1>
        <img src={courseDetail.hinhAnh} alt={courseDetail.tenKhoaHoc || "Course Image"} />
        <p className="instructor-name">{courseDetail.nguoiTao.hoTen}</p>
        <p className="enrollment-count">{courseDetail.soLuongHocVien} students enrolled</p>
      </section>

      <section className="course-content">
        <p className="course-category">{courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
        <p className="course-date">Created on: {courseDetail.ngayTao}</p>
        <p className="course-description">{courseDetail.moTa}</p>
      </section>

      <section className="enrollment-section">
        <button onClick={handleCourseRegistration} className="enroll-button">Đăng ký</button>
      </section>
    </div>
  );
};

export default CourseDetailPage;
