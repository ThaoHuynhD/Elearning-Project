import React, { useState } from "react";
import "./NumberCounter.scss";
import { ConfigProvider, Modal } from "antd";
import CountUp from "react-countup";
import ReactPlayer from "react-player";

export default function NumberCounter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <section className='numberCounter'>
      <div className='container pt-20'>
        <div className='goal__section flex justify-center flex-wrap lg:flex-nowrap'>
          <div className='goal__video '>
            <figure className='rounded-3xl  overflow-hidden'>
              <img
                src='./image/aboutUs/about_1.jpg '
                alt='...'
                className='brightness-75'
              />
              <div className='btnPlay'>
                <button
                  onClick={showModal}
                  className='w-[40px] h-[40px] leading-[40px] text-2xl md:w-[80px] md:h-[80px] md:leading-[80px] md:text-4xl text-center text-white  bg-[#f24080] hover:bg-[#961040] rounded-full duration-300'
                >
                  <i className='fa-solid fa-play'></i>
                </button>

                <ConfigProvider
                  theme={{
                    token: {
                      paddingContentHorizontalLG: 0,
                      paddingContentVerticalLG: 0,
                    },
                  }}
                >
                  <Modal
                    centered={true}
                    open={isModalOpen}
                    footer={null}
                    onCancel={handleCancel}
                    width={"80%"}
                  >
                    <div className='player-wrapper'>
                      <ReactPlayer
                        className='react-player'
                        controls
                        url={"https://youtu.be/OMbNoo4mCcI"}
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                  </Modal>
                </ConfigProvider>
              </div>
            </figure>
          </div>
          <div className='goal__content '>
            <div className='flex flex-col justify-around h-full'>
              <h1>
                Committed To <br /> The Best Results !
              </h1>
              <p>
                Per sed, mattis. Integer viverra euismod maecenas incidunt,
                phasellus consequatur aliquam nihil temporibus in assumens
                deserunt convallis, eius.
              </p>
              <div>
                <button className='btnGlobal '>JOIN US NOW</button>
              </div>
            </div>
            <div className='overlay'></div>
          </div>
        </div>
      </div>
      <div className='number'>
        <div className='overlay__purpel'></div>
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
            <div className='number__item lg:border-r-2 border-[#ffffff24]'>
              <h1>
                <CountUp enableScrollSpy end={45} duration={8} />
                k+
              </h1>
              <p>Active Students</p>
            </div>
            <div className='number__item lg:border-r-2 border-[#ffffff24]'>
              <h1>
                <CountUp enableScrollSpy end={72} duration={8} />+
              </h1>
              <p>Faculty Courses</p>
            </div>
            <div className='number__item lg:border-r-2 border-[#ffffff24]'>
              <h1>
                <CountUp enableScrollSpy end={90} duration={8} />+
              </h1>
              <p>Best Professors</p>
            </div>
            <div className='number__item'>
              <h1>
                <CountUp enableScrollSpy end={35} duration={8} />
              </h1>
              <p>Award Achieved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
