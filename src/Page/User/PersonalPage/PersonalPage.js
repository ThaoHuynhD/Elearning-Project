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
                console.log("response: ", response);
                userDetailLocalStorage.set(response.data)
                setUserDetail(userDetailLocalStorage.get());
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataUserDetail();
    }, []);
    console.log("userDetail: ", userDetail);

    return <div>PersonalPage
        <PersonalInfo userDetail={userDetail} />
        <PersonalCourseBooking userDetail={userDetail} />
    </div>;
}