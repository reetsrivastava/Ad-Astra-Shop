import React from 'react';
import {Backdrop} from "./Backdrop";

export const Toast = ({show,message,color,background,className,error,onClick}) => {
  return (
      <Backdrop show={show} onClick={onClick}>
         <div style={{color,background}} className={`toast toast__content ${className}`}>
           {error ? <i className="fas fa-window-close"></i> : <i className="fas fa-badge-check"></i>}&nbsp;{message}
        </div>
      </Backdrop>
  )
}