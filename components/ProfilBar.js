import Link from 'next/link'
import { useState,useEffect } from 'react';
const ProfilBar=()=>{
    const [userDeatils,setUserDetails]=useState({
        ad_soyad:"",
        adres:"",
        email:"",
        istek_listesi:{},
        password:"",
        siparisler: {},
        tc:"",
        telefon:"",
        token:"",
        tokenExpire:"",

    });
    

    useEffect(()=>{
        setUserDetails(JSON.parse(localStorage.getItem('user')));
    },[])
    return <>
    <div className="profilbar-pc">
    <div className="card container noshadow bg-light">
        <div className="card-body ">
          <span className="fs-5">  Hoşgeldiniz Sn.</span><p className="fs-4">{userDeatils.ad_soyad}</p>
            <div className="card">
                <div className="card-body">
                <ul>
                <li className="border-top">
                <i className="fas fa-user-circle fa-lg my-2"></i><Link href="/uye/profil">Üyelik Bilgilerim</Link> 
                </li>
                <li className="border-top">
                <i className="fas fa-shopping-cart fa-lg my-2"></i> <Link href="/uye/profil/siparislerim">Siparişlerim</Link>
                </li>
                <li className="border-top">
                <i className="fas fa-search-location fa-lg my-2"></i><Link href="/uye/profil/adres"> Adres Bilgilerim</Link>
                </li>
               
                <li className="border-top border-bottom">
                <i className="fas fa-times-circle fa-lg my-2"></i> <Link href="/uye/profil/logout">Çıkış Yap</Link>
                </li>
            </ul>
                </div>
            </div>
           
        </div>
    </div>
    </div>
    
    </>
}
export default ProfilBar;