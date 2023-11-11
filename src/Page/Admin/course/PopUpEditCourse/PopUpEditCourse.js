import React from "react";
import FormEditCourse from "./FormEditCourse";
import { setIsModalEditOpen } from "../../../../Redux/modalEditFormSlice/modalEditFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";

export default function PopUpEditCourse() {
  let { isModalEditOpen } = useSelector((state) => state.modalEditFormSlice);
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(setIsModalEditOpen(false));
  };
  const handleCancel = () => {
    dispatch(setIsModalEditOpen(false));
  };

  return (
    <>
      <Modal
        width={"60%"}
        footer={false}
        centered
        title='Thêm khoá học'
        open={isModalEditOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormEditCourse />
      </Modal>
    </>
  );
}
