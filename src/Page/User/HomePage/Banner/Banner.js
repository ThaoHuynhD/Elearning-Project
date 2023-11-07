import React from "react";
import "./Banner.scss";

export default function Banner() {
    return (
        <section className='banner pt-20'>
            <div className='flex  items-center container'>
                <div className='left__banner w-1/2'>
                    <div className='img_overlayOval overlay1'></div>
                    <div className='left__text'>
                        <h1>Providing Best</h1>
                        <h1>Education For</h1>
                        <h1>Brighter future</h1>
                        <p className='py-8'>
                            Per sed, mattis. Integer viverra euismod maecenas incidunt,
                            phasellus consequatur aliquam nihil temporibus in assumens
                            deserunt convallis. Inceptos per consectetur consequatur proin.
                        </p>
                    </div>
                    <button className='btnGlobal'>LEARN MORE</button>
                </div>
                <div className='right__banner'>
                    <div className='img_overlayOval overlay2 w-1/2'></div>
                    <img src='./image/banner/banner_educator.png' alt='' />
                </div>
            </div>
        </section>
    );
}