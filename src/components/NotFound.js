import React from 'react';
import { Card } from 'react-md';
import '../assets/stylesheets/NotFound.css';

const NotFound = () => (
  <div className="NotFoundPage">
    <Card className="card-block-centered">
      <div className="NotFoundPage__notfound-text">
        <h3 className="NotFoundPage NotFoundPage__text">Page Not Found</h3>
      </div>
      <div className="NotFoundPage__notfound-img">
        <img
          alt="Page Not found"
          className="page-not-found__gif img"
          src={require('./../assets/images/not_found.gif')}
        />
      </div>
    </Card>
  </div>
);

export default NotFound;
