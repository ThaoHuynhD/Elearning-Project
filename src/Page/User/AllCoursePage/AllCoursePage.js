import { Card, Checkbox, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { layDanhSachKhoaHoc_PhanTrang } from "../../../Services/api";

export default function AllCoursePage() {
    const [page, setPage] = useState(1);
    const [listItemPage, setListItemPage] = useState({});

    useEffect(() => {
        let getCourseListByPage = async () => {
            try {
                let res = await layDanhSachKhoaHoc_PhanTrang(page);
                console.log(
                    "🚀 ~ file: AllCoursePage.js:15 ~ getCourseListByPage ~ res:",
                    res.data,
                );
                setListItemPage(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCourseListByPage();
    }, [page]);
    let totalPages = listItemPage?.totalPages * 10;
    let renderItemPage = () => {
        return listItemPage.items?.map((item, index) => {
            return (
                <div key={`item${index}`}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                            height: 240,
                        }}
                        cover={<img alt='example' src={item.hinhAnh} height={100} />}
                    >
                        <Meta title={item.tenKhoaHoc} />
                    </Card>
                </div>
            );
        });
    };
    const onChange = (e) => {
        e.foreach((item) => {
            console.log(item);
        });
    };

    return (
        <section className='allCoursePage my-10'>
            <div className='container'>
                <div className='grid grid-cols-4'>
                    <div className='course__filter'>
                        <h1>Categories</h1>
                        <div className='flex flex-col'>
                            <div>
                                <Checkbox.Group onChange={onChange}>
                                    <Checkbox value={"Front-End"}>Front-End</Checkbox>
                                    <Checkbox value={"Back-End"}>Back-End</Checkbox>
                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>
                    <div className='listCourse col-span-3 flex flex-col '>
                        <div className='grid grid-cols-3 gap-8'>{renderItemPage()}</div>
                        <div className='flex justify-center mt-8'>
                            <Pagination
                                current={page}
                                onChange={(page) => {
                                    setPage(page);
                                }}
                                total={totalPages}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}