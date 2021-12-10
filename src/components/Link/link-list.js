import React, { useState } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link, useHistory } from "react-router-dom";
import { getLink,getSingleLink } from "../../store/Actions/Link";
import { Util } from "../../Datamanipulation/Util";
import Table from "../../Reusable/Table";

const LinkList = (props) => {
    let history = useHistory();
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const [active, setActive] = useState("Home");

    const header = ["Name", "Description", "Group", ];
    var columns = [
        { name: 'Added Date', selector: 'date', sortable: true, cell: row => Util.dateFormat(row.date) },
        { name: 'Group', selector: 'groupname', sortable: true, },
        { name: 'Description', selector: 'description', sortable: true, },
        { 
        name: 'Url Name', 
        selector: 'urlname', 
        sortable: true,
             cell: row => <a href={row.urlname} target="_blank">{row.urlname}</a>,

        },
        { name: 'Actions', selector: '', sortable: true, 
        cell: row => <a href="javascript:void(0)" onClick={()=>handleEdit(row)}><i className="glyphicon glyphicon-edit"></i></a>},
        // { name: 'Actions', selector: '', sortable: true },
      ];

    const handleEdit = (row) => {
        history.push({
            pathname: '/link',
            state:{house_id : house_id}
        });
        var data = {"id":row.id};
        props.getSingleLink(data);
    //    return (
    //     <Link data-tag="allowRowEvents" role="link" to={{pathname : "link", state:{house_id : house_id}}}>
    //         {row.urlname}
    //     </Link>
    //    )
    }

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
    const[isOpen, setIsopen] = React.useState(false)
    return (
        <div className="container-fluid loan">
            <div className="list-flex">
                <h4>Links List</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="loan-inner mt-10">
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
            {isOpen === true &&
                <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" den="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" className="close" onClick={() => setIsopen(false)}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </div>
                        </div>
                    </div>
                </div>
            }
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