import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import InvoicesList from "./components/invoices-list.component";
import EditInvoice from "./components/edit-invoice.component";
import CreateInvoice from "./components/create-invoice.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path = "/" exact component = {InvoicesList} />
      <Route path = "/edit/:id" component = {EditInvoice} />
      <Route path = "/create" exact component = {CreateInvoice} />
      <Route path = "/user" exact component = {CreateUser} />
    </Router>
  );
}

export default App;
