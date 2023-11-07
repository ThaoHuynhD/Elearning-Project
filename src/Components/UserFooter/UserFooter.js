import React from "react";
import "./UserFooter.scss"
export default function UserFooter() {
    return (
        <div className='footer pt-20'>
            <div className='container'>
                <div className='grid grid-cols-4 gap-8 mb-20'>
                    <div className=' col1 space-y-4'>
                        <img src='../image/educator-logo1.png' alt='logo' />
                        <p>
                            Vero, tempor morbi, adipiscing aliqua nonummy proident
                            perferendis? Laboris lacus quidem repellendus quasi.
                        </p>
                        <div className='space-x-6 flex'>
                            <div className='item_icon'>
                                <i className='fa-brands fa-facebook' />
                            </div>
                            <div className='item_icon'>
                                <i className='fa-brands fa-twitter' />
                            </div>
                            <div className='item_icon'>
                                <i className='fa-brands fa-youtube' />
                            </div>
                            <div className='item_icon'>
                                <i className='fa-brands fa-instagram' />
                            </div>
                        </div>
                    </div>
                    <div className='col2'>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            <li>News & Articles</li>
                            <li>Legal Notice</li>
                        </ul>
                    </div>
                    <div className='col3'>
                        <h3>Support</h3>
                        <ul>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Payment Center</li>
                            <li>Parent Community</li>
                        </ul>
                    </div>
                    <div className='col4 space-y-4'>
                        <h3>School Hours</h3>
                        <div>
                            <i className='fa-regular fa-clock text-[#f24080]'></i>
                            <p className='inline ml-3'>8 AM - 5 PM , Monday - Saturday</p>
                        </div>
                        <p>Aut, quae convallis minim cum ornare! Pede dictum convallis.</p>
                        <div>
                            <button className='btnGlobal'>JOIN US NOW</button>
                        </div>
                    </div>
                </div>
                <div className='footer_bottom flex justify-between items-center text-sm py-5 border-t-2 border-[#a7a7a73b]'>
                    <div>
                        <p>Copyright © 2023 Educator. All rights reserved.</p>
                    </div>
                    <div>
                        <span>PRIVACY POLICY</span>
                        <span>SUPPORT</span>
                        <span>TERMS & CONDITION</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
