import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../style/authentication.css";
import { NotificationManager } from "react-notifications";
import Leftbar from "./leftbar";
import { Link } from "react-router-dom";
import { login } from "../../store/Actions/Authentication";


const Login =  (props) => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		let data = {
			'email': username,
			'password': password
		}
		let valid = validate(data);
		
		if(valid){
			props.login(data);
				}
	}

	const validate = (data) => {
        if(data.email.length === 0) {
            NotificationManager.error('Error message', 'Email cannot be empty.');
            return false;
        } else if(data.password.length === 0) {
            NotificationManager.error('Error Message', 'Password cannot be empty.');
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
							<h4 className="tc pb-30">Login</h4>

							<div className="form-group">
								<label htmlFor="username">Email</label>
								<input type="email" placeholder="Email" value={username} onChange={e=> setUsername(e.target.value)} className="form-control" />
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} className="form-control" />
							</div>

							<div className="form-group">
								<buttom className="btn login-btn fb" onClick={handleSubmit} >Login</buttom>
							</div>

							<div className="form-group tc">
								<Link to="/forgot" className="primary-button" >Forgot Password?</Link>
							</div>

							<div className="form-group tc">
								<p className="pt-30" >Not registered yet? <Link to="/signup" className="primary-button"> Create an Account</Link></p>
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
})

const mapDispatchToProps = {
	login
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
