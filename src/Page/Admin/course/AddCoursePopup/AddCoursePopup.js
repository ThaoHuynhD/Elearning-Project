import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Form } from "antd";
import React, { useState } from "react";
import FormAdd from "./FormAdd";

export default function AddCoursePopup({ fetchDataCourseList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type='default'
        className='flex items-center bg-green-600 hover:bg-green-700 duration-300'
        onClick={showModal}
      >
        <PlusCircleOutlined /> Add New Course
      </Button>
      <Modal
        title='Thêm khoá học'
        width={"60%"}
        footer={false}
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAdd
          form={form}
          setIsModalOpen={setIsModalOpen}
          fetchDataCourseList={fetchDataCourseList}
        />
      </Modal>
    </>
  );
}
