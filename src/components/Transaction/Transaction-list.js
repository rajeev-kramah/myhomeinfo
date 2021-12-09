import React, { useEffect, useState } from "react";
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import {
  getTransaction,
  getSingleTransaction,
  getTransactionAllData,
  unDeleteTransaction,
} from "../../store/Actions/Transaction";
import { getContact } from "../../store/Actions/contact";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";
import { type } from "jquery";

const TransactionList = (props) => {
  let house_id = props.location.state.house_id
    ? props.location.state.house_id
    : "";
  props.getSingleTransaction({ id: "true" });
  // props.getTransactionAllData();

  const [active, setActive] = useState("Transactions");
  const [transaction, setTransaction] = useState(true);
  const [deletedTransaction, setDeletedTransaction] = useState(true);
  const [is_deleted, setIs_deleted] = useState();
  const [loanclosuredate, setLoanclosuredate] = useState("");
  const [loanHouse_id, setLoanHouse_id] = useState("");
  const [endDate, setEndDate] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState(Util.getCurrentDate("-"));
  const [isOpen, setIsopen] = useState(false);
  const [transactionData, setTransactionData] = useState();

  useEffect(() => {
var activeDatesArr = []
    if (props.loanDetails && props.loanDetails.length > 0) {
      setLoanHouse_id(props.loanDetails[0].house_id);
        props.loanDetails.map((data) => {
      let expiry = Math.floor(new Date(data.loanclosuredate).getTime() / 86400000);
      let current = Math.floor(new Date().getTime() / 86400000);
        if(expiry > current)
        {
            activeDatesArr.push(expiry)
            setLoanclosuredate(activeDatesArr)
        }
        })}
}, [props.loanDetails]);

  useEffect(() => {
    if (props.transactions !== undefined && props.transactions.length > 0) {
        props.contactList &&  props.contactList.map((item1, index1) => {
        const selectedIndex = props.transactions.findIndex(
          (val) =>
            item1.id ===
            parseInt(val && val.account_name && val.account_name.split("-")[0])
        );

        if (selectedIndex > -1 && selectedIndex !== undefined) {
          props.transactions[selectedIndex].account_name = item1.companyname;
          props.transactions[selectedIndex].amount = item1.transaction_amount;
          props.transactions[selectedIndex].type = item1.transaction_type;
        }
      });
      setTransactionData(props.transactions);
    }
  }, [props.transactions]);

  const handleDocType = (type) => {
    if (type === "1") {
      setTransaction(true);
      let data = {
        house_id: house_id,
      };
      props.getTransaction(data);
    } else {
      setTransaction(false);
      setDeletedTransaction(true);
      let data = {
        house_id: house_id,
      };
      props.getTransactionAllData(data);
    }
  };
  // const handleDocType2 = (type) => {
  //     setActive(type);
  //     setTransaction(true)
  //     setDeletedTransaction(!deletedTransaction)
  // }
  const handleUndelete = (Id, houseId, tabType) => {
    handleDocType(tabType);
    // console.log("houseId,tabType",Id,houseId,tabType)
    let data = {
      id: Id,
      house_id: house_id,
    };
    props.unDeleteTransaction(data);
  };
  const header = [
    "Account Name",
    "Transaction Date",
    "Contact Person",
    "Type",
    "Amount",
    "Comments",
    "Receipt",
    "Entry Date & Time",
    "Entered By",
  ];
  var columns = [
    {
      name: "Account Name",
      selector: "companyname",
      sortable: true,
      cell: (row) =>
        row.ltransaction ? (
          row.companyname
        ) : (
          <Link
            data-tag="allowRowEvents"
            role="link"
            to={{ pathname: "transaction", state: { house_id: house_id } }}
          >
            {row.account_name}
          </Link>
        ),
    },
    {
      name: "Transaction Date",
      selector: "date",
      sortable: true,
      cell: (row) => Util.dateFormat(row.date),
    },
    { name: "Contact Person", selector: "contact_person", sortable: true },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      cell: (row) => <span className="text-capitalize">{row.type}</span>,
    },
    { name: "Amount", selector: "amount", sortable: true },
    { name: "Comments", selector: "comments", sortable: true },
    { name: "Principal", selector: "principal", sortable: true },
    { name: "Interest", selector: "interest", sortable: true },
    {
      name: "Entry Date & Time",
      selector: "created_at",
      sortable: true,
      cell: (row) => Util.dateFormatWithTime(row.created_at),
    },
    {
      name: "Entered By",
      selector: "contact_person",
      sortable: true,
      cell: (row) => <span>{"*" + row.contact_person}</span>,
    },
  ];

  const headerOfDel_Data = [
    "Account Name",
    "Transaction Date",
    "Contact Person",
    "Type",
    "Amount",
    "Comments",
    "Receipt",
    "Entry Date & Time",
    "Entered By",
    "Actions",
  ];

  var columnsOfDel_Data = [
    {
      name: "Account Name",
      selector: "account_name",
      sortable: true,
      cell: (row) =>
        row.ltransaction == "*" ? (
          row.companyname + "*"
        ) : (
          <span>{row.account_name.split("-")[1]}</span>
        ),
    },
    {
      name: "Transaction Date",
      selector: "date",
      sortable: true,
      cell: (row) => Util.dateFormat(row.date),
    },
    { name: "Contact Person", selector: "contact_person", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Amount", selector: "amount", sortable: true },
    { name: "Comments", selector: "comments", sortable: true },
    { name: "Receipt", selector: "receipt", sortable: true },
    {
      name: "Entry Date & Time",
      selector: "created_at",
      sortable: true,
      cell: (row) => Util.dateFormatWithTime(row.created_at),
    },
    { name: "Entered By", selector: "entered_by", sortable: true },
    {
      name: "Actions",
      selector: "house_id",
      sortable: true,
      cell: (row) => (
        <button
          className="btn btn-primary  addNewItem"
          onClick={() =>
            handleUndelete(row.id, house_id, "Deleted Transactions")
          }
        >
          Undelete
        </button>
      ),
      // <Link data-tag="allowRowEvents" role="link"  to={{pathname : "transaction-list", state:{house_id : house_id}}}>Undeleted</Link>
    },
  ];
  return (
    <div className="container-fluid contact">
        {console.log("closure::",loanclosuredate)}
      <div className="list-flex">
        <h4>Transactions</h4>
        <i
          className="glyphicon glyphicon-info-sign btn-lg info-logo"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => setIsopen(true)}
        ></i>
      </div>
      <div className="contact-form pt-25 mt-10">
        <div className="row top-bar">
          <div className="col-md-12">
            <span
              className={transaction ? "active-bar mr-50" : "mr-50"}
              onClick={(e) => handleDocType("1")}
            >
              Transactions
            </span>
            <span
              className={!transaction ? "active-bar mr-50" : "mr-50"}
              onClick={(e) => handleDocType("2")}
            >
              Deleted Transactions
            </span>
          </div>
        </div>
        {transaction ? (
          <React.Fragment>
            {transactionData !== undefined && (
              <Table
                header={header}
                columns={columns}
                url={"/transaction"}
                getSingleData={props.getSingleTransaction}
                tableId="transaction"
                data={transactionData}
              />
            )}
            <div className="row footer">
              
                            {
                           
                                loanHouse_id === house_id && loanclosuredate !== ""
                                    ? <Link to={{
                                        pathname: "/transaction",
                                        state: { house_id: house_id }
                                    }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                                        <span className="glyphicon glyphicon-plus"> </span> Loan Transaction
                                    </Link> : <React.Fragment>You are not allowed for New Transaction Because Your Loan is Closed </React.Fragment>
                            } 
           
            </div>
          </React.Fragment>
        ) : (
          <Table
            header={headerOfDel_Data}
            columns={columnsOfDel_Data}
            getSingleData={props.getSingleTransaction}
            tableId="transactionid"
            data={props.transactionAllData}
          />
        )}
      </div>
      {isOpen === true && (
        <div
          className="modal"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          den="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsopen(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) =>
  // console.log('state::',state)
  ({
    transactions: state.Transaction.transactions.data,
    // transactionAllData: state.Transaction.transactions && state.Transaction.transactions.data !== undefined && state.Transaction.transactions.data,
    transactionAllData: state.Transaction.transactionDeletedData.data,
    loanTransaction: state.Loan.mortgageTransaction.data,
    loanDetails: state.Loan.loans.data,
    contactList: state.Contact.contacts.data,
  });

const mapDispatchToProps = {
  getTransaction,
  getSingleTransaction,
  getTransactionAllData,
  unDeleteTransaction,
  getContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
