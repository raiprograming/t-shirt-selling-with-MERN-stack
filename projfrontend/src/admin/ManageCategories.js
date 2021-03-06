import React from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import{useState,useEffect} from "react";
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";


const ManageCategories=()=>{
    const [categories,setCategories]=useState([]);
    const {token,user}=isAuthenticated();
    const deleteThisCategory=(categoryId)=>{
        deleteCategory(categoryId,user._id,token).then(
            data=>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    preLoad();
                }
            }
        )
    }

    const preLoad=()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(data);
            }
        })

    }
    useEffect(()=>{
        preLoad();
    },[]);



    return (
      <Base title="Welcome admin" description="Manage products here" >
        <h2 className="mb-4 ">All categories:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row bg-success">
          <div className="col-12">
            {categories.map((category, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{category.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <button className="btn btn-info btn-lg">Update</button>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={()=>{
                          deleteThisCategory(category._id)
                      }}
                      className="btn btn-danger btn-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            }
            )}
          </div>
        </div>
      </Base>
    );
}

export default ManageCategories;