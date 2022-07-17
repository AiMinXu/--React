import React, { useState, useReducer } from 'react';
import Meals from "./components/Meals/Meals";
import CartContext from './store/cart-context';
import FilterMeals from './components/FilterMeals/FilterMeals';
import Cart from './components/Cart/Cart';
//模拟一组食物数据
const MEALS_DATA = [
  {
    id: '1',
    title: '汉堡包',
    desc: '百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！',
    price: 12,
    img: '/img/meals/1.png'
  },
  {
    id: '2',
    title: '双层吉士汉堡',
    desc: '百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！',
    price: 20,
    img: '/img/meals/2.png'
  },
  {
    id: '3',
    title: '巨无霸',
    desc: '两块百分百纯牛肉，搭配生菜、洋葱等新鲜食材，口感丰富，极致美味！',
    price: 24,
    img: '/img/meals/3.png'
  }, {
    id: '4',
    title: '麦辣鸡腿汉堡',
    desc: '金黄脆辣的外皮，鲜嫩幼滑的鸡腿肉，多重滋味，一次打动您挑剔的味蕾！',
    price: 21,
    img: '/img/meals/4.png'
  }, {
    id: '5',
    title: '板烧鸡腿堡',
    desc: '原块去骨鸡排嫩滑多汁，与翠绿新鲜的生菜和香浓烧鸡酱搭配，口感丰富！',
    price: 22,
    img: '/img/meals/5.png'
  }, {
    id: '6',
    title: '麦香鸡',
    desc: '清脆爽口的生菜，金黄酥脆的鸡肉。营养配搭，好滋味的健康选择！',
    price: 14,
    img: '/img/meals/6.png'
  }, {
    id: '7',
    title: '吉士汉堡包',
    desc: '百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！',
    price: 12,
    img: '/img/meals/7.png'
  }
];

//使用useReducer修改
const cartReducer = (state, action) => {
  //复制购物车
  const newCart = { ...state }

  switch (action.type) {
    case 'ADD':
      if (newCart.items.indexOf(action.meal) === -1) {
        newCart.items.push(action.meal);
        action.meal.amount = 1;
    } else {
        action.meal.amount += 1;
    }
    newCart.totalAmount += 1;
    newCart.totalPrice += action.meal.price;
    return newCart;
    case 'REMOVE':
      action.meal.amount -= 1;
      if (action.meal.amount === 0) {
          newCart.items.splice(newCart.items.indexOf(action.meal), 1);
      }
      newCart.totalAmount -= 1;
      newCart.totalPrice -= action.meal.price;
      return newCart;
    case 'CLEAR':
      newCart.items.forEach(item => delete item.amount);
            newCart.items = [];
            newCart.totalAmount = 0;
            newCart.totalPrice = 0;
            return newCart;
    default:
      return state;
  }
}
const App = () => {
  //创建state 存储
  const [mealsData, setMealsData] = useState(MEALS_DATA)
  //创建一个state来存储购物车数据
  /*
    *   1.商品 [] items
    *   2.商品总数（totalAmount）
    *   3.商品总价（totalPrice）
  */
  // const [cartData, setCartData] = useState({
  //   items: [],
  //   totalAmount: 0,
  //   totalPrice: 0
  // })

  //使用useReducer(reducer)(整合函数，定义在组件外), initialArg(初始值), init)
  const [cartData, cartDispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
    totalPrice: 0
  })

  //过滤筛选商品,传入keyword
  const filterHandler = (keyword) => {
    const newMealsData = MEALS_DATA.filter(item => item.title.indexOf(keyword) !== -1)
    setMealsData(newMealsData)
  }
//#region
//   //向购物车添加商品
//   const addItem = (meal) => {
//     //meal  表示要添加的商品
//     //对购物车进行复制
//     const newCart = { ...cartData }
//     //判断购物车中是否存在商品
//     if (newCart.items.indexOf(meal) === -1) {
//       //将商品添加到购物车中
//       newCart.items.push(meal)
//       //若商品不存在,新增meal.amount属性，统计数量变为1
//       meal.amount = 1
//     } else {
//       //若商品已经存在则商品数量累加
//       meal.amount += 1
//     }
//     //totalAmount增加---注意不是itemstotalAmount
//     newCart.totalAmount += 1
//     //总金额增加
//     newCart.totalPrice += meal.price
//     //重置购物车
//     setCartData(newCart)
//   }

//   //减少购物车中的商品
//   const removeItem = (meal) => {
//     const newCart = { ...cartData }
//     meal.amount -= 1
//     //判断商品是否归零
//     if (meal.amount === 0) {
//       //移除该商品
//       newCart.items.splice(newCart.items.indexOf(meal), 1)
//     }
//     newCart.totalAmount -= 1
//     newCart.totalPrice -= meal.price
//     setCartData(newCart)
//   }
//   //清空购物车
//   const clearCart = () => {
//     const newCart = { ...cartData }
//     newCart.items.forEach(item => delete item.amount)
//     newCart.items = []
//     newCart.totalAmount = 0
//     newCart.totalPrice = 0
//     setCartData(newCart)
// }
//#endregion


  return (

    //使用Context进行传递
    // <CartContext.Provider value={{ ...cartData, addItem, removeItem, clearCart}}>
    <CartContext.Provider value={{ ...cartData, cartDispatch}}>
      <div>
        <FilterMeals filterHandler={filterHandler} />
        <Meals mealsData={mealsData} />
        <Cart />
      </div>
    </CartContext.Provider>
  );
};

export default App;
