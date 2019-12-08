import React from 'react';
import { Link } from 'react-router-dom';

function Post({ title, content, userName, contactNum, apt, severity, status, createdAt, updatedAt, id }) {
  return (
    <div className="col-10 col-md-8 col-lg-7 mt-5">
      <div className="card mb-4 shadow">
        <div className="card-title">
          <Link to={"/posts/" + id}>{title} Reported from {apt}
          </Link>
        </div>
        <div className="card-body card-text">
          {content}{severity} {status}
        </div>
        <div className="card-footer small text-muted text-right">
          <div>Reported at {createdAt}</div>
          <div>Last Updated at {updatedAt}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;