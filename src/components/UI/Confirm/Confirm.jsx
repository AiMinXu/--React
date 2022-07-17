import React from 'react';
import BackDrop from '../BackDrop/BackDrop';
import classes from './Confirm.module.css'


const Confirm = (props) => {
  return (
    <BackDrop  onClick={props.onCancle} className={classes.ConfirmOuter}>
      <div className={classes.Confirm}>
        <p className={classes.ComfirmText}>确认清空购物车吗</p>
        <div>
          <button
            className={classes.Cancel}
            onClick={(e) => { props.onCancle(e) }}>取消</button>
          <button
            className={classes.Ok}
            onClick={(e) => { props.onOk(e) }}>确认</button>
        </div>
      </div>
    </BackDrop>
  );
};

export default Confirm;
