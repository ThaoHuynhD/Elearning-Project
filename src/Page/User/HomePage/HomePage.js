import React from "react";
import Banner from "./Banner/Banner";
import AboutUs from "./AboutUs/AboutUs";
import Categories from "./Categories/Categories";
import CourseList from "./CourseList/CourseList";
import ListEducator from "./ListEducator/ListEducator";
import NumberCounter from "./NumberCounter/NumberCounter";
import Testimonial from "./Testimonial/Testimonial";
import Slider from "./Slider/Slider";
import BackToTop from "../../../Components/BackToTop/BackToTop";

export default function HomePage() {
  return (
    <>
      <Banner />
      <AboutUs />
      <Categories />
      <CourseList />
      <ListEducator />
      <NumberCounter />
      <Testimonial />
      <Slider />
      <BackToTop />
    </>
  );
}