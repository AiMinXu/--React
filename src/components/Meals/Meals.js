import React from 'react';
import Meal from './Meal/Meal';
import classes from './Meals.module.css'

const Meals = (props) => {
  return (
    <div className={classes.Meals}>
      {/* //遍历App组件传过来的数据，生成Meal子组件，且设置key值 */}
      {props.mealsData.map(item => <Meal
        key={item.id}
        meal={item}
      />)}
    </div>
  );
};

export default Meals;
