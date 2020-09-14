import React,{useState,useEffect} from "react";
import { loadCart, cartEmpty } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";



const PaypalCheckout=({products,setReload=f=>f,reload=undefined})=>{

    const [info,setInfo]=useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
    });
    let effect1=false;

    let token = isAuthenticated() && isAuthenticated().token;
    let userId = isAuthenticated().user._id;
    if(userId){
        effect1=true
    }



    const getToken=(userId,token)=>{
        console.log("grttoekn called with ",userId);
        getmeToken(userId,token).then(info =>{
            console.log("INFORMATION ",info);
            if(info.error){
                setInfo({...info,error: info.error})
            }else{
                const clientToken=info.clientToken;
                setInfo({clientToken:clientToken})
            }
        })
    }

    const showBrain=()=>{
        return(
            <div>
                {info.clientToken !==null && products.length>0 ?(
                  <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
        </div>
                ): <h3>please login or add something to cart</h3> }
            </div>
        )
    }

    useEffect(()=>{
        getToken(userId,token);
    },[])


    const onPurchase=()=>{
        setInfo({loading:true})
        let nonce;
        let getNonce=info.instance
        .requestPaymentMethod()
        .then(data=>{
            nonce=data.nonce
            const paymentData={
                paymentMethodNonce:nonce,
                amount:getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(response =>{
                setInfo({...info,loading:false,success:response.success})
                console.log("PAYMENT SUCCESS");
                const orderData={
                    products:JSON.parse(localStorage.getItem("cart")),
                    transaction_id:response.transaction.id,
                    amount:response.transaction.amount,
                    count:products.length
                }
                createOrder(userId,token,orderData)
                .then(response=>{
                    console.log(response)
                })
                cartEmpty(()=>{
                    console.log("did we got a crash");
                })
                setReload(!reload);
            })
            .catch(error =>{
                setInfo({loading:false,success:false})
                console.log("PAYMENT FAILED")
            })
        })
    }
    const getAmount=()=>{
        let amount=0;
        products.map(p=>{
            amount=amount+p.price
        })
        return amount;
    }


    return(
        <div>
            <h3>test bill={getAmount()}</h3>
            {showBrain()}
        </div>
    )
}
export default PaypalCheckout;