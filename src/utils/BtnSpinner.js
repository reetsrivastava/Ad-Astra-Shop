import React from 'react';

export const BtnSpinner = ({show,className}) => {
  return show ? (
        <div className={`btn__spinner ${className}`}></div>
  ): ("")
}