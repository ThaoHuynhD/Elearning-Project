import React from "react";
import { Button, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import FormAddCourse from "./FormAddCourse/FormAddCourse";
import { setIsModalOpen } from "../../../../Redux/modalFormSlice/modalFormSlice";

export default function PopUpAddCourse() {
  let { isModalOpen } = useSelector((state) => {
    return state.modalFormSlice;
  });

  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(setIsModalOpen(true));
  };
  const handleOk = () => {
    dispatch(setIsModalOpen(false));
  };
  const handleCancel = () => {
    dispatch(setIsModalOpen(false));
  };

  return (
    <>
      <Button
        type='default'
        onClick={showModal}
        className='flex items-center bg-green-600 hover:bg-green-700 duration-300'
      >
        <PlusCircleOutlined />
        Thêm khoá học
      </Button>
      <Modal
        width={"60%"}
        footer={false}
        centered
        title='Thêm khoá học'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAddCourse />
      </Modal>
    </>
  );
}
