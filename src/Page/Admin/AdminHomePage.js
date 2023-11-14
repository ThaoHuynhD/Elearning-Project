import React, { useState } from 'react';
import { ScheduleOutlined, TeamOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import UserManagement from './user/UserManagement';
import PersonalPage from '../User/PersonalPage/PersonalPage';
import CourseManagement from './course/CourseManagement';
import { Header } from 'antd/es/layout/layout';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}
const items = [
    getItem('User Management', 'userManage', <TeamOutlined />),
    getItem('CourseManagement', 'courseManage', <ScheduleOutlined />),
];

export default function AdminHomePage() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
    const [selectedItem, setSelectedItem] = useState(null);
    if (selectedItem === null) { setSelectedItem('userManage') }

    const handleMenuItemClick = (key) => {
        setSelectedItem(key);
    }

    const breadcrumbItems = [
        <Breadcrumb.Item key="Admin">Admin</Breadcrumb.Item>,
        <Breadcrumb.Item key={selectedItem}>{selectedItem}</Breadcrumb.Item>
    ];

    const componentMapping = {
        userManage: <UserManagement />,
        courseManage: <CourseManagement />,
        personal: <PersonalPage />,
    };

    return (
        <Layout style={{ minHeight: '100vh', scrollBehavior: 'smooth', overflow: 'auto' }}        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu style={{ paddingTop: 10 }} theme="dark" defaultSelectedKeys={['user']} mode="inline" items={items} onClick={({ key }) => handleMenuItemClick(key)} />
            </Sider>
            <Layout>
                <Header>
                    <AdminHeader />
                </Header>
                <Content style={{ margin: '0 16px', }} >
                    <Breadcrumb style={{ margin: '16px 0', }}>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 900, background: colorBgContainer, }}>
                        {componentMapping[selectedItem]}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};