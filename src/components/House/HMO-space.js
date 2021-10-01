import React, { useState,useEffect } from 'react';
import "../../style/House.css";
import { Link } from "react-router-dom";
import { addHMOSpace, deleteHmo } from "../../store/Actions/house";
import { connect } from "react-redux";
import Tab from "../../Reusable/Tab";

const HMOSpace = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [houseId, setHouseId] = useState(props.houseDetails && props.houseDetails.house.length > 0 ? props.houseDetails.house[0].id : "");
    const [id, setId] = useState("");
   
    useEffect(()=> {
        if(props.houseDetails && props.houseDetails.house.length > 0 && props.houseDetails.hmodetails.length > 0){
            setHouseId(props.houseDetails.house[0].id);
            setId(props.houseDetails.hmodetails[props.houseDetails.hmodetails.length-1].id);
            // setName(props.houseDetails.hmodetails[props.houseDetails.hmodetails.length-1].name);
            // setDescription(props.houseDetails.hmodetails[props.houseDetails.hmodetails.length-1].description);
        } 
        if(props.houseDetails && props.houseDetails.house.length > 0){
            setHouseId(props.houseDetails.house[0].id);
        } 
    },[props.houseDetails])

    const handleSubmit = () => {
        let data = {
            "name": name,
            "description": description,
            "house_id": houseId,
           // "id" : id
        }

        let valid = validate();
        if(valid) {
            props.addHMOSpace(data);
        }
        setName("");
        setDescription("");
    }

     const goTODashboad = () => {
        props.history.push("/dashboard")
    }

    const handleSave= () =>{
        props.history.push("/dashboard")
    }

    const validate = () => {
        return true;
    }

    const handlePrevious = () => {
        props.history.push('/realtor-detail');
    } 

    const handleDeleteHmo = (id) => {
        let data = {
            id: id,
            house_id: houseId
        }
        props.deleteHmo(data);
        let i = -1;
        props.houseDetails.hmodetails.map((item, index)=> {
            if(item.id === id) {
                i = index;
            }
        });
        
        if(i > -1) {
            props.houseDetails.hmodetails.splice(i,1);
        }
    }

    const tabs = [
        {pathname : "/house-details", label : "Home Details"},
        {pathname : "/title-holders", label : "Title Holders"},
        {pathname : "/hoa-detail", label : "HOA Details"},
        {pathname : "/realtor-detail", label : "Realtor Details"},
        {pathname : "/hmo-space", label : "HMO Spaces"},
    ]

    return (
        <div className="container-fluid house">
            <h4>Property Details</h4>
            <div className="house-form">
               <Tab loanPage="HMO Spaces" tabs={tabs} id={id} house_id={houseId}/>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 house-form ">
                        <div className="row ">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="name">Space Name</label>
                                    <input type="text" placeholder="HMO Space Name" value={name} onChange={e=> setName(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="description">Space Description</label>
                                    <input type="text" placeholder="HMO Space Description" value={description} onChange={e=> setDescription(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-2 addHmo">
                                <button className="btn btn-primary btn-sm" onClick={handleSubmit}><span className="glyphicon glyphicon-plus"></span> ADD</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row ">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 house-form">
                        <table className="row table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    props.houseDetails && props.houseDetails.hmodetails ? props.houseDetails.hmodetails.map((data)=>{
                                        return(<tr key={data.id}>
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>
                                            <td>
                                                <Link to={"/hmo-space"} className="btn btn-default" onClick={()=>handleDeleteHmo(data.id)}><span className="glyphicon glyphicon-remove"></span></Link>
                                            </td>
                                         </tr>
                                        )
                                    }) : ""
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row footer ">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSave}>SAVE</button>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                            <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
                            <button type="button" class="btn btn-default btn-sm addNewItem disable" disabled="disabled">Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    houseDetails : state.House.houseDetail.data
});

const mapDispatchToProps = {
    addHMOSpace,
    deleteHmo
}

export default connect(mapStateToProps, mapDispatchToProps)(HMOSpace);
