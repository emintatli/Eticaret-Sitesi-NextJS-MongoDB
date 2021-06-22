import Head from "next/head";
import Image from "next/dist/client/image";
import Link from 'next/link'
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import {navbarActions} from "../store";
function Navbar() {
  const dispatch=useDispatch();
  const [auth,setAuth]=useState(false);
  const sepet=useSelector(state=>state.navbar.sepet);
  const sepet_urun_adet=!!sepet?sepet.length:0;
  useEffect(()=>{
    if(localStorage.getItem('sepet')===null ||localStorage.getItem('sepet')===""){
      localStorage.setItem('sepet', "[]");
      }
  },[])
  useEffect(()=>{
    if(localStorage.getItem('token_expire')){
      if(localStorage.getItem('token_expire')<Date.now()){
        localStorage.clear();
        setAuth(false);
      }
    }
   
  },[])
  
  const sepet_toplam_ucret=!!sepet?sepet.map((value)=>{return value.current_price}).reduce((a, b) => a + b, 0):0
  useEffect(()=>{
    if (typeof window !== "undefined" && !!localStorage.getItem('auth')) {
      setAuth(localStorage.getItem('auth'));
      
    }
    dispatch(navbarActions.sepet_yukle({urun:JSON.parse(localStorage.getItem('sepet'))}))
  },[])
  useEffect(()=>{
    if(!!sepet&&sepet.length>0){
      localStorage.setItem('sepet', JSON.stringify(sepet));
      console.log(sepet)
    }
    
  },[sepet])
 


  return (
    <>
     <div className="mobile">
      <nav className="navbar navbar-light bg-light">
        <div className="container d-flex justify-content-center">
          <a className="" href="#">
          <Link href="/">
            <Image
              src="/store.png"
              alt="Picture of the author"
              width={75}
              height={75}
            />
            </Link>
          </a>
          <ul className="navbar-top">
            <li>
              <ul className="navbar-list">
                <li className="text-center">
                 <i className="fas fa-store"></i> <Link href="/">Mağazamız</Link>
                </li>
                <li className="text-center">
                  {!auth&&<><i className="fas fa-user-plus"></i><Link href="/uye/kayit">Kayıt ol</Link></>}
                </li>
                <li className="text-center">
                  {!auth?<><i className="fas fa-sign-in-alt"></i> <Link href="/uye/giris">Giriş Yap</Link></>:<><i className="fas fa-sign-in-alt"></i> <Link href="/uye/profil">Profilim</Link></>}
                  
                </li>
                
                <li className="text-center">
                  <i className="fas fa-shopping-cart"></i><Link href="/sepet"><span> {sepet_toplam_ucret} TL ({sepet_urun_adet} Ürün)</span></Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="navbar-social d-flex flex-row-reverse align-items-center">
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="fab fa-facebook-square text-primary ms-2 fa-2x"></i>
                </a>
                <a href="https://www.youtube.com/" target="_blank">
                  <i className="fab fa-youtube-square text-danger ms-2 fa-2x"></i>
                </a>
                <a href="https://www.twitter.com/" target="_blank">
                  <i className="fab fa-twitter-square text-info ms-2 fa-2x"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                  <i className="fab fa-instagram-square text-warning ms-2 fa-2x"></i>
                </a>
                <span className="border border-secondary border-2 p-1 navbar-firsat">
                  <i className="fas fa-tags"></i> <Link href="/urun/firsat">Günün Fırsatları</Link>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <br/>
      </div>



      <div className="pc">
      <nav className="navbar navbar-light bg-light">
        <div className="container ">
          <a className="navbar-brand" href="#">
         
            
          <Link href="/">
            <Image
              src="/store.png"
              alt="Picture of the author"
              width={75}
              height={75}
            />
            </Link>
            
                
          
          </a>
          <ul className="navbar-top">
            <li>
              <ul className="navbar-list">
                <li className="text-center">
                 <i className="fas fa-store"></i> <Link href="/">Mağazamız</Link>
                </li>
                <li className="text-center">
                  {!auth&&<><i className="fas fa-user-plus"></i><Link href="/uye/kayit">Kayıt ol</Link></>}
                </li>
                <li className="text-center">
                  {!auth?<><i className="fas fa-sign-in-alt"></i> <Link href="/uye/giris">Giriş Yap</Link></>:<><i className="fas fa-sign-in-alt"></i> <Link href="/uye/profil">Profilim</Link></>}
                  
                </li>
                
                <li className="text-center">
                  <i className="fas fa-shopping-cart"></i><Link href="/sepet"><span> {sepet_toplam_ucret} TL ({sepet_urun_adet} Ürün)</span></Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="navbar-social d-flex flex-row-reverse align-items-center">
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="fab fa-facebook-square text-primary ms-2 fa-2x"></i>
                </a>
                <a href="https://www.youtube.com/" target="_blank">
                  <i className="fab fa-youtube-square text-danger ms-2 fa-2x"></i>
                </a>
                <a href="https://www.twitter.com/" target="_blank">
                  <i className="fab fa-twitter-square text-info ms-2 fa-2x"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                  <i className="fab fa-instagram-square text-warning ms-2 fa-2x"></i>
                </a>
                <span className="border border-secondary border-2 p-1 navbar-firsat">
                  <i className="fas fa-tags"></i> <Link href="/urun/firsat">Günün Fırsatları</Link>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <br/>
      </div>
    </>
  );
}

export default Navbar;
