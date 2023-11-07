import React from "react";
import "./Testimonial.scss";
let dataItem = [
  {
    image: "./image/testimonial/testimonial_1.jpg",
    name: "Jenny Wilson",
    career: "FULLSTACK DEVELOPER",
  },
  {
    image: "./image/testimonial/testimonial_2.jpg",
    name: "William Wright",
    career: "FRONTEND DEVELOPER",
  },
];

let renderTestimonailItem = () => {
  return dataItem.map((item, index) => {
    return (
      <div key={`item-${index}`} className='testimonial__item '>
        <div className='testimonial__overlay'></div>
        <p>
          “Per sed, mattis. Integer viverra euismod maecenas incidunt, phasellus
          consequatur aliquam nihil temporibus in assumenda? Aute praesentium
          fugiat. Perspiciatis, ultrices deserunt convallis, eius at non.”
        </p>
        <div className='flex justify-end items-center space-x-3 mt-5'>
          <div>
            <h3 className='font-bold text-lg'>{item.name}</h3>
            <span className='text-sm text-[#f24080]'>{item.career}</span>
          </div>
          <div>
            <img src={item.image} className='w-20 rounded-full' alt='...' />
          </div>
        </div>
      </div>
    );
  });
};

export default function Testimonial() {
  return (
    <section className='testimonial py-28'>
      <div className='container'>
        <div className='testimonial__title w-1/2 mx-auto'>
          <div className='text-center'>
            <h1 className='font-extrabold text-[42px] mb-5'>
              Review's From Students
            </h1>
            <p>
              Saepe quo labore aenean dictumst expedita commodi auctor, nisl,
              lorem iusto feugiat nemo reiciendis laboris.
            </p>
          </div>
        </div>
        <div className='testimonial__list grid grid-cols-2 gap-10 my-10 px-10'>
          {renderTestimonailItem()}
        </div>
      </div>
    </section>
  );
}