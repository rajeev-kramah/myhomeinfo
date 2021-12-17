import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../style/authentication.css";
import { NotificationManager } from "react-notifications";
import Leftbar from "./leftbar";
import {signup,resetUser} from "../../store/Actions/Authentication";
import { Link } from "react-router-dom";
import {Util} from "../../Datamanipulation/Util";


const Signup =  (props) => {
	const generate_random_string = (string_length) => {
		let random_string = "";
		let random_ascii;
		let ascii_low = 65;
		let ascii_high = 90;
		for (let i = 0; i < string_length; i++) {
		  random_ascii = Math.floor(
			Math.random() * (ascii_high - ascii_low) + ascii_low,
		  );
		  random_string += String.fromCharCode(random_ascii);
		}
		return random_string;
	  };
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [house, setHouse] = useState('');
	const [street, setStreet] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [city, setCity] = useState('');
	const [stateName, setStateName] = useState('');
	const [country, setCountry] = useState('');
	const [referred, setReferred] = useState('');
	const [subStartDate, setSubStartDate] = useState('');
	const [subEndDate, setSubEndDate] = useState('');
	const [address, setAddress] = useState('');

	const handleSubmit = async () => {
		let data = {
			"name" : name,
			"email" : email,
			"username" : username.trim(),
			"houseno" : house,
			"street" : street,
			"zipcode" : zipcode,
			"city" : city,
			"statename" : stateName,
			"country" : country,
			"refferedby" : referred,
			"substartdate" : subStartDate,
			"subenddate" : subEndDate,
			"mono" : mobile,
			"password" : password,
			"address" : address,
			"bucket_name": username.trim() + generate_random_string(4) 
		}
		let valid = validate(data);
		if(valid) {
			props.signup(data);
		}
	}

	const validate = (data) => {
        if(data.username.length === 0) {
            NotificationManager.error('Error message', 'Username cannot be empty.');
            return false;
        } else if(data.password.length === 0) {
            NotificationManager.error('Error Message', 'Password cannot be empty.');
            return false;
        } else if(data.password.length < 6) {
            NotificationManager.error('Error Message', 'Password should be atleast 6 characters long.');
            return false;
        } else if(data.name.length === 0) {
            NotificationManager.error('Error Message', 'Name cannot be empty.');
            return false;
        } else if(data.email.length === 0) {
            NotificationManager.error('Error Message', 'Email cannot be empty.');
            return false;
		} else if(data.mono.length === 0) {
            NotificationManager.error('Error Message', 'Mobile number cannot be empty.');
            return false;
		// } else if(data.address.length === 0) {
        //     NotificationManager.error('Error Message', 'Address cannot be empty.');
        //     return false;
		// } else if(data.zipcode.length === 0) {
        //     NotificationManager.error('Error Message', 'Zipcode cannot be empty.');
        //     return false;
		// } else if(data.substartdate.length === 0) {
        //     NotificationManager.error('Error Message', 'Subscription start date cannot be empty.');
        //     return false;
		// } else if(data.subenddate.length === 0) {
        //     NotificationManager.error('Error Message', 'Subscription end date cannot be empty.');
        //     return false;
		}
        return true;        
    }

	let countries =  Object.keys(Util.countryDetails());
    let state = [];
    if(Util.countryDetails()[country]){
        state = Util.countryDetails()[country]['data'];
	}

	useEffect(()=> {
		if(props.user.status === 200 && props.user.statusText == "Congratulation ! You have succefully registered !") {
			setTimeout(() => {
				props.history.push("/");
				props.resetUser();
			}, 5000)
		}
	}, [props.user])

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
    
    const inputElement = document.getElementById('phoneNumberFormat');
    if(inputElement != null) {
        inputElement.addEventListener('keydown',enforceFormat);
        inputElement.addEventListener('keyup',formatToPhone);
    }

	const onAddressChange = (e) =>{
		setAddress(e.target.value)
	}

	useEffect(()=>{
		setAddress(`${house} ${street} ${zipcode} ${city} ${stateName} ${country}`)
	},[house, street, zipcode, city, stateName, country ])

	return (
		

		<div className="container-fluid para">

			<div className="row" id="login-row">
				<div className="col-md-6 login_left">
					<Leftbar />
				</div>

				<div className="col-md-6 login_right right_padding pt-4">
					<div className="row">
						<div className="col-md-4"></div>
						<div className="col-md-4">
							<h4 className="tc pb-30">Sign Up</h4>
						</div>
						<div className="col-md-4"></div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="name" className="req">Name</label>
								<input type="text" className="form-control" id="name" placeholder="Name" value={name} onChange={e=> setName(e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="mobile" className="req">Mobile Number</label>
								<input id="phoneNumberFormat" maxLength="12" type="text" className="form-control" placeholder="Mobile Number" value={mobile} onChange={e=> setMobile(e.target.value)}/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="username" className="req">Username</label>
								<input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={e=> setUsername(e.target.value)}/>
							</div>
						</div>
					</div>

							{/* <div className="form-group">
								<label htmlFor="subStartDate">Subscription Start Date</label>
								<input type="date" className="form-control" id="subStartDate" value={subStartDate} onChange={e=> setSubStartDate(e.target.value)}/>
							</div>							 */}
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="email" className="req">Email Address</label>
								<input type="email" className="form-control" id="email" placeholder="Email Address" value={email} onChange={e=> setEmail(e.target.value)}/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="password" className="req">Password</label>
								<input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)}/>
							</div>
						</div>

							

							{/* <div className="form-group">
								<label htmlFor="referred">Referred By</label>
								<input type="text" className="form-control" id="referred" value={referred} onChange={e=> setReferred(e.target.value)}/>
							</div>

							<div className="form-group">
								<label htmlFor="subEndDate">Subscription End Date</label>
								<input type="date" className="form-control" id="subEndDate" value={subEndDate} onChange={e=> setSubEndDate(e.target.value)}/>
							</div>										 */}
						</div>
					<div className="row">
						<div className="col-md-3">
							<div className="form-group">
								<label htmlFor="house">House Number</label>
								<input type="text" placeholder="House No." value={house} onChange={e=> setHouse(e.target.value)} className="form-control" />
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="street">Street Name</label>
								<input type="text" placeholder="Street Name" value={street} onChange={e=> setStreet(e.target.value)} className="form-control" />
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label htmlFor="street">Zip Code</label>
								<input type="text" placeholder="Zip Code" value={zipcode} onChange={e=> setZipcode(e.target.value)} className="form-control" />
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
							<label htmlFor="country">State/Province</label>
							<select className="form-control" value={stateName} onChange={e=> setStateName(e.target.value)} >
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
							<select className="form-control" value={country} onChange={e=> setCountry(e.target.value)} >
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
				<div className="row" style={{paddingLeft:"15px",addingRight:"18px"}}>
					<div className="form-group">
						<label htmlFor="address">Address</label>
						<input type="text" placeholder="Enter Address" value={address} onChange={e => onAddressChange(e)} className="form-control" />
					</div>
				</div>
					

					<div className="row">
						<div className="col-md-3"></div>
						<div className="col-md-6">
							<div className="form-group">
								<buttom className="btn login-btn fb" onClick={handleSubmit} >Sign Up</buttom>
							</div>

							<div className="form-group tc">
								<span className="ml-15" >Already registered? 
									<Link to="/" className="primary-button"> Go to Sign In page</Link>
								</span>
							</div>
							<div className="signup-footer"></div>
						</div>
						<div className="col-md-3"></div>
					</div>
					
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	user : state.Authentication.user,
	responseError : state.responseError
});

const mapDispatchToProps = {
	signup,
	resetUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);