import React, { useState } from "react";
import {Link} from "react-router-dom";
import Base from "../core/Base";
import {updateCategory} from "./helper/adminapicall"
import { isAuthenticated } from "../auth/helper";
const UpdateCategory=({match})=>{
    const [name,setName]=useState("");
    const [nameUpdated,setNameUpdated]=useState(false);
    const {user,token}=isAuthenticated();


    const successMessage = () => (
      <div
        className="alert alert-success mt-3"
        style={{ display: nameUpdated ? "" : "none" }}
      >
        <h4>{nameUpdated} updated successfully</h4>
      </div>
    );
        const handleChange=event=>{
            const value=event.target.value;
            setName(value);
        }

        const onSubmit=(event)=>{
            event.preventDefault();
            updateCategory(match.params.categoryId,user._id,token,name)
            .then(data=>{
                if(data.error){
                  console.log("ct_id="+match.params.categoryId+"u_id= "+user._id+"token= "+token)
                    console.log(data.error)
                }
                else{
                    setNameUpdated(true);
                }
            })            

        }

    return (
      <Base title="update category" description="update categories here">
        <div className="container bg-info">
          <Link to="/admin/dashboard">
            <button className="btn btn-success btn-lg">admin home</button>
          </Link>
          {successMessage()}
          <div className="row p-3">
            <h3 className="px-4">enter new name of category</h3>
            <div className="container px-5">
              <input
                className="form-control"
                type="text"
                onChange={handleChange}
                placeholder={name}
              ></input>
              <button className="btn mt-4 ml-5 text-white btn-lg bg-dark"
              onClick={onSubmit}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </Base>
    );
}

export default UpdateCategory;