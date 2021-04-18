import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';
import productCategorySlice, {
  getProductCategories,
  selectProductCategory,
} from '../features/productCategory/productCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProductsList,
  getproductList,
} from '../features/productList/productListSlice';

const Filters = () => {
  const {
    updateFilters,
    clearFilters,
    all_products,
    filters: {
      text,
      category,
      company,
      min_price,
      max_price,
      color,
      shipping,
      price,
    },
  } = useFilterContext();

  // const categories = getUniqueValues(all_products, 'category');
  const { categoriesName: categories, status } = useSelector(
    selectProductCategory
  );
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  const handleClickAllCategory = () => {
    dispatch(getAllProductsList());
  };

  const handleClickCategory = (e, category) => {
    dispatch(getproductList(category));
  };

  if (status === 'loading') {
    return <h1>loading...</h1>;
  }

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              className='search-input'
              name='text'
              type='text'
              placeholder='search'
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className='form-control'>
            <h5>category</h5>
            <div>
              <button
                key={'allClickButton'}
                type='button'
                name='category'
                onClick={handleClickAllCategory}
              >
                All
              </button>
              {categories.map((c, index) => (
                <button
                  key={index}
                  onClick={(e) => handleClickCategory(e, c)}
                  type='button'
                  name='category'
                  className={`${
                    category === c.toLowerCase() ? 'active' : null
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className='form-control'>
            <h5>company</h5>
            <select
              name='company'
              id=''
              value={company}
              onChange={updateFilters}
              className='company'
            >
              {companies.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      name='color'
                      key={index}
                      onClick={updateFilters}
                      data-color='all'
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      All
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ background: c }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onClick={updateFilters}
              checked={shipping}
            />
          </div>
        </form>
        <button type='button' className='clear-btn' onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
