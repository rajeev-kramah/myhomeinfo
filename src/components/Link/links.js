import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { addLink, deleteLink } from "../../store/Actions/Link";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {Util} from "../../Datamanipulation/Util";
import { useLocation } from "react-router-dom";

const Link = (props) => {
    const location = useLocation();
    console.log("linkDetails",location.state, props.linkDetails)
    let houseId = location.state.house_id ? location.state.house_id : "";

    const [date, setDate] = useState(Util.getCurrentDate("-"));
    const [groupname, setGroupname] = useState("");
    const [urlname, setUrlname] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState('');
    const [house_id, setHouse_id] = useState(houseId);

    useEffect(()=> {
        if(props.linkDetails && props.linkDetails.length > 0) {
            setId(props.linkDetails[0].id);
            setDate(props.linkDetails[0].date);
            setGroupname(props.linkDetails[0].groupname);
            setUrlname(props.linkDetails[0].urlname);
            setDescription(props.linkDetails[0].description);
            setHouse_id(location.state.house_id);
        }
    }, [props.linkDetails])
  
    const handleSubmit = () => {
        let data = {
            "house_id": house_id,
            'id':id,
            "date": date,
            "groupname" : groupname,
            "urlname" : urlname,
            "description" : description,
        }
        
        props.addLink(data);
        props.history.push({
            pathname: "link-list",
            state: {house_id: house_id}
        });
    }

    const handleDelete = () => {
        let data = {
            id: id,
            house_id: house_id
        }
        props.deleteLink(data);
        props.history.push({
            pathname: "link-list",
            state: {house_id: house_id}
        });
    }

    return (
        <div className="container-fluid contact">
            <h4>Links</h4>
            <div className="contact-form">
                <div className="row pb-2">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 house-form pt-25">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Date">Date</label>
                                    <input type="date" placeholder="Date" value={date} onChange={e=> setDate(e.target.value)} className="form-control" />
                                </div>
                            </div>
                          
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Date">Group</label>
                                    <input type="text" placeholder="Group" value={groupname} onChange={e=> setGroupname(e.target.value)} className="form-control" />

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="text" className="required">Url</label>
                                    <input type="text" placeholder="Url" value={urlname} onChange={e=> setUrlname(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Link Description">Url Description</label>
                                    <input type="text" placeholder="Description" value={description} onChange={e=> setDescription(e.target.value)} className="form-control" />
                                </div>
                            </div>
                         
                           
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row footer">
                    <div className="col-md-4">
                        {
                            id ? (
                                <button className="btn btn-default btn-sm addNewItem" onClick={handleDelete}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
                            ):""
                        }
                    </div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                    </div>
                    <div className="col-md-4">
                      
                    </div>
                </div>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    linkDetails: state.Link.linkDetails.data,
});

const mapDispatchToProps = {
    addLink,
    deleteLink
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);