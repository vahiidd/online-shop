import React from 'react';
import { useSelector } from 'react-redux';
import { useFilterContext } from '../context/filter_context';
import { selectProductList } from '../features/productList/productListSlice';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { grid_view } = useFilterContext();
  const { list: products, status } = useSelector(selectProductList);

  if (status === 'loading') {
    return <h1>Loading ...</h1>;
  }

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  // if (grid_view === false) {
  //   return <ListView products={products} />;
  // }
  return <GridView products={products} />;
};

export default ProductList;
