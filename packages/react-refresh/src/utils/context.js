/*
 * @Description: context相关方法
 * @Author: 吴锦辉
 * @Date: 2021-07-30 11:07:00
 * @LastEditTime: 2021-07-30 11:25:52
 */

import React, { createContext, useReducer, useContext, useMemo } from 'react';

/**
 * @description: 创建context工厂
 * @param {object} initValue // context的静态初始数据
 * @return {*}
 */
export function createContextFactory(initValue = {}) {
  const Context = createContext();

  function WrapContainer(WrapComponent, reducer = {}, initState = {}) {
    return function Provider(props) {
      const [state, dispatch] = useReducer(reducer, initState);

      return (
        <Context.Provider value={{ ...initValue, state, dispatch }}>
          <WrapComponent {...props} />
        </Context.Provider>
      );
    };
  }

  function useDispatch() {
    const { dispatch } = useContext(Context);

    return dispatch;
  }

  /**
   * @description: 函数组件使用
   * @param {function} fn  // 举例：(state)=>state
   * @return {any}
   */
  function useSelecor(fn) {
    const { state } = useContext(Context);
    console.log(useContext(Context));

    const value = useMemo(() => fn(state), [state]);

    return value;
  }

  /**
   * @description: class组件使用
   * @param {funtion} stateParam
   * @param {funtion} actionParam
   * @return {function}
   */
  function connet(stateParam, actionParam) {
    return function (WrapperComponent) {
      return function Container(props) {
        const { state, dispatch } = useContext(Context);
        let states = {};
        let actions = {};

        if (typeof stateParam === 'function') {
          states = stateParam(state);
        }

        if (Reflect.toString.call(states) !== '[object Object]') {
          throw new Error('函数返回的格式不对');
        }

        if (typeof actionParam === 'function') {
          actions = actionParam(dispatch);
        }

        if (Reflect.toString.call(states) !== '[object Object]') {
          throw new Error('函数返回的格式不对');
        }

        return <WrapperComponent {...props} {...states} {...actions} />;
      };
    };
  }

  return {
    WrapContainer,
    useDispatch,
    useSelecor,
    connet,
  };
}
