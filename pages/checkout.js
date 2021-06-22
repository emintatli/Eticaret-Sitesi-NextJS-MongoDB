import PaymentForm from "../components/card"
import SepetItems from "../components/SepetItems";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import {navbarActions} from "../store";
import CustomizedSnackbars from "../components/alert"
import Link from 'next/link'
const Checkout = () => {
  const sepet1=useSelector(state=>state.navbar.sepet);
  const [auth,setAuth]=useState(false);
  const [sepet,SetSepet]=useState();
  const spinner=<div class="spinner-border text-light" role="status"></div>;
  const [totalPrice,setTotalPrice]=useState(0);
  const [kargoPrice,setKargo]=useState(20.9);
  const [loading,setLoading]=useState(false);
  const [redirect,SetRedirect]=useState(<></>)
  const [durum,SetDurum]=useState(<></>);
  const dispatch=useDispatch();
  const sepet_toplam_ucret=!!sepet1?sepet1.map((value)=>{return value.current_price}).reduce((a, b) => a + b, 0)+kargoPrice:0
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
useEffect(()=>{
  setUserDetails(JSON.parse(localStorage.getItem('user')));
},[])


  useEffect(()=>{
    SetSepet(JSON.parse(localStorage.getItem("sepet")));
  },[])



  useEffect(()=>{
    if(sepet){
      setTotalPrice(sepet.map((value)=>{return value.current_price}).reduce((a,b)=>a+b)+kargoPrice)
    }
    
  },[sepet])


  useEffect(()=>{
    
    if (typeof window !== "undefined" && !!localStorage.getItem('auth')) {
      setAuth(localStorage.getItem('auth'));
    }
  },[])
  const updateLocal=async ()=>{
    const response=await fetch("/api/auth",{
      method:"POST",
      body:JSON.stringify({type:"getdata",token:localStorage.getItem("token")})
    });
    const data=await response.json();
    console.log(data.tum.token.token)
    const new_local={
      ad_soyad:data.tum.ad_soyad,
      adres:data.tum.adres,
      email:data.tum.email,
      istek_listesi:data.tum.istek_listesi,
      password:data.tum.password,
      siparisler:data.tum.siparisler,
      tc:data.tum.tc,
      telefon:data.tum.telefon,
      token:data.tum.token.token
    }
    localStorage.setItem("user",JSON.stringify(new_local))
  }

  const odemeHandler=async ()=>{
   



    setLoading(true);
    var today = new Date();
    const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
    const to_go={ 
      type:"auth",
       email:userDeatils.email, 
       ad_soyad:userDeatils.ad_soyad,
       tc:userDeatils.tc,
      telefon:userDeatils.telefon,
      adres:userDeatils.adres,
      istek_listesi:userDeatils.istek_listesi,
      siparisler:[...userDeatils.siparisler,{
        durum:"0",
        id:Math.random(),
        sip_no:"2134123",
        tarih:date,
        tutar:sepet_toplam_ucret,
        urunler:sepet
      }],
      token:userDeatils.token,
  }
    const response= await fetch("/api/auth",{
      method:"POST",
      body:JSON.stringify(to_go)
    });
    const data=await response.json();
    await updateLocal();
    console.log(data)
    
    SetDurum(<CustomizedSnackbars type="success" text="Ödeme İşlemi Başarılı"/>)
    localStorage.setItem("sepet","[]")
    SetRedirect(<meta http-equiv="refresh" content="1; URL=/uye/profil/siparislerim" />)
    
  }
  const redirecters=()=>{
    
        return <meta http-equiv="refresh" content="0; URL=/uye/giris" />
  }
   

  return (
    <>
    {
    !auth?
    <>
    <div className="card container noshadow">
          <div className="card-body">
            Lütfen Giriş Yapınız<br/> <br/><Link href="/uye/giris">Giriş Yapmak/Üye olmak için Tıklayınız</Link>
            </div></div>
    </>
    :
    
          <div className="card container noshadow">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body"><p>Teslimat Adresi</p>
                  <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Faturam Adresime Kargolansın</label>
                 
                  </div>
                  <div className="card mt-2">
                      <div className="card-body">
                          <p>Adresim</p>
                          <p>{userDeatils.adres}</p>
                     <Link href="/uye/profil/adres"><u>Adresimi değiştir</u></Link>
                      </div>
                  </div>
                  </div>
                  
                </div>
                
                <div className="card  mt-1">
                  <div className="card-body">
                      <p>Sepetteki Ürünler</p>
                      
                      <SepetItems/>
                      
                      </div>
                </div>
             
              </div>
              
              <div className="col">
                <div className="card">
                  <div className="card-body"><p>Kargo</p>
                  <div className="card">
                      <div className="card-body">
                      <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                          Aras Kargo (20,90TL)
                      </label>
                      </div>
                      <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                          Yurtiçi Kargo (20,90TL)
                      </label>
                      </div>
                      <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"/>
                      <label className="form-check-label" htmlFor="flexRadioDefault3">
                         UPS (20,90TL)
                      </label>
                      </div>
                      <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" defaultChecked/>
                      <label className="form-check-label" htmlFor="flexRadioDefault4">
                          Sürat Kargo (20,90TL)
                      </label>
                      </div>
                      </div>
                  </div>
                  </div>
                </div>
                <div className="col">
                <div className="card mt-3">
                  <div className="card-body"><p>Kart Bilgileri</p>
                  <PaymentForm/>
                      
                  </div>
                </div>
              </div>
              
                <div className="card mt-1">
                  <div className="card-body d-flex align-items-center flex-column">
                      <p className="fs-4">Ödenecek Tutar:<b> {sepet_toplam_ucret}₺ </b></p>
                      <button onClick={odemeHandler} type="button" className={`btn back-color-blue text-color-white ${loading&&"disabled"}`}><span className="fs-5">{loading?spinner:<><i className="far fa-credit-card"></i>Ödeme Yap</>}</span></button>
                      {durum}
                      </div>
                </div>
             
              </div>
              {redirect}
            </div>
            <div className="row pt-3">
             
              
            </div>
          </div>
        </div>
    }

    </>
  );
};

export default Checkout;
