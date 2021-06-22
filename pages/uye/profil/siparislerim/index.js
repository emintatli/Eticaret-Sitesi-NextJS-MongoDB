import ProfilBar from "../../../../components/ProfilBar";
import Link from 'next/link'
import { useState,useEffect } from "react";
const Siparislerinm=()=>{
    const [auth,setAuth]=useState(false);
    const [siparis_data,Setsiparis_data]=useState([""]);
    useEffect(()=>{
        Setsiparis_data(JSON.parse(localStorage.getItem("user")).siparisler)
    },[])


    useEffect(()=>{
      if (typeof window !== "undefined" && !!localStorage.getItem('auth')) {
        setAuth(localStorage.getItem('auth'));
      }
    },[])
    return <>{auth?<>
    <div className="siparislerim-pc">
    <div className="card container noshadow">
    <div className="card-body d-flex">
    <ProfilBar/>
    
<div className="card container noshadow w-75">
    <div className="card-body">
    <p className="fs-4">Siparişlerim</p>
        <ul>

            {siparis_data.map((value,num)=>{return <li>
                <div className="card my-3">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <img src="/online-shopping.png" width="70" height="70"></img>
                        <span className="mx-3 fs-6">Sipariş Tarihi : <b>{value.tarih}</b></span>
                        <span className="mx-3 fs-6">Toplam Tutar : <b>{value.tutar} TL</b></span>
                        <span className="mx-3 fs-6">Sipariş No : #{value.sip_no}</span>
                        <button type="button" className="btn btn-outline-info"><Link href={`/uye/profil/siparislerim/detay/${num}`}>Sipariş Detayı</Link></button>
                    </div>
                </div>
            </li>})}




        </ul>
    </div>
</div>



    </div>
</div>
</div>



<div className="siparislerim-mobile ">
    <div className="card container noshadow ">
    <div className="card-body d-flex flex-column">
    <ProfilBar/>
    
<div className="card container noshadow mt-1">
    <div className="card-body ">
    <p className="fs-4">Siparişlerim</p>
        <ul>

            {siparis_data.map((value,num)=>{return <li>
                <div className="card my-1">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        
                        <span className="mx-1 fs-6">Sipariş Tarihi : <b>{value.tarih}</b></span>
                        <span className="mx-1 fs-6">Toplam Tutar : <b>{value.tutar} TL</b></span>
                        
                        <button type="button" className="btn btn-outline-info"><Link href={`/uye/profil/siparislerim/detay/${num}`}>Detay</Link></button>
                    </div>
                </div>
            </li>})}




        </ul>
    </div>
</div>



    </div>
</div>
</div>
    
    
    
    
    </>:<>   <div className="card container noshadow">
          <div className="card-body">
            Lütfen Giriş Yapınız<br/> <br/><Link href="/uye/giris">Giriş Yapmak/Üye olmak için Tıklayınız</Link>
            </div></div>
    </>
}
   
    </>

}
export default Siparislerinm;