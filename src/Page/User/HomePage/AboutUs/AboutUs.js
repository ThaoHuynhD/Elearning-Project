import { Progress } from "antd";
import React from "react";
import "./AboutUs.scss";

export default function AboutUs() {
  return (
    <section className='aboutUs pt-28'>
      <div className='container grid grid-cols-2 gap-28'>
        <div className='aboutUs__left'>
          <img
            src='./image/aboutUs/about_1.jpg'
            alt='...'
            className='rounded-xl mb-9'
          />
          <div>
            <div className='flex justify-between'>
              <span>Completed Projects</span>
              <span>92%</span>
            </div>
            <Progress
              percent={92}
              status='active'
              strokeColor={"#41246D"}
              size={"small"}
            />
            <div className='flex justify-between'>
              <span>Financial Skills</span>
              <span>98%</span>
            </div>
            <Progress
              percent={98}
              status='active'
              strokeColor={"#41246D"}
              size={"small"}
            />
            <div className='flex justify-between'>
              <span>Relaible & Hardworking</span>
              <span>90%</span>
            </div>
            <Progress
              percent={90}
              status='active'
              strokeColor={"#41246D"}
              size={"small"}
            />
          </div>
          <div className='regarding_us grid grid-cols-2 gap-8 mt-[20px]'>
            <div className='regarding_left'>
              <div className='flex items-center mb-4'>
                <i className='fa-solid fa-medal'></i>
                <h3>Certified Institute</h3>
              </div>
              <div>
                <p className='leading-[1.7]'>
                  Lacinia asperiores incididunt saepe corrupti quos eros
                  cupidatat faucibus natus.
                </p>
              </div>
            </div>
            <div className='regarding_right'>
              <div className='flex items-center  mb-4'>
                <i className='fa-solid fa-user-tie'></i>
                <h3>Qualifed Teachers</h3>
              </div>
              <div>
                <p className='leading-[1.7]'>
                  Lacinia asperiores incididunt saepe corrupti quos eros
                  cupidatat faucibus natus.
                </p>
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <button className='btnGlobal font-bold'>MORE ABOUT US</button>
          </div>
        </div>
        <div className='aboutUs__right flex flex-col justify-around'>
          <div>
            <h1 className='text-[42px] font-extrabold leading-[1.1] mb-5'>
              Why Students Choose Us for Gaining Knowledge !
            </h1>
            <p>
              Per sed, mattis. Integer viverra euismod maecenas incidunt,
              phasellus consequatur aliquam nihil temporibus in assumens
              deserunt convallis. Inceptos per consectetur consequatur proin.
            </p>
          </div>
          <img
            src='./image/aboutUs/about_2.jpg'
            alt='...'
            className='rounded-xl w-full'
          />
        </div>
      </div>
    </section>
  );
}
