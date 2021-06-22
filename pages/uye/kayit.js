import { useState,useEffect,useRef } from "react";
import Link from 'next/link'
import CustomizedSnackbars from "../../components/alert"

const Kayit = () => {
  const [auth,setAuth]=useState(false);
  const [durum,setDurum]=useState("");
  const user_password=useRef();
  const user_password_again=useRef();
  const user_ad_soyad=useRef();
  const user_adres=useRef();
  const user_email=useRef();
  const user_tc_no=useRef();
  const user_telefon=useRef();
  const [loading,setLoading]=useState(false);
  const spinner=<div class="spinner-border text-light" role="status"></div>;
  useEffect(()=>{
    if (typeof window !== "undefined" && !!localStorage.getItem('auth')) {
      setAuth(localStorage.getItem('auth'));
    }
  },[])
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

  const kayitHandler=async ()=>{
    
    if(user_email.current.value===""||user_password.current.value===""||user_ad_soyad.current.value===""||user_adres.current.value==="")
    {
      setDurum(<CustomizedSnackbars type="error" text="İlgili alanlar boş olamaz"/>)
    }
    else if(!validateEmail(user_email.current.value)){
      setDurum(<CustomizedSnackbars type="info" text="Girilen email adresi geçerli değil"/>)
    }
    else if(user_password.current.value!==user_password_again.current.value){
      setDurum(<CustomizedSnackbars type="info" text="Şifreler eşleşmiyor"/>)
    }
    else if (!validateAdSoyad(user_ad_soyad.current.value))
    setDurum(<CustomizedSnackbars type="info" text="Girilen ad soyad geçerli değil"/>)
    else if(!validateTCKN(user_tc_no.current.value)){
      setDurum(<CustomizedSnackbars type="info" text="TCKN geçerli değil"/>)
    }
    else if(!validateTEL(user_telefon.current.value)){
      setDurum(<CustomizedSnackbars type="info" text="Telefon numarası geçerli değil"/>)
    }
    else{
      setLoading(true);
      const response=await fetch("/api/auth",{
        method:"POST",
        body:JSON.stringify({
          type:"register",
          email:user_email.current.value,
          password:user_password.current.value,
          ad_soyad:user_ad_soyad.current.value,
          adres:user_adres.current.value,
          tc:user_tc_no.current.value,
          telefon:user_telefon.current.value
        })
      });
      
      const data=await response.json();
      if(data.message==="success"){
        setDurum(<><CustomizedSnackbars type="success" text="Üyelik Oluşturuldu. Yönlendiriliyorsunuz..."/><meta http-equiv="refresh" content="3; URL=/uye/giris" /></>)
        console.log("kullanıcı oluşturuldu")
      }
      else if(data.message==="user already exist"){
        setDurum(<CustomizedSnackbars type="warning" text="Kullanıcı zaten kayıtlı!"/>)
        console.log("kullanıcı zaten kayıtlı")
        setLoading(false);
      }
      else if(data.message==="password is too weak"){
        console.log("şifre çok kısa")
        setDurum(<CustomizedSnackbars type="warning" text="Şifre çok kısa"/>)
        setLoading(false);
      }
      else{
        setDurum(<CustomizedSnackbars type="error" text="Beklenmeyen bir hata"/>)
        console.log("beklenmeyen bir hata")
        setLoading(false);
      }
      
      console.log(data)
     
    }
    
    
  }
   
  return (
    <>
    {!auth&&<div className="container card noshadow">
        <div className="container w-75 card mt-3 mb-3 noshadow">
          <br />
          <p>
            <i className="fas fa-sign-in-alt"></i> Kayıt Ol
          </p>
          <div className="row">
            <div className="col">
              <label  htmlFor="exampleInputEmail1">Email*</label>
              <input
              ref={user_email}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="ornek@deneme.com"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputPassword1">Şifre*</label>
              <input
              ref={user_password} 
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputPassword1">Şifre Tekrar*</label>
              <input
              ref={user_password_again} 
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="inputName">Ad Soyad*</label>
              <input ref={user_ad_soyad} type="text" className="form-control" id="inputName" placeHolder="Ali VELİ"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="inputName">Telefon*</label>
              <input ref={user_telefon} type="number" className="form-control" id="inputName" placeHolder="05071112233" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="inputName">TC No*</label>
              <input ref={user_tc_no} type="number" className="form-control" id="inputName" placeHolder="4444332244"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label  htmlFor="inputadres">Adres*</label>
              <input ref={user_adres} type="text" className="form-control" id="inputadres" />
            </div>
          </div>
          <br />
          <button onClick={kayitHandler} className={`btn back-color-blue text-color-white ${loading&&"disabled"}`}>{loading?spinner:"Kayıt Ol"} </button>
          <p>
            {" "}
            Zaten hesabınız var mı? <u className="text-primary"><Link href="/uye/giris">Giriş Yap</Link></u>
          </p>
          <br />

          {durum}
          
          
          {/* <CustomizedSnackbars type="warning"/>
          <CustomizedSnackbars type="info"/>
          <CustomizedSnackbars type="error"/> */}
        </div>
      </div>}
      
    </>
  );
};
export default Kayit;
