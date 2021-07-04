import ProfilBar from "../../../components/ProfilBar";
import { useState,useEffect,useRef } from "react";
const Profil=()=>{
    const [auth,setAuth]=useState(false);
    const [adresedit,setAdresedit]=useState(false);
    const [loading,setLoading]=useState(false);
    const user_new_adres=useRef();
    const user_new_adres_m=useRef();
    const  [userDeatils,setuserDeatils]=useState();
    const loading_mini=<div class="spinner-border spinner-border-sm" role="status"></div>
    useEffect(()=>{
      if (typeof window !== "undefined" && !!localStorage.getItem('auth')) {
        setAuth(localStorage.getItem('auth'));
      }
      setuserDeatils(JSON.parse(localStorage.getItem("user")))
      
    },[])
    const adresChangeHandler=async ()=>{
     
        setLoading(true)
       const to_send={ 
                type:"auth",
                 email:userDeatils.email, 
                 ad_soyad:userDeatils.ad_soyad,
                 tc:userDeatils.tc,
                telefon:userDeatils.telefon,
                adres:user_new_adres.current.value,
                istek_listesi:userDeatils.istek_listesi,
                siparisler:userDeatils.siparisler,
                token:userDeatils.token,
            }
        const response=await fetch("/api/auth",{
            method:"POST",
            body:JSON.stringify(to_send)
          });
          console.log(to_send)
          localStorage.setItem("user",JSON.stringify(to_send))
          setuserDeatils(JSON.parse(localStorage.getItem("user")))
          setLoading(false)
          setAdresedit(false)
    }
   

    return <>
    {auth&&<>
    <div className="adres-pc">
        <div className="card container noshadow">
     <div className="card-body d-flex">
     <ProfilBar/>
 <div className="card container noshadow w-75">
     <div className="card-body ">
      <p className="fs-4">Adres Bilgilerim</p>
     <div className="card container noshadow">
     <div className="card-body ">
      <p className="fs-5">Adresim</p>
      <p>{userDeatils.adres}</p>
      <i className="fas fa-edit"></i> <u onClick={()=>{setAdresedit(true)}}> Adresi Düzenle</u>
      <div className={`form-group ${!adresedit?"display-none":"display-true"}`}>
      <label htmlFor="exampleFormControlTextarea1"></label>
     <textarea ref={user_new_adres} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
     <u className={`btn ${loading&&"disabled"}`} onClick={adresChangeHandler}><i className="fas fa-save"></i> Kaydet {loading&&loading_mini}</u>
     </div>
     </div>
 </div>
     </div>
 </div>
     </div>
 </div>
 </div>

 <div className="adres-mobile">
        <div className="card container noshadow">
     <div className="card-body d-flex flex-column">
     <ProfilBar/>
 <div className="card container noshadow mt-1">
     <div className="card-body ">
      <p className="fs-4">Adres Bilgilerim</p>
     <div className="card container noshadow">
     <div className="card-body ">
      <p className="fs-5">Adresim</p>
      <p>{userDeatils.adres}</p>
      <i className="fas fa-edit"></i> <u onClick={()=>{setAdresedit(true)}}> Adresi Düzenle</u>
      <div className={`form-group ${!adresedit?"display-none":"display-true"}`}>
      <label htmlFor="exampleFormControlTextarea1"></label>
     <textarea ref={user_new_adres_m} onChange={()=>{user_new_adres.current.value=user_new_adres_m.current.value}} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
     <u className={`btn ${loading&&"disabled"}`} onClick={adresChangeHandler}><i className="fas fa-save"></i> Kaydet {loading&&loading_mini}</u>
     </div>
     </div>
 </div>
     </div>
 </div>
     </div>
 </div>
 </div>
    </>
     
    }
   
    </>

}
export default Profil;