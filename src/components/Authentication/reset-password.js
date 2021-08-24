import React, { useState, useEffect } from 'react';
import "../../style/authentication.css";
import { NotificationManager } from "react-notifications";
import Leftbar from "./leftbar";
import { resetPassword } from "../../store/Actions/Authentication";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ResetPassword = (props) => {

    const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
		let data = {
			'email': email,
			'password': newPassword
		}
		let valid = validate();
		if(valid) {
			props.resetPassword(data);
		}
	}

	useEffect(()=> {
		if(props.user.status === 200) {
			setTimeout(() => {
				props.history.push("/");
			}, 5000)
		}
	}, [props.user])

	const validate = () => {
		if(email.length === 0) {
			NotificationManager.error('Error message', 'Invalid URL.');
            return false;
		} else if(newPassword.length === 0) {
			NotificationManager.error('Error message', 'New password cannot be empty.');
            return false;
		} else if(newPassword.length < 6) {
			NotificationManager.error('Error message', 'New password should be atleast 6 character long.');
            return false;
		} else if(newPassword != confirmPassword) {
			NotificationManager.error('Error message', 'New password and confirm password are not same.');
            return false;
		}
		return true;
	}

    return (
        <div className="container-fluid">
			<div className="row" id="login-row">
				<div className="col-md-6 login_left">
					<Leftbar />
				</div>
				
				<div className="col-md-6 login_right right_padding">
					<div className="row">

						<div className="col-md-3"></div>
						<div className="col-md-6">
							<h4 className="tc pb-30">Reset Password</h4>

							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input type="email" placeholder="Please Enter Email" value={email} onChange={e=> setEmail(e.target.value)} className="form-control" />
							</div>

							<div className="form-group">
								<label htmlFor="newPassword">New Password</label>
								<input type="password" placeholder="New Password" value={newPassword} onChange={e=> setNewPassword(e.target.value)} className="form-control" />
							</div>

							<div className="form-group">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} className="form-control" />
							</div>

							<div className="form-group">
								<buttom className="btn login-btn fb" onClick={handleSubmit} >Submit</buttom>
							</div>

							<div className="form-group tc">
								<Link to="/" className="primary-button" >Go to Sign in page</Link>
							</div>
						</div>
						<div className="col-md-3"></div>
					</div>					
				</div>
			</div>
		</div>
    )
}

const mapStateToProps = state => ({
	user: state.Authentication.user
});

const mapDispatchToProps = {
	resetPassword
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetPassword);
