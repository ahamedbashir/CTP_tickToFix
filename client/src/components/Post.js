import React from 'react';
import { Link } from 'react-router-dom';

function Post({ title, content, userName, contactNum, apt, severity, status, appointmentStatus, createdAt, updatedAt, id }) {
  return (
    <div className="col-10 col-md-8 col-lg-7 mt-5">
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
    </div>
  );
}

export default Post;