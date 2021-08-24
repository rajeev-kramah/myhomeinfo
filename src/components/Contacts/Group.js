import React, { useState } from "react";
import { connect } from "react-redux";
import { addGroup,getGroup } from "../../store/Actions/contact";
import { Link } from "react-router-dom";
const Group = (props) => {

    const [group, setGroup] = useState('');
    const [subgroup, setSubgroup] = useState('');
    
    const handleSubmit = () => {
        let data = {
            "group": group  ? group : "Income",
            "subgroup": subgroup,
            "house_id": props.house_id
        }
        
        props.addGroup(data);
        props.getGroup();
        props.toggle();
      
    }

    const handleClick = () => {
        props.toggle();
    };


        var groupData = ['Income', "Expenses"];
        var highLight = [];
        if(props.groupDetails){
            for(let i=0; i<props.groupDetails.length; i++){
                if(props.groupDetails[i]['subgroup'] != "Income" && props.groupDetails[i]['subgroup'] != "Expenses"){
                    let item = props.groupDetails[i]['groupname']+"&"+props.groupDetails[i]['subgroup'];
                    let checkItem = groupData.indexOf(props.groupDetails[i]['groupname'])
                    groupData.splice(checkItem+1, 0, item );
                }
               
            }
        }


        console.log(groupData)

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={handleClick}>&times;</span>
                <div className="inner-popup">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <label className="title">Add/View Group</label>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row pt-25">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="parent">Parent Group</label>
                                <select className="form-control select-css" value={group} onChange={e=> setGroup(e.target.value)} >
                                { 

                                     groupData ? (groupData.map((data,index)=>{
                                            let space = "";
                                            let className = "";
                                            if(highLight.indexOf(index)){
                                                className="parent" 
                                            }
                                            let item = data.split("&");
                                            let itemValue = item[item.length-1]
                                            if(data.subgroup != "Income" &&  data.subgroup != "Expenses"){
                                                if(data.split("&").length == 2){
                                                    space = "--"
                                                }
    
                                                if(data.split("&").length == 3){
                                                    space = "----"
                                                }
    
                                                if(data.split("&").length == 4){
                                                    space = "------"
                                                }
                                                if(data.split("&").length == 5){
                                                    space = "--------"
                                                }
                                                if(data.split("&").length == 6){
                                                    space = "----------"
                                                }
                                                if(data.split("&").length == 7){
                                                    space = "------------"
                                                }
                                            }
                                          
                                            return( 
                                                <>
                                                    <option className={className} value={data}>{space}{itemValue}
                                                    </option>
                                                </>
                                            )
                                           
                                    })):""
                                  
                                }
                            </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="group">Group Name</label>
                                <input type="text" value={subgroup} onChange={e=> setSubgroup(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary btn-sm mt-25" onClick={handleSubmit}>Add Group</button>
                        </div>
                    </div>
                </div>
                <div className="inner-popup mt-25">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <label className="title">Groups</label>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    groupDetails: state.Contact.groups.data,
});

const mapDispatchToProps = {
    addGroup,
    getGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);