import { combineReducers } from "redux";
import Authentication from "./Authentication";
import House from "./House";
import Contact from "./Contact";
import Loan from "./Loan";
import Insurance from "./Insurance";
import Transaction from "./Transaction";
import Warranty from "./Warranty";
import Account from "./Account";
import Reference from "./Reference";
import Document from "./Document";
import Link from "./Link";
import Gallery from "./Gallery";
import Share from "./share";

import Lease from "./Lease";
import Reminder from "./Reminder";

const allReducers = combineReducers({
  Authentication: Authentication,
  House: House,
  Contact : Contact,
  Loan : Loan,
  Insurance : Insurance,
  Transaction : Transaction,
  Warranty : Warranty,
  Account: Account,
  Reference: Reference,
  Document: Document,
  Link: Link,
  Gallery: Gallery,
  Share : Share,
  Lease: Lease,
  Reminder : Reminder
});

export default allReducers;
