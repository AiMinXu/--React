import React, { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './FilterMeals.module.css'

const FilterMeals = (props) => {

  const [keyword, setKeyword] = useState('')
  //使用useEffect改造
  useEffect(() => {
    const timer = setTimeout(() => {
      props.filterHandler(keyword)
    }, 500);
    //useEffect回调函数中，可以指定一个函数作为返回值，它会在Effect执行前调用
    //可在这个return这个函数中，指定清理上次Effect执行带来的影响
    return () => {
      clearTimeout(timer)
    }
  }, [keyword])

  const inputChangeHandler = (e) => {
    //获取输入值并去除空字符
    // const keyword = e.target.value.trim()
    // props.filterHandler(keyword)
    setKeyword(e.target.value.trim())
  }
  return (
    <div className={classes.FilterMeals}>
      <div className={classes.InputOuter}>
        <input
          value={keyword}
          onChange={inputChangeHandler}
          className={classes.SearchInput}
          type="text"
          placeholder='请输入关键字' />
        <FontAwesomeIcon
          className={classes.SearchIcon}
          icon={faSearch} />
      </div>
    </div>
  );
};

export default FilterMeals;
