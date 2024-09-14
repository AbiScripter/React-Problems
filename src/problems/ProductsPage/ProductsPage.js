import React, { useEffect, useState } from "react";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [start, setStart] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=5&skip=${start * 5}`
        );
        if (!response.ok) {
          throw new Error("something went wrong with fetching");
        }
        const data = await response.json();
        setProducts((prev) => [...prev, ...data.products]);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [start]);

  function loadMore() {
    setStart((prev) => prev + 1);
  }

  if (loading) {
    return <h2>Loading.....</h2>;
  }
  return (
    <div className="wrapper">
      <div className="products-container">
        {products.map((p) => {
          return (
            <div key={p.id} className="product">
              <h3>{p.title}</h3>
              <img className="product-thumb" src={p.thumbnail} alt="product" />
              <div className="product-footer">
                <p>${p.price}</p>
                <p>
                  <Rating rate={p.rating} /> <span>{p.rating}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={loadMore}>load more</button>
    </div>
  );
};

const Rating = ({ rate }) => {
  let fullStars = new Array(Math.round(rate)).fill(0);
  let emptyStars = new Array(5 - Math.round(rate)).fill(0);
  return (
    <>
      {fullStars.map((f, i) => (
        <span key={crypto.randomUUID()}>★</span>
      ))}
      {emptyStars.map((e, i) => (
        <span key={crypto.randomUUID()}>☆</span>
      ))}
    </>
  );
};

export default ProductsPage;
