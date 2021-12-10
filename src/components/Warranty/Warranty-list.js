import React, { useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getWarranty,getSingleWarranty } from "../../store/Actions/Warranty";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";
const WarrantyList = (props) => {

    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    props.getSingleWarranty({id : "true"})

    const header = ["Product Name", "Installation Date", "Company Name", "Contact Number", "Warranty Details", "Product Price", "Installation Charges", "Warranty End Date"]
    var columns = [
        { 
            name: 'Product Name', 
            selector: 'product_name', 
            sortable: true, 
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "provider", state:{house_id : house_id}}}>{row.product_name}</Link>
        },
        { name: 'Installation Date', selector: 'installation_date', sortable: true, cell: row => Util.dateFormat(row.installation_date) } ,
        { name: 'Company Name', selector: 'installation_company_name', sortable: true, },
        { name: 'Contact Number', selector: 'contact_number', sortable: true, },
        { name: 'Warranty Details', selector: '', sortable: true, cell: row => <span className="glyphicon glyphicon-tasks"></span> },
        { name: 'Product Price', selector: 'product_price', sortable: true,},
        { name: 'Installation Charges', selector: 'installation_charges', sortable: true, },
      ];
      const[isOpen, setIsopen] = React.useState(false)

    return (
        <div className="container-fluid loan">
            <div className="list-flex">
                <h4>Warranty Details List</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="loan-inner">
            <Table header={header} url={"/provider"} columns={columns} getSingleData={props.getSingleWarranty} tableId={"waranty-"+ house_id} data={props.warranties}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/provider",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Warranty
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


const mapStateToProps = (state) => (
    {
    warranties : state.Warranty.warranties.data
});

const mapDispatchToProps = {
    getWarranty,
    getSingleWarranty
}

export default connect(mapStateToProps, mapDispatchToProps)(WarrantyList);