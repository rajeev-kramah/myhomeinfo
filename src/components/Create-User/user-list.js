import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import {getuserAllData,getsingleUser,activateUser,deActivateUser,deleteUser} from "../../store/Actions/Authentication";
import Table from "../../Reusable/Table";


const UserList = (props) => {
   const [id, setId] = useState('')
   const [isOpen, setIsopen] = useState(false)

    useEffect(()=> {
        if(props.userData && props.userData.length > 0) 
        {
            // setId(props.userData[0].id)
        }
      else {
            let data = {
                "id":id
            }
            props.getuserAllData(data);
        }
    },[props.userData]);
   
// DeActive User //
    const handleDeactiveUser =(Id)=>{
        let data = {
            "id": Id,
        }
        props.deActivateUser(data)
    }

// Active User //
    const handleActiveUser =(Id)=>{
        let data = {
            "id": Id,
        }
        props.activateUser(data)
    }

// Delete User
    const handleDeleteUser = (Id) => {
        let data = {
            "id": Id,
        }
        props.deleteUser(data);
    }

    const header = ["First Name", "Last Name", "Email Address", "Username", "Subscription Start Date", "Subscription End Date", "Space Usage", 'No. of House','User Status','Renewal Pending Date'];

    var columns = [
        { 
            name: 'Status', 
            selector: 'account_status', 
            sortable: true, 
            cell: row => 
            row.account_status === "Active" ? <i class="glyphicon glyphicon-ok active_color"></i> :<i class="glyphicon glyphicon-ok deactive_color"></i>
        },
        {
            name: 'First Name',
            selector: 'name',
            sortable: true,
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{ pathname: "edit-user", state: { id: row.id } }}>{row.name}</Link>
        },
        { name: 'Last Name', selector: 'lastname', sortable: true, },
        { name: 'Email Address', selector: 'email', sortable: true, },
        { name: 'Mobile No.', selector: 'mono', sortable: true, },
        { name: 'Username', selector: 'username', sortable: true },
        { 
            name: 'Role', 
            selector: 'role', 
            sortable: true, 
            cell: row => 
            row.role === "1" ?  "Admin" : "User"
        },
        { name: 'Subscription Start Date', selector: 'substartdate', sortable: true, },
        { name: 'Subscription End Date', selector: 'subenddate', sortable: true, },
        { name: 'Space Usage', selector: 'spaceUsage', sortable: true, },
        { name: 'No. of House', selector: 'maxproperty', sortable: true, },
        { name: 'User Status', selector: 'account_status', sortable: true, },
        { name: 'Renewal Pending Date', selector: 'renewalDate', sortable: true, },
        { 
            name: 'Delete', 
            selector: 'row.id', 
            sortable: true, 
            cell: row =><button className="delete_icon" onClick={()=>handleDeleteUser(row.id)}><i class="glyphicon glyphicon-trash"></i></button>
        },
        { 
            name: 'Action', 
            selector: 'row.id', 
            sortable: true, 
            cell: row => 
            row.account_status === "Active" ?<button className="btn btn-primary width-82 addNewItem" onClick={()=>handleDeactiveUser(row.id)}>DeActive</button>:
            <button className="btn btn-primary width-82 addNewItem" onClick={()=>handleActiveUser(row.id)}>Active</button>
        },
    ];
    
 
    return (
        <div className="container-fluid contact">   
            <div className="list-flex">
                <h4 >User Details</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="contact-form pt-25">
                <Table url={"/edit-user"} data={props.userData} columns={columns} header={header} getSingleData={props.getsingleUser} tableId={"userList"+id} id={id} />
            </div>
            {isOpen === true &&
                <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" den="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" className="close" onClick={() => setIsopen(false)}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


const mapStateToProps = (state) => (
      {
    userData : state.Authentication.userList.data,
});

const mapDispatchToProps = {
    getuserAllData,
    deActivateUser,
    activateUser,
    deleteUser,
    getsingleUser
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
