import React, {useState,useEffect} from 'react';
import "../../style/authentication.css";
import { connect } from "react-redux";
import {getuserAllData} from "../../store/Actions/Authentication";

const MailList = (props) => {
    
    useEffect(()=> {
        if(props.userData && props.userData.length > 0) 
        {
            let data = {
                "sentmailId":"sentmailId"
            }
            props.getuserAllData(data);
        }
      else
	   {
           
        }
    },[]);

  

	

    return (
		<div className="container-fluid">
			<div className="row" id="login-row">
			{	console.log("userdata",props.userData)}
			</div>
		</div>		
	)
}

const mapStateToProps = state => ({
	userData : state.Authentication.userList.data,
});

const mapDispatchToProps = {
	getuserAllData,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MailList);
