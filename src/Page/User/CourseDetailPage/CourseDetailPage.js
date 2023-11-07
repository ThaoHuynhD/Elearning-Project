import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetail } from "../../../Redux/courseDetailSlice";

const CourseDetailPage = () => {
  // This extracts the courseId from the URL
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  console.log(state); // Add this line to log the state

  const { courseDetail, isLoading, error } = useSelector(
    (state) => state.courseDetail
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetail(courseId));
    }
  }, [dispatch, courseId]);

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
        <img src={courseDetail.hinhAnh} alt=""/>
        <p className="instructor-name">{courseDetail.nguoiTao.hoTen}</p>
        <p className="enrollment-count">{courseDetail.soLuongHocVien} students enrolled</p>
      </section>

      <section className="course-content">
        <p className="course-category">{courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
        <p className="course-date">Created on: {courseDetail.ngayTao}</p>
        <p className="course-description">{courseDetail.moTa}</p>
      </section>

      <section className="enrollment-section">
        <button className="enroll-button">Đăng ký</button>
      </section>
    </div>
  );
};

export default CourseDetailPage;
