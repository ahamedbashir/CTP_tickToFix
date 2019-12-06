import React from 'react';
import { Link } from 'react-router-dom';


function SelectedPost({ title, content, userName, contactNum, apt, severity, status, createdAt, updatedAt, id, ticketNum, deleteTicket, deleteSuccess, deleteError}) {
    console.log(createdAt)
    return (
        <div className="col-10 col-md-8 col-lg-7">
            <div className="card mb-4 shadow">
                <div className="card-title">
                    <div>
                        <Link to={"/posts/" + id}>{title} Reported from {apt}</Link>
                        
                    </div>
                </div>
                <div className="card-body card-text">
                    {content}{severity} {status}
                </div>
                <div className="card-footer small text-muted text-right">
                    <div>Reported at {createdAt}</div>
                    <div>Last Updated at {updatedAt}</div>
                </div>
            </div>
            <button className="text-right" onClick={() => deleteTicket(ticketNum, deleteSuccess, deleteError)}>delete</button>
            <button>Update Ticket</button>
        </div>
    );
}

export default SelectedPost;