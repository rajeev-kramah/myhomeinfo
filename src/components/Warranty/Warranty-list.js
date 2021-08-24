import React, { useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getWarranty,getSingleWarranty } from "../../store/Actions/Warranty";
import Table from "../../Reusable/Table";

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
        { name: 'Installation Date', selector: 'installation_date', sortable: true, },
        { name: 'Company Name', selector: 'installation_company_name', sortable: true, },
        { name: 'Contact Number', selector: 'contact_number', sortable: true, },
        { name: 'Warranty Details', selector: 'comments', sortable: true },
        { name: 'Product Price', selector: 'product_price', sortable: true,},
        { name: 'Installation Charges', selector: 'installation_charges', sortable: true, },
        { name: 'Warranty End Date', selector: 'extended_warranty_end_date', sortable: true, },
      ];

    return (
        <div className="container-fluid loan">
            <h4>Warranty Details List</h4>
            <div className="loan-inner mt-25">
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
        </div>
    )
}


const mapStateToProps = (state) => ({
    warranties : state.Warranty.warranties.data
});

const mapDispatchToProps = {
    getWarranty,
    getSingleWarranty
}

export default connect(mapStateToProps, mapDispatchToProps)(WarrantyList);