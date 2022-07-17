import React, { useContext, useState } from 'react';
import BackDrop from '../../UI/BackDrop/BackDrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import classes from './CartDetails.module.css'
import CartContext from '../../../store/cart-context';
import Meal from '../../Meals/Meal/Meal';
import Confirm from '../../UI/Confirm/Confirm';


const CartDetails = () => {
  const ctx = useContext(CartContext)
  //设置state用于设置控制确认框显示
  const [showConfirm, setShowConfirm] = useState(false)

  //添加函数显示确认框
  const showConfirmHandler = () => {
    setShowConfirm(true)
  }
  //
  const cancelHandler = (e) => {
    e.stopPropagation()
    setShowConfirm(false)

  }
  const okHandler = () => {
    // ctx.clearCart()
    ctx.cartDispatch({type:'CLEAR'})
  }
  return (
    <BackDrop>
      {showConfirm && <Confirm
        onCancle={cancelHandler}
        onOk={okHandler}
        confirmText={'确认清空购物车吗'} />}
      {/* //阻止div事件冒泡 ，并不需要给BackDrop加*/}
      <div
        className={classes.CartDetails}
        onClick={e => e.stopPropagation()}>
        <header className={classes.Header}>
          <h2 className={classes.Title}>餐品详情</h2>
          <div
            className={classes.Clear}
            onClick={showConfirmHandler}>
            <FontAwesomeIcon icon={faTrash} />
            <span>清空购物车</span>
          </div>
        </header>
        <div className={classes.MealList}>
          {
            ctx.items.map(item =>
              <Meal noDesc key={item.id} meal={item} />
            )
          }
        </div>
      </div>
    </BackDrop>
  );
};

export default CartDetails;
