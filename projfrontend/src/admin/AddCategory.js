import React,{useState} from"react";
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index";
import {Link} from "react-router-dom";
import {createCategory} from "./helper/adminapicall"

const AddCategory=()=>{
    const [name,setName]=useState("");
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    const {user,token} =isAuthenticated();
    const handleChange=event=>{
        setError("");
        setName(event.target.value)

    };

const successMessage=()=>{
    if(success){
        return(
        <h4 className="text-success">category created successfully</h4>
        )
    }

}

const warningMessage = () => {
    if(error){
        return(
            <h4 className="text-warning">failed to create category</h4>
        )
    }

};
    const onSubmit=(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false)
        //backend request
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError("");
                setSuccess(true);
                setName("")
            }
        })




    }



    const myCategoryForm=()=>(
        <form>
            <div className="form-group">
                <p className="lead">enter the category</p>
                <input className="form-control py-3"
                 type="text"
                 onChange={handleChange}
                 value={name}
                 autoFocus
                 required
                 placeholder="for eg. summer"
                 />
                 <button 
                 onClick={onSubmit}
                 className="btn form-btn btn-outline-info">create category</button>
            </div>
        </form>
        )
    const goBack=()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-dark mb-3 " to="/admin/dashboard">
                admin home
            </Link>
        </div>
    )



    return (
      <Base
        title="create a category"
        className="container bg-info p-4"
        description="add a new category"
      >
        <div className="row bg-white rounded ">
          <div className="col-8">
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
          </div>
        </div>
        {goBack()}
      </Base>
    );
}

export default AddCategory;