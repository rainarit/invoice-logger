import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Invoice = props => (
    <tr>
        <td>{props.invoice.username}</td>
        <td>{props.invoice.customerName}</td>
        <td>{props.invoice.invoiceNumber}</td>
        <td>{props.invoice.amount}</td>
        <td>{props.invoice.totalPaid}</td>
        <td>{props.invoice.paymentDate.substring(0,10)}</td>
        <td>{props.invoice.datePaid.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.invoice._id}>edit</Link> | <a href="#" onClick={() => { props.deleteInvoice(props.invoice._id) }}>delete</a>
        </td>
    </tr>
)

export default class InvoiceList extends Component {
    constructor(props) {
        super(props);
        
        this.deleteInvoice = this.deleteInvoice.bind(this);
        this.state = {
            invoices: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:2000/invoices/")
            .then(response => {
                this.setState({
                    invoices: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteInvoice(id) {
        axios.delete("http://localhost:2000/invoices/" + id)
            .then(response => {console.log(response.data)});

        this.setState({
            invoices: this.state.invoices.filter(el => el._id !== id)
        })
    }

    invoiceList() {
        return this.state.invoices.map(currentinvoice => {
            return <Invoice invoice = {currentinvoice} deleteInvoice = {this.deleteInvoice} key = {currentinvoice._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Invoices</h3>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Customer Name</th>
                            <th>Invoice Number</th>
                            <th>Amount</th>
                            <th>Total Paid</th>
                            <th>Payment Date</th>
                            <th>Date Paid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.invoiceList()
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}