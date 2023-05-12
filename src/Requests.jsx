import { BASE_URL } from "./BaseURL";
import axios from "axios";

//get all suppliers
export const getAllOrders= async()=>{
    let globalData;
    await axios.get(`${BASE_URL}/orders`)
    .then(res=>{
        globalData = res.data;
    })
    return globalData;
}
//delete supplier by id
export const deleteSupplierByID = id =>{
    axios.delete(`${BASE_URL}/orders/${id}`);
}
//post supplier 
export const postSupplier = (payload)=>{
    axios.post(`${BASE_URL}/orders`,payload);
}