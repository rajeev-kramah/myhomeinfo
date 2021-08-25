import React from 'react';
import "../../style/authentication.css";
import img1 from "./login.webp";
import logo from "../../Logo.png";
import { Link } from "react-router-dom";

export default function Leftbar() {

    return (
        <React.Fragment>
            <div className="">
                {/* <label className="primary-button">Provia</label>
                <label className="primary-color">Homes</label> */}
                <Link to="/">
                    <img src={logo} className="logo-img" />
                </Link>
            </div>

            <div className="left_padding tc">
                <img src={img1} className="login_home_img" />
                <p className="primary-color fb pb-30 pt-15">It is a long established fact that a reader will be distracted by the readable </p>
                <p className="">content of a page when looking at its layout. The point of using Lorem Ipsum is</p>
                <p className="">that it has a more-or-less normal distribution of letters, as opposed to using </p>
                <p className=""> 'Content here, content here', making it look like readable English.</p>
            </div>
        </React.Fragment>
        
    )

}
