import React from 'react';
import styled from 'styled-components';

import { proxy,useSnapshot } from 'valtio'

const store = proxy({
  initial: 1000,
  rate: 101,
  period: 1,
  get final() {
    return Math.floor(this.initial * Math.pow(this.rate / 100, 52 * this.period));
  },
  get changeRate() {
    return (this.final / this.initial || 0).toFixed(2);
  },
})

export const MyInput = styled.input`
    border: none;
    border-bottom: 1px solid;
    width: ${(props) => props.width || '80px'};
    background: none;
    text-align: right;
`;
export function LessIsMoreFormula() {
  const { initial, rate, period, final, changeRate } = useSnapshot(store);
  return <div>
    如果开始有
    <MyInput
      size="small"
      type="number"
      value={initial}
      onChange={(e) => (store.initial = parseInt(e.target.value))}
    />
    初始用户，周增长为
    <MyInput
      width="60px"
      type="number"
      value={rate}
      onChange={(e) => (store.rate = parseInt(e.target.value))}
    />
    %，那么
    <MyInput
      width="40px"
      type="number"
      value={period}
      onChange={(e) => (store.period = parseInt(e.target.value))}
    />
    年后用户数为
    <MyInput width="120px" disabled value={final} />， 前后相差
    <MyInput width="50px" disabled value={changeRate} />倍 。
  </div>
}
