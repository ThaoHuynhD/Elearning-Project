import React, { useEffect, useState } from 'react';
import { ScheduleOutlined, TeamOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, message, theme } from 'antd';
import UserManagement from './user/UserManagement';
import PersonalPage from '../User/PersonalPage/PersonalPage';
import CourseManagement from './course/CourseManagement';
import { Header } from 'antd/es/layout/layout';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import EnrollmentByCourse from './course/EnrollmentByCourse/EnrollmentByCourse';
import { layDanhSachKhoaHoc } from '../../Services/api';
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}
const items = [
    getItem('User Management', 'userManage', <TeamOutlined />),
    getItem('Course Management', 'courseManage', <ScheduleOutlined />,),
];

export default function AdminHomePage() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
    const [selectedItem, setSelectedItem] = useState('courseManage');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseList, setCourseList] = useState([]);

    const handleMenuItemClick = (key) => {
        setSelectedItem(key);
    }
    const fetchDataCourseList = async () => {
        try {
            let response = await layDanhSachKhoaHoc();
            setCourseList(response.data);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    const breadcrumbItems = [
        <Breadcrumb.Item key="Admin">Admin</Breadcrumb.Item>,
        selectedItem === "enrollmentByCourse" ?
            <><Breadcrumb.Item>Course</Breadcrumb.Item>
                <Breadcrumb.Item key={selectedItem}>Enrollment By Course</Breadcrumb.Item></> :
            <Breadcrumb.Item key={selectedItem}>{selectedItem}</Breadcrumb.Item>
    ];

    const componentMapping = {
        userManage: <UserManagement />,
        courseManage: <CourseManagement setSelectedItem={setSelectedItem} setSelectedCourse={setSelectedCourse} courseList={courseList} />,
        enrollmentByCourse: <EnrollmentByCourse selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} courseList={courseList} />,
        personal: <PersonalPage />,
    };
    useEffect(() => {
        fetchDataCourseList();
    }, []);
    return (
        <Layout style={{ minHeight: '100vh', scrollBehavior: 'smooth', overflow: 'auto' }}        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu style={{ paddingTop: 10 }} theme="dark" defaultSelectedKeys={[selectedItem]} mode="inline" items={items} onClick={({ key }) => handleMenuItemClick(key)} />
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

