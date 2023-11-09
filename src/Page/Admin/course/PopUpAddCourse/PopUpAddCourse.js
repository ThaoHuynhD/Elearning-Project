import React from "react";
import { Button, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../../../../Redux/openModalSlice/openModalSlice";
import FormAddCourse from "./FormAddCourse/FormAddCourse";

export default function PopUpAddCourse() {
  let { isModalOpen } = useSelector((state) => state.openModalSlice);
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
      <Button type='default' onClick={showModal} className='flex items-center'>
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
