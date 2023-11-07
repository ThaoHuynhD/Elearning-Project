import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Rate } from "antd";
import "./SearchCoursePage.scss";
import { layDanhSachKhoaHocTheoTen } from "../../../Services/api";


export default function SearchCoursePage() {

    const param = useParams();
    const [listCourseByName, setListCourseByName] = useState([]);
    const [errorGetListCourse, setErrorGetListCourse] = useState("");
    useEffect(() => {
        let getListCourse = async () => {
            try {
                let res = await layDanhSachKhoaHocTheoTen(param.tenKhoaHoc);
                console.log(
                    "🚀 ~ file: SearchCourse.js:13 ~ getListCourse ~ res:",
                    res,
                );
                setListCourseByName(res.data);
            } catch (error) {
                setErrorGetListCourse(error.response.data);
            }
        };
        getListCourse();
    }, [param.tenKhoaHoc]);

    let renderListCourseByName = () => {
        if (listCourseByName !== undefined) {
            return listCourseByName?.map((item, index) => {
                return (
                    <div
                        key={`item${index}`}
                        className='search__item flex border-dashed border-[#d9d9d9] border-2 p-5 rounded-md shadow-lg'
                    >
                        <div className='w-[35%] item__img mr-8 '>
                            <img src={item.hinhAnh} className='rounded' alt='...' />
                        </div>
                        <div className='w-[65%] item__content'>
                            <h3 className='font-bold'>{item.tenKhoaHoc}</h3>
                            <p className='my-3'>
                                {item.moTa.length > 100
                                    ? item.moTa.slice(0, 100) + "..."
                                    : item.moTa}
                            </p>
                            <div className='item__view flex items-center space-x-4 my-3'>
                                <div>
                                    <i
                                        className='fa-regular fa-eye mr-3'
                                        style={{ color: "#F24080" }}
                                    ></i>
                                    <span>{item.luotXem}+ students</span>
                                </div>
                                <div>
                                    <i className='fa-solid fa-signal text-[#F24080] mr-3'></i>
                                    <span>All level</span>
                                </div>
                            </div>
                            <div className='item__rating flex items-center '>
                                <div>
                                    <span className='text-sm text-[#787878]'>(4.5 ratings)</span>
                                </div>
                                <Rate
                                    className='text-sm ml-4 text-[#F24080]'
                                    allowHalf
                                    defaultValue={4.5}
                                />
                            </div>
                            <div className='item__creator flex justify-between items-center'>
                                <div className='flex items-center py-5'>
                                    <img
                                        src={`https://i.pravatar.cc/40?u=Duy`}
                                        className='rounded-full'
                                        alt='...'
                                    />
                                    <p className='ml-4 font-semibold'>{item.nguoiTao.hoTen}</p>
                                </div>
                                <div>
                                    <NavLink>
                                        <button className='btnGlobal'>Detail Course</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return <h1 className='font-bold text-3xl'>{errorGetListCourse}</h1>;
        }
    };
    return (
        <div className='searchCourse'>
            <div className='search__banner'>
                <div className='overlay_purpil flex items-center justify-center'>
                    <div className='container text-center text-white  '>
                        <h1 className='text-6xl font-bold'>Search</h1>
                        <p className='text-2xl font-medium'>Course Search Results !!</p>
                    </div>
                </div>
            </div>
            <div className='search__list'>
                <div className='container'>
                    <div className='my-20'>
                        <div>
                            <h1 className='font-semibold text-xl'>
                                Founded {listCourseByName?.length} result !!
                            </h1>
                        </div>
                        <div className='grid grid-cols-2 gap-10 mt-8'>
                            {renderListCourseByName()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}