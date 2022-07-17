import React, { useContext, useState, useEffect } from 'react';
import classes from './Cart.module.css'
import iconImg from '../../asset/bag.png'
import CartContext from '../../store/cart-context';
import CartDetails from './CartDetails/CartDetails';
import Checkout from './Checkout/Checkout';

const Cart = () => {
  const ctx = useContext(CartContext)
  //添加 一个state来设置详情是否显示
  const [showDeatials, setShowDetails] = useState(false)
  //添加一个state用于设置结账页面
  const [showCheckout, setShowCheckout] = useState(false)
  //组件重新渲染时检查商品数量，如果数量为0，则修改 setShowDetails(false)---useEffect(fn(),[依赖项])
  useEffect(() => {
    if (ctx.totalAmount === 0) {
      setShowDetails(false)
      setShowCheckout(false)
    }
  },[ctx])
  //添加一个点击显示详情函数
  const showDetailsHandler = () => {
    if (ctx.totalAmount === 0) {
      setShowDetails(false)
      return
    }
    setShowDetails(prevState => !prevState)
  }
  const showCheckoutHandler = () => {
    if (ctx.totalAmount === 0) return
    setShowCheckout(true)
  }
  const hideCheckoutHandler = () => {
    setShowCheckout(false)
  }
  return (
    <div className={classes.Cart} onClick={showDetailsHandler}>
      {showCheckout && <Checkout onHide={hideCheckoutHandler} />}
      {/* 引入购物车详情 */}
      {showDeatials && <CartDetails /> }
      <div className={classes.Icon}>
        <img src={iconImg} alt='' />
        {ctx.totalAmount === 0 ? null : <span className={classes.TotalAmount}>{ctx.totalAmount}</span>}
      </div>
      {ctx.totalAmount === 0 ? <p className={classes.NoMeal}>未选购商品</p> : <p className={classes.Price}>{ctx.totalPrice}</p>}
      <button onClick={showCheckoutHandler} className={`${classes.Button} ${ctx.totalAmount === 0 ? classes.Disabled : ''}`}>去结算</button>
    </div>
  );
};

export default Cart;
