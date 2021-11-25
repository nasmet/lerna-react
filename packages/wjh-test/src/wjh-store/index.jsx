import React, { useCallback } from 'react';
import { createContextFactory, Store } from 'wjh-store';
import reducers from './reducers/index';
import { addCount, asyncReduceAction } from './actions/counter';

const { WrapContainer, useDispatch, useSelecor } = createContextFactory();

function AddCounter() {
  const dispatch = useDispatch();

  const onAdd = useCallback(() => {
    dispatch(addCount(1));
  }, [dispatch]);

  return (
    <button onClick={onAdd} style={{ width: '100px', height: '60px' }}>
      +
    </button>
  );
}

function ReduceCounter() {
  const dispatch = useDispatch();

  const onReduce = useCallback(() => {
    asyncReduceAction(dispatch)(1);
  }, [dispatch]);

  return (
    <button onClick={onReduce} style={{ width: '100px', height: '60px' }}>
      -
    </button>
  );
}

function Count() {
  const counter = useSelecor(state => state.counter);

  return <div>计数器：{counter.count}</div>;
}

const store = new Store(reducers);

const observer = (state, action) => {
  console.log('执行的action: ', action);
  console.log('改变后的state: ', state);
};

store.subscribe(observer);

function WjhStore() {
  return (
    <div>
      <AddCounter />
      <ReduceCounter />
      <Count />
    </div>
  );
}

export { WrapContainer, WjhStore, store };
