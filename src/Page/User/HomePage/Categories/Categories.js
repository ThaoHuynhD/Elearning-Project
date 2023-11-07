import React, { useEffect, useState } from "react";
import "./Categories.scss";
import { layDanhMucKhoaHoc } from "../../../../Services/api";
import { NavLink } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let getListCategories = async () => {
      try {
        let res = await layDanhMucKhoaHoc();
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getListCategories();
  }, []);
  let handleSetImg = (index) => {
    switch (index) {
      case 0:
        return "https://img.icons8.com/fluency/48/programming.png";
      case 1:
        return "https://img.icons8.com/arcade/64/design.png";
      case 2:
        return "https://img.icons8.com/fluency/48/developer-mode.png";
      case 3:
        return "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-front-end-ux-and-ui-icons-flaticons-lineal-color-flat-icons.png";
      case 4:
        return "https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-full-stack-computer-programming-flaticons-flat-flat-icons.png";
      case 5:
        return "https://img.icons8.com/external-others-pike-picture/50/external-blogger-blogger-internet-social-channel-others-pike-picture-14.png";
      default: ;
    }
  };
  let renderListCategories = () => {
    return categories?.map((item, index) => {
      return (
        <NavLink
          key={`item_${index}`}
          to={`/listCourseByCategories/${item.maDanhMuc}`}
        >
          <div className='categories__item flex items-center justify-start'>
            <img
              width='64'
              height='64'
              src={handleSetImg(index)}
              alt='programming'
              className='mr-4'
            />
            <div>
              <p className='text-xl font-bold duration-500'>{item.maDanhMuc}</p>
              <span className='text-zinc-400 duration-500'>
                The logic behind the beauty
              </span>
            </div>
          </div>
        </NavLink>
      );
    });
  };
  return (
    <section className='categories my-20'>
      <div className='container relative'>
        <div className='categories__title text-4xl font-bold mb-5 '>
          <h1>Explore</h1>
          <h1>Our Best Categories</h1>
        </div>
        <div className='grid grid-cols-3 grid-row-2 gap-5'>
          {renderListCategories()}
        </div>
      </div>
    </section>
  );
}