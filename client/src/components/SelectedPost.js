import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { DeleteTicket } from './PostFunctions/DeleteTicket';

function SelectedPost({ title, content, userName, contactNum, apt, severity, status, appointmentStatus, createdAt, updatedAt, id, ticketNum, createSuccess, deleteSuccess, deleteError }) {
    console.log(ticketNum)
    return (
        <div className="col-10 col-md-8 col-lg-7 mt-5">
            <div>
                {createSuccess ? (<div>
                    <div className="alert alert-success">Ticket created and Posted successfully</div>
                    <div className="alert alert-success">Your Ticket # {ticketNum}</div>
                </div>) : null}
            </div>
            <div className="card mb-4 shadow">
                <div className="card-title card-header">
                    <Link to={"/posts/" + id}><em> {title}</em> Reported from Apartment <em>{apt}</em>
                    </Link>
                </div>
                <div className="card-body card-text">
                    {content}
                </div>
                <div className="card-footer small text-muted text-right">
                    <div>Reported at {createdAt}</div>
                    <div>Last Updated at {updatedAt}</div>
                </div>
                <div className="container card bg-info text-white">
                    <div class="row">
                        <div class="col-sm">Severity: {severity}</div>
                        <div class="col-sm">Ticket Status: {status}</div>
                        <div class="col-sm">Appointment Status: {appointmentStatus}</div>
                    </div>
                </div>

            </div>
            <ButtonGroup>
                <Button variant="outline-success" onClick={() => DeleteTicket(ticketNum, deleteSuccess, deleteError)}>Delete Ticket</Button>
                <Button variant="outline-success">Update Ticket</Button>
                <Button variant="outline-success" onClick={() => window.print()}> Print Ticket</Button>
            </ButtonGroup>

        </div>
    );
}

export default SelectedPost;