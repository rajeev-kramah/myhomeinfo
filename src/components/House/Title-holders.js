import React, { useState,useEffect} from 'react';
import "../../style/House.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { addTitleHolder } from "../../store/Actions/house";
import Tab from "../../Reusable/Tab";
import { useHistory } from 'react-router-dom';

const TitleHolders = (props) => {
    const [title1, setTitle1] = useState(JSON.parse(localStorage.getItem('user')).name);
    const [title2, setTitle2] = useState('');
    const [title3, setTitle3] = useState('');
    const [title4, setTitle4] = useState('');
    const [houseId, setHouseId] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();
    useEffect(()=> {
        if( props.houseDetails && props.houseDetails.house.length > 0 && props.houseDetails.titleholders.length > 0){
            setTitle1(props.houseDetails.titleholders[0].titleholder1);
            setTitle2(props.houseDetails.titleholders[0].titleholder2);
            setTitle3(props.houseDetails.titleholders[0].titleholder3);
            setTitle4(props.houseDetails.titleholders[0].titleholder4);
            setId(props.houseDetails.titleholders[0].id);
        } 
        
        if(props.houseDetails && props.houseDetails.house.length > 0){
            setHouseId(props.houseDetails.house[0].id);
            let user = JSON.parse(localStorage.getItem("user"));
            user.housecount = props.houseDetails.house.length;
            localStorage.setItem('user', JSON.stringify(user));
        }
    },[props.houseDetails])

    const handleSubmit = () => {
        let data = {
            'titleholder1': title1,
            'titleholder2': title2,
            'titleholder3': title3,
            'titleholder4': title4,
            'house_id': houseId,
            'id': id
        }
        if(title1 != '' || title2 != '' || title3!= '' || title4 != ''){
            props.addTitleHolder(data);
            history.push('/hoa-detail');
        } else {
            NotificationManager.info("Error Message", "Title Holder should not be empty.");
        }
    }

    const handlePrevious = () => {
        props.history.push('/house-details');
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
            <h4>Title Holders Details</h4>
            <div className="house-form">
                <Tab loanPage="Title Holders" tabs={tabs} id={id} house_id={houseId}/>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-6 house-form ">
                       <div className="row">
                         <div className="col-md-6">
                            <div className="form-group ">
                                <label htmlFor="title1">Title Holder 1</label>
                                <input type="text" placeholder="Title Holder" value={title1} onChange={e=> setTitle1(e.target.value)} className="form-control" />
                            </div>
                        
                    
                            <div className="form-group ">
                                <label htmlFor="title2">Title Holder 2</label>
                                <input type="text" placeholder="Title Holder" value={title2} onChange={e=> setTitle2(e.target.value)} className="form-control" />
                            </div>
                        
                    
                            <div className="form-group ">
                                <label htmlFor="title3">Title Holder 3</label>
                                <input type="text" placeholder="Title Holder" value={title3} onChange={e=> setTitle3(e.target.value)} className="form-control" />
                            </div>
                        
                    
                            <div className="form-group ">
                                <label htmlFor="title4">Title Holder 4</label>
                                <input type="text" placeholder="Title Holder" value={title4} onChange={e=> setTitle4(e.target.value)} className="form-control" />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                </div>
                <div className="row footer ">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                            <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
                            <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    houseDetails : state.House.houseDetail.data
})

const mapDispatchToProps = {
    addTitleHolder
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleHolders);