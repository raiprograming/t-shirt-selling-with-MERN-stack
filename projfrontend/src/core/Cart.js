import React, { useState, useEffect } from "react";
import "../styles.css";
import API from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";
import PaypalCheckout from "./PaypalCheckout";
const Cart = function () {
  const [products, setProducts] = useState([]);
  const [reload,setReload]=useState(false);

    useEffect(()=>{
        setProducts(loadCart())
    },[reload])



  const loadProducts=(products)=>{
      return (
        <div>
          <h2>this is product section</h2>
          {products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                addToCart={false}
                removeFromCart={true}
                reload={reload}
                setReload={setReload}
              />
            );
          })}
        </div>
      );
  }
  const loadCheckout=()=>{
      return(
          <div>
              <h2>this is checkout section </h2>
          </div>
      )
  }
  
  return (
    <Base title="cart page">
      <div className="row text-center">
        <div className="col-6">{products.length > 0 ? loadProducts(products) : 
        <h3>no product for now</h3>
        }</div>
        <div className="col-6">
          <PaypalCheckout 
          products={products}
          setReload={setReload}
          />

          </div>
      </div>
    </Base>
  );
};
export default Cart;


//StripeCheckout
         // products={products}
         // setReload={setReload}