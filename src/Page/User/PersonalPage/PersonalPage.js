import React, { useEffect, useState } from "react";
import { thongTinTaiKhoan } from "../../../Services/api";
import { userDetailLocalStorage } from "../../../Services/localServices";
import PersonalInfo from "./PersonalInfo";
import PersonalCourseBooking from "./PersonalCourseBooking";

export default function PersonalPage() {
    const [userDetail, setUserDetail] = useState([]);
    useEffect(() => {
        const fetchDataUserDetail = async () => {
            try {
                const response = await thongTinTaiKhoan();
                userDetailLocalStorage.set(response.data)
                setUserDetail(userDetailLocalStorage.get());
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataUserDetail();
    }, []);
    console.log("userDetail: ", userDetail);

    return <div class="mt-20">
        <div className="bg-white-900 text-purple-900 shadow-2xl text-center container rounded-lg flex">
            <div className="w-1/2 pl-10">
                <p className="pt-24 font-extrabold text-3xl ">Hello, {userDetail.hoTen}</p>
                <p className="pt-5">Wellcome back to Educator!!!</p>
            </div>
            <div className="w-1/2 h-72 relative bottom-0 -translate-y-24 text-center   ">
                <img className="w-5/6 ml-20"
                    src="https://i.pinimg.com/564x/59/b6/ea/59b6ea182b319842ec81725f215507f2.jpg"
                    alt="" />
            </div>
        </div>
        <div className="grid grid-cols-3 my-5 ">
            <PersonalInfo userDetail={userDetail} />
            <div className="col-span-2">
                <PersonalCourseBooking userDetail={userDetail} />
            </div>
        </div>
    </div>;
}