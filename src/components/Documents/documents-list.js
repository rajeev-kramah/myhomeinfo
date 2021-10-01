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
        { name: 'View Document ', selector: 'attachment', sortable: true, },
        { name: 'Action', selector: '', sortable: true, },
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
    const[isOpen, setIsopen] = React.useState(false)
    return (
        <div className="container-fluid loan">
            <div className="list-flex">
                <h4>Documents List</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="loan-inner mt-10">
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
                        <span className="glyphicon glyphicon-plus"> </span> Folder
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
    documents : state.Document.documents.data
});

const mapDispatchToProps = {
    getDocument,
    getSingleDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumntsList);