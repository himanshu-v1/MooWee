import React from 'react';
import './subnav.scss';

export default function SubNav({ list } : { list?: Array<React.ReactNode> }) {
  return (
    <div className="sub-nav">
      {
        list ? 
          (
            <ul>
              { 
                list.map((item, index: number) => ( 
                  <li key={index}>{ item }</li> 
                )) 
              }
            </ul>
          )
          : (
            <ul>
              <li>All</li>
              <li>Selects</li>
              <li>Top Rated</li>
              <li>Upcoming</li>
            </ul>
          )
        }
    </div>
  );
}