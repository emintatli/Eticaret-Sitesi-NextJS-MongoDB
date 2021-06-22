import HorizontalLinearStepper from "../stepper"
import {useState,useEffect} from "react"
import ProfilBar from "../../../../../components/ProfilBar";
import {useRouter} from "next/router"
const Detay=(props)=>{
    const router= useRouter();
    const [siparis_data,Setsiparis_data]=useState();
    const [total_price,Settotal_price]=useState(0);
    const [dataReady,setdataReady]=useState(false);
   
    useEffect(()=>{
        if(!router.isReady) return;
    
        Setsiparis_data(JSON.parse(localStorage.getItem("user")).siparisler[router.query.sipno]);
   
        setdataReady(true);
        
    }, [router.isReady]);
  
    useEffect(()=>{
        if(!router.isReady) return;
        if(siparis_data===undefined||siparis_data===null||siparis_data==="") return;
        
        Settotal_price(siparis_data.urunler.map((value)=>{return value.current_price}).reduce((a, b) => a + b, 0))
    },[siparis_data])
    

    return <>
    {dataReady&&<>
    <div className="sipdetay-pc">
        <div className="card container noshadow">
        <div className="card-body d-flex">
        <ProfilBar/>
    <div className="card container noshadow w-75">
        <div className="card-body">
            <div className="card mb-1">
                <div className="card-body">
                    <span className="fs-4">#{router.query.sipno} Sipariş Detay</span>
                </div>
            </div>
            <div className="card mb-1">
                <div className="card-body">
                        <HorizontalLinearStepper step={siparis_data.durum}/>
                </div>
            </div>
            <div className="card mb-1">
                <div className="card-body">
                {siparis_data.urunler.map((value)=>{return  <div className="card mb-1">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <img src={value.image[0]} width="200px" height="150px"></img>
                  <span className="fs-6">{value.name}</span>  
                  <span className="fs-6"><b>{value.current_price} TL</b></span>      
                </div>
            </div>
           })}       
               
            <div className="card mb-1">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column">
                 
                  <span className="fs-6">Ücret</span> 
                  <span className="fs-6">Toplam KDV</span> 
                  <span className="fs-5">Toplam Ücret (KDV Dahil)</span> 
                  </div>
                   <div className="d-flex flex-column">
                   
                   <span className="fs-6">{Math.round(total_price*0.82* 100)/100} TL</span>
                   <span className="fs-6">{Math.round(total_price*0.18* 100)/100} TL</span>
                   <span className="fs-5"><b>{Math.round(total_price* 100)/100} TL</b></span>
                   </div>
                        
                </div>
            </div>

                </div>
            </div>
        </div>
    </div>
        </div>
    </div>
    </div>



    <div className="sipdetay-mobile">
        <div className="card container noshadow">
        <div className="card-body d-flex flex-column">
        <ProfilBar/>
    <div className="card container noshadow mt-1">
        <div className="card-body">
            <div className="card mb-1">
                <div className="card-body d-flex justify-content-center">
                    <span className="fs-4">#{router.query.sipno} Sipariş Detay</span>
                </div>
            </div>
            <div className="card mb-1">
                <div className="card-body d-flex justify-content-center">
                    Durum:
                    {siparis_data.durum==="0"&&<b>Ürün Hazırlanıyor</b>}
                    {siparis_data.durum==="1"&&<b>Ürün Kargoya Verildi</b>}
                    {siparis_data.durum==="2"&&<b>Ürün Teslim Edildi</b>}  
                    {siparis_data.durum==="3"&&<b>Sipariş Tamamlandı</b>} 
                </div>
            </div>
            <div className="card mb-1">
                <div className="card-body">
                {siparis_data.urunler.map((value)=>{return  <div className="card mb-1">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <img className="me-2" src={value.image[0]} width="100px" height="50px"></img>
                  <span className="fs-6">{value.name}</span>  
                  <span className="fs-6"><b>{value.current_price} TL</b></span>      
                </div>
            </div>
           })}       
               
            <div className="card mb-1">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column">
                 
                  <span className="fs-6">Ücret</span> 
                  <span className="fs-6">Toplam KDV</span> 
                  <span className="fs-5">Toplam Ücret (KDV Dahil)</span> 
                  </div>
                   <div className="d-flex flex-column">
                   
                   <span className="fs-6">{Math.round(total_price*0.82* 100)/100} TL</span>
                   <span className="fs-6">{Math.round(total_price*0.18* 100)/100} TL</span>
                   <span className="fs-5"><b>{Math.round(total_price* 100)/100} TL</b></span>
                   </div>
                        
                </div>
            </div>

                </div>
            </div>
        </div>
    </div>
        </div>
    </div>
    </div>
    
    </>}
  
    </>

}
export default Detay;