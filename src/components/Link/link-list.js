import React, { useState } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getLink,getSingleLink } from "../../store/Actions/Link";
import Table from "../../Reusable/Table";

const LinkList = (props) => {
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const [active, setActive] = useState("Home");

    const header = ["Name", "Description", "Group", ];
    var columns = [
        { 
            name: 'Url Name', 
            selector: 'urlname', 
            sortable: true,
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "link", state:{house_id : house_id}}}>{row.urlname}</Link>
        },
        { name: 'Added Date', selector: 'date', sortable: true, },
        { name: 'Group', selector: 'groupname', sortable: true, },
        { name: 'Description', selector: 'description', sortable: true, },
        // { name: 'Actions', selector: '', sortable: true },
      ];

    const handleDocType = (type) => {
        setActive(type);
        let doc = [];
        if(props.links && props.links.length > 0) {
            for(let i=0; i<props.links.length; i++){
                if(props.links[i]["category"] == type){
                    doc.push(props.links[i]);
                }
            }
        }
    }

    return (
        <div className="container-fluid loan">
            <h4>Links List</h4>
            <div className="loan-inner mt-25">
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className={active === "Home"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType("Home")}>Home</span>
                        <span className={active === "Personal"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType("Personal")}>Personal</span>
                        <span className={active === "Other"? "active-bar mr-50": "mr-50"} onClick={(e) => handleDocType("Other")}>Other</span>
                    </div>
                </div>
                <Table header={header} url={"/Link"} columns={columns} getSingleData={props.getSingleLink} tableId="Links" data={props.links}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/link",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Link
                    </Link>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    links : state.Link.links.data
});

const mapDispatchToProps = {
    getLink,
    getSingleLink
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList);