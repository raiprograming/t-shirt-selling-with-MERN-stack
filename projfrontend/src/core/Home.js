import React,{useState,useEffect} from "react";
import "../styles.css";
import API from "../backend";
import Base from "./Base"
import Card from "./Card";
import { GetProducts } from "./helper/coreapicalls";

const Home= function (){
    const [products,setProducts]=useState([]);
    const [error,setError]=useState("");
    const loadAllProducts=()=>{
      GetProducts().then(data=>{
        if(data.error){
          setError(data.error)
        }else{
          setProducts(data)
        }
      })
    }
      
    useEffect(()=>{
      loadAllProducts()
    },[]);


    return (
      <Base title="home page">
        <div className="row text-center">
          {products.map((product,index)=>{
            return (
              <div key={index} className="col-4">
                <Card product={product}/>
              </div>
            );

          })}
        </div>
      </Base>
    );
}
export default Home;