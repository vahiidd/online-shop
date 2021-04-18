import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleProductDetail,
  selectSingleProductDetila,
} from '../features/singleProduct/singleProductSlice';

const SingleProductPage = () => {
  const { category: urlCategory, name: urlName } = useParams();
  const dispatch = useDispatch();
  const { detail, status, error } = useSelector(selectSingleProductDetila);
  const {
    id,
    name,
    brand,
    image,
    category,
    description,
    price,
    quantity,
    slug,
    created_date,
    color,
    weight,
    voltage,
    side_by_side,
    top_mount_freezer,
  } = detail;

  useEffect(() => {
    dispatch(getSingleProductDetail({ urlCategory, urlName }));
  }, []);
  // const history = useHistory();
  // const {
  //   single_product_loading: loading,
  //   single_product_error: error,
  //   single_product: product,
  //   fetchSingleProduct,
  // } = useProductsContext();

  // useEffect(() => {
  //   fetchSingleProduct(`${url}${id}`);
  // }, [id]);

  // const {
  //   name,
  //   price,
  //   description,
  //   stock,
  //   stars,
  //   reviews,
  //   id: sku,
  //   company,
  //   images,
  // } = product;

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       history.push('/');
  //     }, 3000);
  //   }
  // });

  // if (loading) {
  //   return <Loading />;
  // }
  // if (error) {
  //   return <Error />;
  // }

  if (status === 'loading') {
    return <h1>Loading</h1>;
  }

  return (
    <Wrapper>
      {/* <PageHero title={name} product={product} /> */}
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={[{ url: image }]} />
          <section className='content'>
            <h2>{name}</h2>
            {/* <Stars stars={stars} reviews={reviews} /> */}
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            {/* <p className='info'>
              <span>Available: </span>
              {stock > 0 ? 'In stock' : 'Out of stock'}
            </p> */}
            {/* <p className='info'>
              <span>SKU: </span>
              {sku}
            </p> */}
            <p className='info'>
              <span>Brand: </span>
              {brand}
            </p>
            <hr />
            {/* {stock > 0 && <AddToCart product={product} />} */}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
