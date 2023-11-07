import { FloatButton } from 'antd'
import React from 'react'

export default function BackToTop() {
    return (
        <FloatButton.BackTop
            shape='square'
            icon={<i className='fa-solid fa-angle-up '></i>}
        />
    )
}
