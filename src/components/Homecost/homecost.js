import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getSingleLoan, addLoanAmortization } from "../../store/Actions/Loan";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";
import { getContact, getGroup } from "../../store/Actions/contact";

const Homecost = (props) => {
  console.log("Console_Props::", props);
  const [purchaseprice, setPurchaseprice] = useState();
  const [homecost, setHomecost] = useState();
  const [tableData, setTableData] = useState([]);
  let house_id = props.location.state.house_id
    ? props.location.state.house_id
    : "";
  const header = [
    "Type",
    "Lender Name",
    "Loan Number",
    "Loan Amount",
    "Interest Rate(%)",
    "Term",
    "Escrow",
    "Property Tax",
    "Start Date",
    "End Date",
    "Status",
  ];
  var columns = [
    {
      name: "Transaction Date",
      selector: "transactiondate",
      sortable: true,
      cell: (row) => Util.dateFormat(row.transactiondate),
    },
    { name: "Category", selector: "category", sortable: true },
    { name: "Payee", selector: "payee", sortable: true },
    { name: "Description", selector: "description", sortable: true },
    {
      name: "Expenses",
      selector: "credit",
      sortable: true,
      cell: (row) => (row.credit === "NaN" ? "0.00" : row.credit),
    },
    {
      name: "Income",
      selector: "debit",
      sortable: true,
      cell: (row) => (row.debit === "NaN" ? "0.00" : row.debit),
    },
    {
      name: "Home Cost",
      selector: "homecost",
      sortable: true,
      cell: (row) => (row.homecost === "NaN" ? "0.00" : row.homecost),
    },
  ];

  useEffect(() => {
    if (props.houseDetails && props.houseDetails.house.length > 0) {
      setPurchaseprice(
        Util.addCommasList(props.houseDetails.house[0]["purchaseamount"])
      );
      setHomecost(
        Util.addCommasList(props.houseDetails.house[0]["purchaseamount"])
      );
    }
    let tableData = [];
    if (props.transactions && props.transactions.length > 0) {
     let transaction = props.transactions.filter(filter => filter.account_name)
      for (let i = 0; i < transaction.length; i++) {
        let homecost = 0;
        if (i == 0) {
          homecost = Util.removeCommas(
            props.houseDetails.house[0]["purchaseamount"]
              ? props.houseDetails.house[0]["purchaseamount"]
              : 0
          );
        } else {
          homecost = Util.removeCommas(
            tableData[i - 1]["homecost"] ? tableData[i - 1]["homecost"] : 0
          );
        }
        let amount = Util.removeCommas(
          transaction[i]["amount"] ? transaction[i]["amount"] : 0
        );

        if (transaction[i]["type"] == "Payment") {
          homecost = parseFloat(homecost) + parseFloat(amount);
        } else if (transaction[i]["type"] == "Receipt") {
          homecost = parseFloat(homecost) - parseFloat(amount);
        }

        let category = transaction[i]["groupname"].split("&");
        let data = {
          transactiondate: transaction[i]["date"],
          category: category[category.length - 1],
          payee: transaction[i]["companyname"],
          description: transaction[i]["comments"],
          credit:
            transaction[i]["type"] == "Payment"
              ? Util.addCommasList(amount)
              : "",
          debit:
            transaction[i]["type"] == "Receipt"
              ? Util.addCommasList(amount)
              : "",
          homecost: Util.addCommasList(parseFloat(homecost).toFixed(2)),
        };
        tableData.push(data);
        // console.log("console_transaction", props.transactions);
      }

      if (props.loanTransactions && props.loanTransactions.length > 0) {
        for (let i = 0; i < props.loanTransactions.length; i++) {
          let homecost = 0;
          if (i == 0 && tableData.length == 0) {
            homecost = Util.removeCommas(
              props.houseDetails.house[0]["purchaseamount"]
                ? props.houseDetails.house[0]["purchaseamount"]
                : 0
            );
          } else {
            homecost = Util.removeCommas(
              tableData[tableData.length - 1]["homecost"]
                ? tableData[tableData.length - 1]["homecost"]
                : 0
            );
          }
          let amount = Util.removeCommas(props.loanTransactions[i]["interest"]);
          homecost = parseFloat(homecost) + parseFloat(amount);

          let category = props.loanTransactions[i]["groupname"].split("&");
          let data = {
            transactiondate: props.loanTransactions[i]["paymentdate"],
            category: category[category.length - 1],
            payee: props.loanTransactions[i]["companyname"],
            description: "",
            credit: Util.addCommasList(parseFloat(amount).toFixed(2)),
            debit: "",
            homecost: Util.addCommasList(parseFloat(homecost).toFixed(2)),
          };
          tableData.push(data);
          // console.log("console_loanTransactions", props.loanTransactions);
        }
      }
      setHomecost(tableData[tableData.length - 1]["homecost"]);
    }
    setTableData(tableData);
  }, [props.houseDetails, props.loanTransactions, props.transactions]);
  const [isOpen, setIsopen] = React.useState(false);
  return (
    <div className="container-fluid loan">
      {/* {console.log("Console_TableDAta", tableData)} */}
      <div className="list-flex">
        <h4>Home Cost Details</h4>
        <i
          className="glyphicon glyphicon-info-sign btn-lg info-logo"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => setIsopen(true)}
        ></i>
      </div>
      <div className="loan-inner mt-10">
        <div className="purchagePrice">
          <h2>Purchase Price : {purchaseprice}</h2>
          <h2>Home Cost: {homecost === "NaN" ? "0.00" : homecost}</h2>
        </div>
        <Table
          header={header}
          url={"/loan-lender"}
          columns={columns}
          getSingleData={props.getSingleLoan}
          tableId="amortization"
          data={tableData}
          house_id={house_id}
        />
        <div className="row footer"></div>
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

const mapStateToProps = (state) => ({
  contacts: state.Contact.contacts.data,
  loanDetails: state.Loan.loanDetails.data,
  houseDetails: state.House.houseDetail.data,
  transactions: state.Transaction.transactions.data,
  loanTransactions: state.Loan.mortgageTransaction.data,
});

const mapDispatchToProps = {
  getSingleLoan,
  addLoanAmortization,
  getContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homecost);
