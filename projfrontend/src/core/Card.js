import React,{useState,useEffect} from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import { Redirect } from "react-router-dom";


 const Card = ({
     product,addToCart=true, removeFromCart=false,
     setReload=f=>f,
     reload=undefined
 }) => {
    const [redirect,setRedirect]=useState(false);
    const addCart=()=>{
        addItemToCart(product,()=>{setRedirect(true)})
    };


    const redirectToCart=(redirect)=>{
        if(redirect){
            return(
            <Redirect to="/cart" />
            )
        }
        
    }




     const cardTitle=product?product.name : "default";
     const cardDescription=product? product.description :"default description";
     const price=product? product.price:"default";
    const showAddToCart=(addToCart)=>{
        return (
          addToCart && (
            <button
              onClick={addCart}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
          )
        );
    }
     const showRemoveFromCart = (removeFromCart) => {
       return (
         removeFromCart && (
           <button
             onClick={()=>{
               removeItemFromCart(product._id)
               setReload(!reload)
             }
             }
             className="btn btn-block btn-outline-danger mt-2 mb-2"
           >
             Remove from cart
           </button>
         )
       );
     };



   return (
     <div className="card text-white bg-dark border border-info ">
         {redirectToCart(redirect)}
       <div className="card-header lead">{cardTitle}</div>
       <div className="card-body">
           <ImageHelper product={product} />
         
         <p className="lead bg-success font-weight-normal text-wrap">
           {cardDescription}
         </p>
   <p className="btn btn-success rounded  btn-sm px-4">{price}</p>
         <div className="row">
           <div className="col-12">
             {showAddToCart(addToCart)}
           </div>
           <div className="col-12">
             {showRemoveFromCart(removeFromCart)}
           </div>
         </div>
       </div>
     </div>
   );
 };
 export default Card; 