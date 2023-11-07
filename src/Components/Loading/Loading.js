import React from "react";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";

export default function Loading() {

    let { isLoading } = useSelector((state) => state.spinnerSlice);
    return isLoading ? (
        <div
            style={{
                position: "fixed",
                background: `#fff`,
                width: "100%",
                top: 0,
                left: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
            }}
        >
            <BarLoader color='#f24080' size={400} />
        </div>
    ) : (
        <></>
    );
}
