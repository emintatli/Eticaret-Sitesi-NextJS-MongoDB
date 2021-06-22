
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import {navbarActions} from "../store";

const SepetItems=()=>{
    const dispatch=useDispatch();
    const sepet=useSelector(state=>state.navbar.sepet);
    

    const deleteHandler=(event)=>{
        
        const newSepet=sepet.filter((value)=>{return event.target.id!==value.id.toString()});
        dispatch(navbarActions.sepet_yukle({urun:newSepet}))
        localStorage.setItem('sepet', newSepet);
        if(localStorage.getItem('sepet')===""){
            localStorage.setItem('sepet', "[]");
        }
    }   
    // const totalandKDV=()=>{
    //     const prices=sepet.map((value)=>{return value.current_price});
    //     console.log(prices)
    // }
    return(
        <>
        {!!sepet&&sepet.map((value)=>{
            return(
                <>
                
                         <li key={value.id} className="">
            <div className="card container noshadow mobile-margin" >
            <div className="card-body d-flex align-items-center justify-content-between ">
            <img src={value.image[0]} width="100px" height="50px"></img>
           <p className="p-2 ">{value.name}</p>
           <div className="d-none">
                   <p>Birim Fiyat</p>
                   <s className="text-danger">{value.old_price} TL</s>
                   <p>{value.current_price} TL</p>
           </div>
           <div className="ms-1">
                   <b>Toplam Fiyat</b>
                   
                   <p>{value.current_price} TL</p>
           </div>
           <i id={value.id} onClick={deleteHandler} className="fas fa-times-circle ms-1"></i>
            </div>
            </div>
            </li>
                </>
            );
        })}

        </>
    );
}
export default SepetItems;
