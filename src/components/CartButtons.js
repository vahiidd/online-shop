import React, { useEffect, useRef, useState } from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { useSelector } from 'react-redux';
import { selectLogin } from '../features/login/loginSlice';
import { selectProfile } from '../features/profile/profileSlice';

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { total_items } = useCartContext();
  const { status: loginStatus } = useSelector(selectLogin);
  const { profile, status: profileStatus } = useSelector(selectProfile);
  const [loginElement, setLoginElement] = useState(
    <Link to='/login'>
      <button type='botton' className='auth-btn'>
        Login
        <FaUserPlus />
      </button>
    </Link>
  );

  useEffect(() => {
    if (loginStatus === 'success' && profileStatus === 'success') {
      setLoginElement(
        <Link to='/profile'>
          <button type='botton' className='auth-btn'>
            {profile[0].user}
            <FaUserPlus />
          </button>
        </Link>
      );
    } else {
      setLoginElement(
        <Link to='/login'>
          <button type='botton' className='auth-btn'>
            Login
            <FaUserPlus />
          </button>
        </Link>
      );
    }
  }, [loginStatus, profile, profileStatus]);
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      {loginElement}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
