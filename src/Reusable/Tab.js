import React from 'react';
import { Link } from "react-router-dom";
const Tab = (props) => {
    return (
        <div className="row house-header">
            <div className="col-md-1"></div>
            <div className="col-md-10 t15" align="center">
                <div className="row tabContainer">
                    <>
                        {
                            props.id ? (
                                props.tabs.map((tab, index)=>{
                                    return(
                                        <div className="tab">
                                            <Link to={{pathname : tab.pathname, state : {house_id : props.house_id}}}>
                                                <label className={ props.loanPage === tab.label ? "active" : "inactive" } id="numbers" > {index+1} </label>
                                                <label className={ props.loanPage === tab.label ? "active-title" : "inactive-title" } id="tab-title">{tab.label} </label>  
                                            </Link> 
                                        </div>
                                    )
                                })
                            ) : (
                                props.tabs.map((tab, index)=>{
                                    return(
                                        <div className="tab">
                                            <Link to={{pathname : props.tabs[0]['pathname'], state : {house_id : props.house_id}}}>
                                                <label className={ props.loanPage === tab.label ? "active" : "inactive" } id="numbers" > {index+1} </label>
                                                <label className={ props.loanPage === tab.label ? "active-title" : "inactive-title" } id="tab-title">{tab.label} </label>  
                                            </Link> 
                                        </div>
                                    )
                                })
                            )
                           
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default Tab;