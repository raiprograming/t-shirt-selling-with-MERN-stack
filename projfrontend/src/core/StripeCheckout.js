import React,{useState,useEffect} from "react";
import { loadCart, cartEmpty } from "./helper/CartHelper";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import API from "../backend";
import {createOrder} from "./helper/OrderHelper"

const StripeCheckout=({products,setReload=f=>f,reload=undefined})=>{
    const [data,setData]=useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })
    const token=isAuthenticated() && isAuthenticated().token;
    const userId=isAuthenticated() && isAuthenticated().user._id;
    const getFinalPrice=()=>{
        let amount=0;
        products.map(p=>{
            amount=amount+p.price;
        })
        return amount;
    }
    const makePayment=token=>{
        const body={
          token,
          products
        }
        const headers={
          "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
        }).then(response =>{
          console.log(response)
          //call methods
        }).catch(err =>console.log(err))
    }
    const showStripeButton=()=>{
        return isAuthenticated() ? (
          <StripeCheckoutButton
            name="buy t-shirts"
            token={makePayment}
            stripeKey="pk_test_51HP4lxGWayMB2QLmenc88z6Bt2N1iyPA2JJuVIT3TXaRRVBKSxLFheEzuzmByAIHdx19x4sBNqDbdA9dao12XZe900RKCbSoS3"
            shippingAddress
            billingAddress
          >
            <button className="btn btn-success">pay with stripe</button>
          </StripeCheckoutButton>
        ) : (
          <Link to="/signin">
            <button className="btn btn-warning">signin</button>
          </Link>
        );
    }






    return(
        <div>
            <h3>stripe checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}
export default StripeCheckout;