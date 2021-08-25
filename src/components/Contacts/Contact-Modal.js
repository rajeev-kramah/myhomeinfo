import React, { useState, useEffect} from 'react';
import "../../style/Contact.css";
import { addContact } from "../../store/Actions/contact";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {Util} from "../../Datamanipulation/Util";

const CreateContact = (props) => {
    const [groupName, setGroupName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [landline, setLandline] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [statename, setStateName] = useState('');
    const [country, setCountry] = useState((props.houseDetails && props.houseDetails.house) ? props.houseDetails.house[0].country : "");
    const [houseno, setHouseno] = useState('');
    const [mobile, setMobile] = useState('');
    const [url, setUrl] = useState('');
    const [comment, setComment] = useState('');
    const [owner_id, setOwner_id] = useState(JSON.parse(localStorage.getItem('user')).id);
    const [houseId, setHouseId] = useState(props.house_id);
    const [contactId, setContactId] = useState('');
    const [add_to_home_cost, setAdd_to_home_cost] = useState(0);
    const [transaction_type, setTransaction_type] = useState("");
    const [transaction_amount, setTransaction_amount] = useState("0.00");
    const [auto_post, setAuto_post] = useState(0);
    const [posting_frequency, setPosting_frequency] = useState("");
    const [posting_date, setPosting_date] = useState("");
    
    const handleSubmit = () => {
        if(company === "") {
            setCompany(contactPerson);
        }

        let data = {
            "groupname": groupName,
            "contactperson": contactPerson ? contactPerson : company,
            "landline" : landline,
            "email" : email,
            "companyname" : company,
            "houseno" : houseno,
            "mono" : mobile,
            "city" : city, 
            "url" : url,
            "comment" : comment,
            "house_id" : houseId,
            "id": contactId,
            "add_to_home_cost" : add_to_home_cost,
            "streetname" : streetName,
            "statename" : statename,
            "country" : country,
            "transaction_type": transaction_type,
            "transaction_amount": transaction_amount,
            "auto_post": auto_post,
            "posting_frequency": posting_frequency,
            "posting_date": posting_date 

        }
        
        let valid = validate();
        if(valid) {
            props.addContact(data);
            props.toggle();
        }
    }

    const validate = () => {
        if(company === "" || company === undefined) {
            NotificationManager.error("Error Message", "Company Name cannot be empty.");
            return false;
        } else if(email === "" || email === undefined) {
            NotificationManager.error("Error Message", "Email cannot be empty.");
            return false;
        }else if(mobile === "" || mobile === undefined){
            NotificationManager.error("Error Message", "Mobile cannot be empty.");
            return false;
        }
        
        return true;
    }

    const handleClick = () => {
        props.toggle();
    };

    let countries =  Object.keys(Util.countryDetails());
    let state = [];
    if(Util.countryDetails()[country]){
        state = Util.countryDetails()[country]['data'];
    }

    useEffect(()=> {
        if(groupName == "Income") {
            setTransaction_type("Receipt");
        } else if(groupName == "Expenses") {
            setTransaction_type("Payment");
        }
    }, [groupName]);


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

    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };
    
    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };
    
    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
    };
    
    const formatToPhone = (event) => {
        if(isModifierKey(event)) {return;}
    
        // I am lazy and don't like to type things more than once
        const target = event.target;
        const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const zip = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);
    
        if(input.length > 6){target.value = `${zip}-${middle}-${last}`;}
        else if(input.length > 3){target.value = `${zip}-${middle}`;}
        else if(input.length > 0){target.value = `${zip}`;}
    };

    const inputElement1 = document.getElementById('mphoneNumberFormat1');
    if(inputElement1 != null) {
        inputElement1.addEventListener('keydown',enforceFormat);
        inputElement1.addEventListener('keyup',formatToPhone);
    }

    const inputElement2 = document.getElementById('mphoneNumberFormat2');
    if(inputElement2 != null) {
        inputElement2.addEventListener('keydown',enforceFormat);
        inputElement2.addEventListener('keyup',formatToPhone);
    } 

    return(
        <div className="modal">
        <div className="modal_content">
            <span className="close" onClick={handleClick}>&times;</span>
            <div className="inner-popup">
          
            <div className="contact-form">
                <div className="row pt-25">
                <span className="section">Contact Details</span><br></br><br></br>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="group">Group Name</label>
                            <select className="form-control" value={groupName} onChange={e=> setGroupName(e.target.value)} >
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
                                      <React.Fragment>
                                          <option className={className} value={data}>{space}{itemValue}
                                          </option>
                                      </React.Fragment>
                                  )
                                 
                          })):""
                              }
                            </select>
                        </div>
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="company"  className="req">Company Name</label>
                            <input type="text" placeholder="Company Name" value={company} onChange={e=> setCompany(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="contact">Contact Person</label>
                            <input type="text" placeholder="Contact Person" value={contactPerson} onChange={e=> setContactPerson(e.target.value)} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="landline">Landline</label>
                            <input id="mphoneNumberFormat1" maxLength="12" type="text" placeholder="Landline" value={landline} onChange={e=> setLandline(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="mobile" className="req">Mobile No.</label>
                            <input id="mphoneNumberFormat2" maxLength="12" type="text" placeholder="Mobile" value={mobile} onChange={e=> setMobile(e.target.value)} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="url">URL</label>
                            <input type="text" placeholder="URL" value={url} onChange={e=> setUrl(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="email" className="req">Email</label>
                            <input type="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="address">Street No.</label>
                            <input type="text" placeholder="Street No." value={houseno} onChange={e=> setHouseno(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="streetName">Street Name</label>
                            <input type="text" placeholder="Street Name" value={streetName} onChange={e=> setStreetName(e.target.value)} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" placeholder="City" value={city} onChange={e=> setCity(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="state">State/Province</label>
                            <select className="form-control" value={statename} onChange={e=> setStateName(e.target.value)} >
                                <option value="" disabled>Select</option>
                                    {
                                                
                                        state ? (state.map(state=> {
                                            return(
                                                <option value={state}>{state}</option>
                                                    )
                                                }) 
                                                ):""
                                                }
                            </select>
                        </div>
                    </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <select className="form-control" value={country} disabled onChange={e=> setCountry(e.target.value)} >
                                    <option value="" disabled>Select</option>
                                    {
                                    countries.map(country=> {
                                        return(
                                            <option value={country}>{country}</option>
                                        )
                                    }) 
                                    }
                                </select>
                            </div>
                        </div>
                        </div>
                       
                        <div className="row">
                            <hr/>
                           <span className="section">Transaction Details</span><br></br><br></br>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="transaction_type">Transaction Type</label>
                                    <input type="text" placeholder="" value={transaction_type} onChange={e=> setTransaction_type(e.target.value)} className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="transaction_amount">Transaction Amount</label>
                                    <input type="text" placeholder="Transaction Amount" value={transaction_amount} onChange={e=> setTransaction_amount(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="posting_frequency">Posting Frequency</label>
                                    <select className="form-control" value={posting_frequency} onChange={e=> setPosting_frequency(e.target.value)} >
                                        <option value="" disabled>Select</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="posting_date">Posting Date</label>
                                    <select className="form-control" value={posting_date} onChange={e=> setPosting_date(e.target.value)} >
                                        <option value="" disabled>Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                <div class="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="comment">Additional Details / Comments</label>
                            <input type="text" placeholder="Additional Details / Comments" value={comment} onChange={e=> setComment(e.target.value)} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <input type="radio" className="checkbox-inline" id="homecost" name="homecost" value={add_to_home_cost} onChange={e=> setAdd_to_home_cost(add_to_home_cost  == 0 ? 1 : 0)}  checked={add_to_home_cost === 1 ? "checked" : false}/> 
                            <label className="checkbox-inline" id="home">Add To Home Cost</label>
                    </div> 
                    <div className="col-md-4">
                        <label className="checkbox-inline" id="post">
                            <input type="checkbox" name="post" value={auto_post} onChange={e=> setAuto_post(auto_post  == 0 ? 1 : 0)}  checked={auto_post === 1 ? "checked" : false}/>Auto Post
                        </label>
                    </div>
                </div>
            </div>
        </div>
                <div className="row footer">
                    <div className="col-md-5"></div>
                    <div className="col-md-2 pt-pb-10">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-2 pt-pb-10"></div>
                </div>
        </div>
    </div>
    )
}


const mapStateToProps = (state) => ({
    houseDetails: state.House.houseDetail.data,
    groupDetails: state.Contact.groups.data,
});

const mapDispatchToProps = {
    addContact

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContact);