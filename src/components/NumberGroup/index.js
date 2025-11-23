import React, { useState, useEffect } from 'react';
import { Input, Row } from 'antd';
import styled, { css } from 'styled-components';

export const NumberButton = styled.button`
  cursor: pointer;
  ${(props) =>
    props.add
      ? css`
          background-color: #d38d45;
        `
      : css`
          background-color: #bebebe;
        `}
  width: 50px;
  height: 40px;
  border-radius: 2px;
  border: none;
  padding: 0px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: white;
    font-weight: bold;
  }
`;

export const StyledInput = styled(Input)`
  width: 45px !important;
  text-align: center;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const NumberGroup = (props) => {
  const [count, setCount] = useState(0);
  const handleOnClick = (newCount, type) => {
    setCount(newCount);

    props.countChange && props.countChange(newCount, type);

    if (type === 'decrease') {
      props.onDecrease && props.onDecrease();
    }

    if (type === 'increase') {
      props.onIncrease && props.onIncrease();
    }
  };

  const onChange = (e) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (value === '') {
      setCount(value);
    } else if (!isNaN(value) && reg.test(value)) {
      value = parseInt(value);
      setCount(value);
    }

    props.countChange && props.countChange(value, 'change');
  };

  const onBlur = () => {
    props.countChange && props.countChange(count);
  };

  useEffect(() => {
    setCount(props?.count);
  }, [props.count]);

  return (
    <Row type="flex" style={{ maxWidth: 'max-content', alignItems: 'center' }}>
      <NumberButton
        onClick={() => {
          handleOnClick(Math.max(0, +count - 1), 'decrease');
        }}
      >
        <span>-</span>
      </NumberButton>

      <span style={{ marginLeft: 10, marginRight: 10 }}>
        <StyledInput
          value={count || 0}
          size="large"
          onChange={onChange}
          onBlur={onBlur}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </span>
      <NumberButton
        onClick={() => {
          handleOnClick(+count + 1, 'increase');
        }}
        add
      >
        <span>+</span>
      </NumberButton>
    </Row>
  );
};

export default NumberGroup;
