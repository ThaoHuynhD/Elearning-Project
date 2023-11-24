import React from "react";
import "./ListEducator.scss";

let dataEducator = [
  {
    image: "./image/educator/educator_1.png",
    name: "William Smith",
    career: "Science Professor",
  },
  {
    image: "./image/educator/educator_2.png",
    name: "Jenny White",
    career: "Art Professor",
  },
  {
    image: "./image/educator/educator_3.png",
    name: "George Hobbs",
    career: "Economics Professor",
  },
  {
    image: "./image/educator/educator_4.png",
    name: "Alice Heard",
    career: "Statistics Professor",
  },
];
let renderItem = () => {
  return dataEducator.map((item, index) => {
    return (
      <div key={`item-${index}`} className={`member__${index} p-6`}>
        <figure className='item__img'>
          <img src={item.image} alt='...' />
        </figure>
        <div className='item__info text-center'>
          <h2 className='mt-4 text-2xl font-bold'>{item.name}</h2>
          <p className='text-[#F24080]'>{item.career}</p>
          <div className='flex justify-center mt-5'>
            <div className='flex space-x-2'>
              <div className='item__icon'>
                <i className='fa-brands fa-facebook' />
              </div>
              <div className='item__icon'>
                <i className='fa-brands fa-twitter' />
              </div>
              <div className='item__icon'>
                <i className='fa-brands fa-whatsapp'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default function ListEducator() {
  return (
    <div className='listEducator pt-28'>
      <div className='container'>
        <div className='overlay'></div>
        <h1 className='font-extrabold mb-10 text-[1.8rem] md:text-4xl leading-[1.1]'>
          Meet Our Best Teachers
        </h1>
        <div className='group__member grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {renderItem()}
        </div>
      </div>
    </div>
  );
}
