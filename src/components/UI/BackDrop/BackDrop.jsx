import React from 'react';
import classes from './BackDrop.module.css'
import ReactDOM  from 'react-dom';

const  backdropRoot = document.getElementById('bcackdrop-root')
const BackDrop = (props) => {
  return ReactDOM.createPortal(
    <div {...props}
      className={`${classes.Backdrop} ${props.className}`}>
      {props.children}
    </div>,backdropRoot)
};

export default BackDrop;
