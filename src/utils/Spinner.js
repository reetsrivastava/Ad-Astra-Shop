import React from 'react';

export const Spinner = ({show}) => {
  return show ? (
    <div className="spinner__container">
        <div className="spinner"></div>
    </div>
  ): ("")
}