import React, {useState} from 'react';
import "../../style/authentication.css";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Leftbar from "./leftbar";
import { Link } from "react-router-dom";
import { forget } from "../../store/Actions/Authentication";

const Forgot = (props) => {

    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
		let data = {
			'email' : email
		}
		let valid = validate(data);
		if(valid){
			props.forget(data);
		}
	}

	const validate = (data) => {
        if(data.email.length === 0) {
            NotificationManager.error('Error message', 'Email cannot be empty.');
            return false;
        } else {
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!data.email.match(mailformat)) {
				NotificationManager.error('Error message', 'Invalid Email.');
                return false;
            }
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
							<h4 className="tc pb-30">Forget Password</h4>

							<div className="form-group">
								<label htmlFor="email">Email Id</label>
								<input type="text" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)} className="form-control" />
							</div>

							<div className="form-group">
								<buttom className="btn login-btn fb" onClick={handleSubmit} >Submit</buttom>
							</div>

							<div className="form-group tc">
								<Link to="/" className="primary-button" >Go to Sign in page</Link>
							</div>

							<div className="form-group tc">
								<p className="pt-30 ml-15" >Not registered yet? 
									<Link to="/signup" className="primary-button"> Create an Account</Link>
								</p>
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
});

const mapDispatchToProps = {
	forget
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Forgot);
