import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const InnerNavbar = (props) => {
    const [house_id, setHouse_id] = useState("");
    
    const updateHouse = (id) => {
        setHouse_id(id);
    }

    return (
        <li className={house_id === props.house.id ? "dropdown houseDropDown house-selected" : "dropdown houseDropDown"} >
            <NavLink
                to="/"
                className="dropdown-toggle header-color "
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <span className="navinner"> {props.house.streetname} </span>
                <span className="caret" />
            </NavLink>
            <ul className="dropdown-menu header-color">
                <li>
                    <NavLink to={{
                        pathname : "/contact",
                        state : {house_id : props.house.id}
                    }} onClick={() => updateHouse(props.house.id)}>
                        Contacts
                    </NavLink>
                </li>
                <li>
                    <NavLink to={{
                        pathname : "/loan-list",
                        state : {house_id : props.house.id}
                    }} onClick={()=> updateHouse(props.house.id)}>
                        Loans
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}


export default InnerNavbar;