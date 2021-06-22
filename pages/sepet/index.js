import SepetItems from "../../components/SepetItems";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import {navbarActions} from "../../store";
import Link from 'next/link'
const Sepet=()=>{
    const sepet=useSelector(state=>state.navbar.sepet);
    const sepet_toplam_ucret=!!sepet?sepet.map((value)=>{return value.current_price}).reduce((a, b) => a + b, 0):0
    const dispatch=useDispatch();
    const indirim_kuponlari=[
        {
            id:1,
            tutar:0.5,
            kod:"50KOD",
            left:1
        },
        {
            id:2,
            tutar:0.1,
            kod:"10KOD",
            left:5
        },
        {
            id:3,
            tutar:0.2,
            kod:"20KOD",
            left:16
        }
    ]
    const kuponHandler=()=>{
      
    }

    return <>
    <div className="sepet-pc">
    <div className="card container noshadow">
    <div className="card-body">
    <div className="card container noshadow">
            <div className="card-body">
            <p className="fs-4">Sepetim</p>
        <ul>
        
           <SepetItems/>
           

            <div className="card d-flex flex-row">
                <div className="card-body w-25">
                    <div className="card p-2">
                        <b className="fs-5">İndirim Kuponu</b>
                        <p>Mevcut indirim kuponunuz varsa aşağıdaki alana girerek sepetinize kupon tutarında indirim uygulayabilirsiniz.</p>
                        <div className="input-group mb-3 w-50">
                        <input type="text" className="form-control" placeholder="Kupon Kodunuz" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button onClick={kuponHandler} className="btn btn-outline-secondary" type="button" id="button-addon2">Uygula</button>
                        </div>
                    </div>
                </div>
                <div className="card-body w-25">
                    <div className="card p-2">
                        
                        <div className="d-flex justify-content-between mx-3"><p>Ara Toplam:</p><p>{Math.round(sepet_toplam_ucret*0.82)}TL</p></div>
                        <div className="d-flex justify-content-between mx-3"><p>KDV:</p><p>{Math.round(sepet_toplam_ucret*0.18)}TL</p></div>
                        <div className="d-flex justify-content-between mx-3"><b>Genel Toplam:</b><b>{Math.round(sepet_toplam_ucret)}TL</b></div><br/>
                        
                        <Link href="/checkout/"><button type="button" className="btn back-color-blue text-color-white">Tamamla</button></Link>
                        
                    </div>
                </div>
            </div>



        </ul>
        </div></div>

    </div>
    </div>
    </div>

    <div className="sepet-mobile">
    
    <div className="card container noshadow">
            <div className="card-body">
            <p className="fs-4">Sepetim</p>
        <ul>
        
           <SepetItems/>
           

            <div className="card d-flex flex-column">
                <div className="card-body">
                    <div className="card p-2">
                        <b className="fs-5">İndirim Kuponu</b>
                        <p>Mevcut indirim kuponunuz varsa aşağıdaki alana girerek sepetinize kupon tutarında indirim uygulayabilirsiniz.</p>
                        <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Kupon Kodunuz" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button onClick={kuponHandler} className="btn btn-outline-secondary" type="button" id="button-addon2">Uygula</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card p-2">
                        
                        <div className="d-flex justify-content-between mx-3"><p>Ara Toplam:</p><p>{Math.round(sepet_toplam_ucret*0.82)}TL</p></div>
                        <div className="d-flex justify-content-between mx-3"><p>KDV:</p><p>{Math.round(sepet_toplam_ucret*0.18)}TL</p></div>
                        <div className="d-flex justify-content-between mx-3"><b>Genel Toplam:</b><b>{Math.round(sepet_toplam_ucret)}TL</b></div><br/>
                        
                        <Link href="/checkout/"><button type="button" className="btn back-color-blue text-color-white">Tamamla</button></Link>
                        
                    </div>
                </div>
            </div>



        </ul>
        </div></div>

    </div>
  
    </>

}

export default Sepet;