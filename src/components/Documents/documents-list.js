import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getDocument,getSingleDocument } from "../../store/Actions/Document";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const DocumntsList = (props) => {
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const [active, setActive] = useState("Home Documents");
    const [documents, setDocuments] = useState([]);
    
    props.getSingleDocument({id: "true"});
    
    const header = ["Document Name", "Document Date", "Description", "Attachment"];
    
    var columns = [
        { 
            name: 'Folder Name', 
            selector: 'docname', 
            sortable: true, 
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "document", state:{house_id : house_id}}}>{row.docname}</Link>
        },
        { name: 'Upload Date', selector: 'date', sortable: true, cell: row => Util.dateFormat(row.date)},
        { name: 'Description', selector: 'description', sortable: true, },
        // { name: 'View Document', selector: 'attachment', sortable: true, },
        // { name: 'Actions', selector: '', sortable: true },
      ];


      useEffect(()=>{
        if(props.documents){
            let doc = [];
            for(let i=0; i<props.documents.length; i++){
                if(props.documents[i]["category"] == "Home Documents"){
                    doc.push(props.documents[i]);
                }
            }
            setDocuments(doc)
        }
      },[props.documents])

    const handleDocType = (type) => {
        setActive(type);
        let doc = [];
        if(props.documents && props.documents.length > 0) {
            for(let i=0; i<props.documents.length; i++){
                if(props.documents[i]["category"] == type){
                    doc.push(props.documents[i]);
                }
            }
        }
        setDocuments(doc);
    }

    return (
        <div className="container-fluid loan">
            <h4>Documents List</h4>
            <div className="loan-inner mt-25">
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className={active === "Home Documents"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType("Home Documents")}>Home</span>
                        <span className={active === "Personal"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType("Personal")}>Personal</span>
                        <span className={active === "Others"? "active-bar mr-50": "mr-50"} onClick={(e) => handleDocType("Others")}>Other</span>
                    </div>
                </div>
            {/* <ul className="nav nav-pills">
                <li role="presentation" onClick={()=>handleDocType("Home Documents")} className={active == "Home Documents" ? "active":""}><Link  to={{
                            pathname : "/document-list",
                            state : {house_id : house_id}
                        }}>Home</Link></li>
                <li role="presentation"className={active == "Personal" ? "active":""} onClick={()=>handleDocType("Personal")}><Link  to={{
                            pathname : "/document-list",
                            state : {house_id : house_id}
                        }}>Personal</Link></li>
                <li role="presentation" className={active == "Others" ? "active":""} onClick={()=>handleDocType("Others")}><Link  to={{
                            pathname : "/document-list",
                            state : {house_id : house_id}
                        }}>Other</Link></li>
            </ul> */}
            <Table header={header} url={"/document"} columns={columns} getSingleData={props.getSingleDocument} tableId="documents" data={documents}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/document",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Document
                    </Link>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    documents : state.Document.documents.data
});

const mapDispatchToProps = {
    getDocument,
    getSingleDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumntsList);