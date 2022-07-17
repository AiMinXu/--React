import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CartContext from '../../../store/cart-context';
import classes from './Counter.module.css'


//计数器组件
const Counter = (props) => {
  //使用useContext()获取Cartcontext
  const ctx = useContext(CartContext)
  //添加购物车函数
  const addButtonHandler = () => {
    // ctx.addItem(props.meal)
    ctx.cartDispatch({type:'ADD', meal:props.meal})
  }
  const subButtonHandler = () => {
    // ctx.removeItem(props.meal)
    ctx.cartDispatch({type:'REMOVE', meal:props.meal})
  }
  return (
    <div className={classes.Counter}>
      {
        //进行判断，没有数量且数量不等于0时显示
        (props.meal.amount && props.meal.amount !== 0) ? (
          //需要使用<></>进行包裹
          <>
            <button
              className={classes.Sub}
              onClick={subButtonHandler}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className={classes.count}>{props.meal.amount}</span>
          </>
        ) : null
      }
      <button
        className={classes.Add}
        onClick={addButtonHandler}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default Counter;
