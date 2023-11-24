import { ConfigProvider, FloatButton } from "antd";
import React from "react";

export default function BackToTop() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: "#f24080",
          colorFillContent: "#961040",
        },
      }}
    >
      <FloatButton.BackTop
        duration={1200}
        shape='square'
        icon={<i className='fa-solid fa-angle-up text-white font-semibold'></i>}
      />
    </ConfigProvider>
  );
}
