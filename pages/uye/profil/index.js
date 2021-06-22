import ProfilBar from "../../../components/ProfilBar";
import { useState,useEffect,useRef } from "react";
import CustomizedSnackbars from "../../../components/alert"
import Link from 'next/link'
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateAdSoyad(adsoyad){
  const re=/^[a-zA-ZöçşığüÖÇŞİĞÜ,]+(\s{0,1}[a-zA-ZöçşığüÖÇŞİĞÜ, ])*$/i;
  return re.test(String(adsoyad))
}
function validateTCKN(tc){
  const re=/^[1-9]{1}[0-9]{9}[02468]{1}$/i;
  return re.test(String(tc))
}
function validateTEL(tel){
  const re=/^(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/i;
  return re.test(String(tel))
}
const Profil=()=>{
    const spinner=<div class="spinner-border text-light" role="status"></div>
    const [auth,setAuth]=useState(false);
    const [loading,setLoading]=useState(false);
    const [durum,setDurum]=useState();
    const user_password=useRef();
    const user_password_again=useRef();
    const user_ad_soyad=useRef();
    const user_email=useRef();
    const user_tc_no=useRef();
    const user_telefon=useRef();
    const [userDeatils,setUserDetails]=useState({
        type:"",
        ad_soyad:"",
        adres:"",
        email:"",
        istek_listesi:[],
        password:"",
        siparisler: [],
        tc:"",
        telefon:"",
        token:"",
        tokenExpire:"",

    });
    
    const kaydetHandler=async()=>{
        let changed=false;
        if(user_password.current.value!==""||user_password_again.current.value!==""){
            if(user_password.current.value===user_password_again.current.value && user_password.current.value.length>6){

                console.log("password_change")
                userDeatils.password=user_password.current.value;
                changed=true;
            }
        }
        if(user_ad_soyad.current.value!==""){
            if(validateAdSoyad(user_ad_soyad.current.value)){
                userDeatils.ad_soyad=user_ad_soyad.current.value;
                changed=true;
            }
        }
        if(user_tc_no.current.value!==""){
            if(validateTCKN(user_tc_no.current.value)){
                userDeatils.tc=user_tc_no.current.value;
                changed=true;
            }
        }
        if(user_email.current.value!==""){
            if(validateEmail(user_email.current.value)){
                userDeatils.email=user_email.current.value;
                changed=true;
            }
        }
        if(user_telefon.current.value!==""){
            if(validateTEL(user_telefon.current.value)){
                userDeatils.telefon=user_telefon.current.value;
                changed=true;
            }
        }
        if(changed&&user_password.current.value!==""&&user_password.current.value===user_password_again.current.value){
            userDeatils.type="auth";
            changed=false;
            setLoading(true)
        const response=await fetch("/api/auth",{
            method:"POST",
            body:JSON.stringify(userDeatils)
          });
          const data=await response.json();
          if(data.message==="Updated!"){
            setDurum(<CustomizedSnackbars type="success" text="İşlem başarı ile tamamlandı"/>)
          }
          else if (data.message==="Token Expired"){
            setDurum(<><CustomizedSnackbars type="warning" text="Oturum süreniz dolmuş lütfen tekrar giriş yapın"/></>)
            
          }
          else if (data.message==="Access Denied"){
            setDurum(<><CustomizedSnackbars type="error" text="Erişim engellendi!"/></>)
           
          }
          else{
            setDurum(<><CustomizedSnackbars type="error" text="Beklenmeyen bir hata oluştu"/></>)
            
          }
          setLoading(false)
        }

        else if (user_password.current.value!==user_password_again.current.value){
            setDurum(<CustomizedSnackbars type="info" text="Şifre Tekrarı Hatalı"/>)
        }
        else if (changed&&user_password.current.value===""){
            userDeatils.type="auth";
            changed=false;
            setLoading(true)
        const response=await fetch("/api/auth",{
            method:"POST",
            body:JSON.stringify({ 
                type:"auth",
                 email:userDeatils.email, 
                 ad_soyad:userDeatils.ad_soyad,
                 tc:userDeatils.tc,
                telefon:userDeatils.telefon,
                adres:userDeatils.adres,
                istek_listesi:userDeatils.istek_listesi,
                siparisler:userDeatils.siparisler,
                token:userDeatils.token,
            })
          });
          const data=await response.json();
          if(data.message==="Updated!"){
            setDurum(<CustomizedSnackbars type="success" text="İşlem başarı ile tamamlandı"/>)
            localStorage.setItem("user",JSON.stringify({ 
                 email:userDeatils.email, 
                 ad_soyad:userDeatils.ad_soyad,
                 tc:userDeatils.tc,
                telefon:userDeatils.telefon,
                adres:userDeatils.adres,
                istek_listesi:userDeatils.istek_listesi,
                siparisler:userDeatils.siparisler,
                token:userDeatils.token,
                tokenExpire:userDeatils.tokenExpire
            }))
          }
          else if (data.message==="Token Expired"){
            setDurum(<><CustomizedSnackbars type="warning" text="Oturum süreniz dolmuş lütfen tekrar giriş yapın"/></>)
            setTimeout(()=>{
                
                localStorage.clear();
            },1000)
            
          }
          else if (data.message==="Access Denied"){
            setDurum(<><CustomizedSnackbars type="error" text="Erişim engellendi!"/></>)
            setTimeout(()=>{
                localStorage.clear();
            },1000)
          }
          else{
            setDurum(<><CustomizedSnackbars type="error" text="Beklenmeyen bir hata oluştu"/></>)
            setTimeout(()=>{
                localStorage.clear();
            },1000)
          }
          setLoading(false)
        }
        
       
        
    }

    useEffect(()=>{
        setUserDetails(JSON.parse(localStorage.getItem('user')));
    },[])
    useEffect(()=>{
      if (typeof window !== "undefined" && !!localStorage.getItem('auth')) {
        setAuth(localStorage.getItem('auth'));
      }
    },[])
    return <>{!auth?   <><div className="card container noshadow">
    <div className="card-body">
      Lütfen Giriş Yapınız<br/> <br/><Link href="/uye/giris">Giriş Yapmak/Üye olmak için Tıklayınız</Link>
      </div></div>
</>:<>
      <div className="profil-pc">
        <div className="card container noshadow">
        <div className="card-body d-flex">
    <ProfilBar/>
    <div className="card container noshadow w-75">
        <div className="card-body ">
            <h1 className="fs-4">Üyelik Bilgilerim</h1>
            <div className="card mt-3">
                <div className="card-body ">
                    <div className="d-flex justify-content-evenly">
                <ul>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Ad Soyad:</span>  <input type="text"  className="form-control" placeholder={userDeatils.ad_soyad} ref={user_ad_soyad}></input></li>
            
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">T.C No:</span>  <input type="number" className="form-control" placeholder={userDeatils.tc} ref={user_tc_no}></input></li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">E-posta:</span>  <input type="mail" className="form-control" placeholder={userDeatils.email} ref={user_email}></input></li>
                </ul>
                <ul>
                <li className="d-flex nowrap align-items-center my-2">
                <span className="me-2">Cep Telefonu:</span>  
                <div className="input-group">
                <span className="input-group-text" id="phone2"><img src="/turkey.png"></img></span>
                <input type="number" className="form-control" placeholder={userDeatils.telefon} aria-label="phone2" aria-describedby="phone1" ref={user_telefon}></input>
                </div>
                </li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Yeni Şifre:</span>  <input type="password" className="form-control" placeholder="" ref={user_password}></input></li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Yeni Şifre Tekrar:</span>  <input type="password" className="form-control" placeholder="" ref={user_password_again}></input></li>
                
                </ul>
                </div>
                <div className="w-100 d-flex flex-column">
                <button type="button" onClick={kaydetHandler} className={`btn btn-warning ${loading&&"disabled"}`}>{loading?spinner:"Kaydet"}</button>
                {durum}
                </div>
                </div>
                
            </div>

        </div>
    </div>
        </div>
    </div>
    </div>
    <div className="profil-mobile">
        <div className="card container noshadow">
        <div className="card-body d-flex flex-column ">
    <ProfilBar/>
    <div className="uyebilgi-pc">
    <div className="card container noshadow">
        <div className="card-body ">
            <h1 className="fs-4">Üyelik Bilgilerim</h1>
            <div className="card mt-3">
                <div className="card-body ">
                    <div className="d-flex justify-content-evenly">
                <ul>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Ad Soyad:</span>  <input type="text"  className="form-control" placeholder={userDeatils.ad_soyad} ref={user_ad_soyad}></input></li>
            
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">T.C No:</span>  <input type="number" className="form-control" placeholder={userDeatils.tc} ref={user_tc_no}></input></li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">E-posta:</span>  <input type="mail" className="form-control" placeholder={userDeatils.email} ref={user_email}></input></li>
                </ul>
                <ul>
                <li className="d-flex nowrap align-items-center my-2">
                <span className="me-2">Cep Telefonu:</span>  
                <div className="input-group">
                <span className="input-group-text" id="phone2"><img src="/turkey.png"></img></span>
                <input type="number" className="form-control" placeholder={userDeatils.telefon} aria-label="phone2" aria-describedby="phone1" ref={user_telefon}></input>
                </div>
                </li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Yeni Şifre:</span>  <input type="password" className="form-control" placeholder="" ref={user_password}></input></li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Yeni Şifre Tekrar:</span>  <input type="password" className="form-control" placeholder="" ref={user_password_again}></input></li>
                
                </ul>
                </div>
                <div className="w-100 d-flex flex-column">
                <button type="button" onClick={kaydetHandler} className={`btn btn-warning ${loading&&"disabled"}`}>{loading?spinner:"Kaydet"}</button>
                {durum}
                </div>
                </div>
                
            </div>

        </div>
    </div>
    </div>


    <div className="uyebilgi-mobile pt-1">
    <div className="card container noshadow">
        <div className="card-body ">
            <h1 className="fs-4">Üyelik Bilgilerim</h1>
            <div className="card mt-3">
                <div className="card-body ">
                    <div className="d-flex justify-content-evenly">
                <ul>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Ad Soyad:</span>  <input type="text"  className="form-control" placeholder={userDeatils.ad_soyad} ref={user_ad_soyad}></input></li>
            
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">T.C No:</span>  <input type="number" className="form-control" placeholder={userDeatils.tc} ref={user_tc_no}></input></li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">E-posta:</span>  <input type="mail" className="form-control" placeholder={userDeatils.email} ref={user_email}></input></li>
                
                <li className="d-flex nowrap align-items-center my-2">
                <span className="me-2">Cep:</span>  
                <div className="input-group">
                <span className="input-group-text" id="phone2"><img src="/turkey.png"></img></span>
                <input type="number" className="form-control" placeholder={userDeatils.telefon} aria-label="phone2" aria-describedby="phone1" ref={user_telefon}></input>
                </div>
                </li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Yeni Şifre:</span>  <input type="password" className="form-control" placeholder="" ref={user_password}></input></li>
                <li className="d-flex nowrap align-items-center my-2"><span className="me-2">Yeni Şifre Tekrar:</span>  <input type="password" className="form-control" placeholder="" ref={user_password_again}></input></li>
                
                </ul>
                </div>
                <div className="w-100 d-flex flex-column">
                <button type="button" onClick={kaydetHandler} className={`btn btn-warning ${loading&&"disabled"}`}>{loading?spinner:"Kaydet"}</button>
                {durum}
                </div>
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