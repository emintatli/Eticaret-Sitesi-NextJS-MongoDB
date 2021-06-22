
import { useEffect,useState,useRef } from 'react';
import Link from 'next/link'
import CustomizedSnackbars from "../../components/alert"
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateAdSoyad(adsoyad){
const re=/^[a-z ,.'-]+$/i;
return re.test(String(adsoyad))
}
const Giris = () => {
  const spinner=<div class="spinner-border text-light" role="status"></div>;
  const [loading,setLoading]=useState(false);
  const [auth,setAuth]=useState(false);
  const user_mail=useRef();
  const user_password=useRef();
  const [durum,setDurum]=useState();

  useEffect(()=>{
    if (typeof window !== "undefined" && !!localStorage.getItem('auth')) {
      setAuth(localStorage.getItem('auth'));
    }
    else{
      
    }
  },[])


    const loginHandler=async ()=>{
      if(user_mail.current.value===""||user_password.current.value===""||!validateEmail(user_mail.current.value)){
        setDurum(<CustomizedSnackbars type="error" text="Email veya şifre hatalı"/>)
        
      }
      else{
        setLoading(true);
        const response=await fetch("/api/auth",{
          method:"POST",
          body:JSON.stringify({type:"login",email:user_mail.current.value,password:user_password.current.value})
        });
        const data=await response.json();
        if(data.message==="Access Granted!"){
          localStorage.setItem('user', JSON.stringify(data.tum));
          setDurum(<CustomizedSnackbars type="success" text="Giriş yapıldı. Yönlendiriliyorsunuz..."/>)
          setTimeout(()=>{
            localStorage.setItem('token', data.token);
            localStorage.setItem('token_expire', data.expireTime);
            localStorage.setItem('auth', true);
            setAuth(localStorage.getItem('auth'));
          },1000)
         
          
        }
        
        else{
          setDurum(<CustomizedSnackbars type="error" text="Email veya şifre hatalı"/>)
          setLoading(false);
        }
      }
    



     


      // if (typeof window !== "undefined"){
      //   localStorage.setItem('auth', true);
      //   localStorage.setItem('token', 0);
      //   setAuth(localStorage.getItem('auth'));
      // }
      
    }


  return (
    <>
    {auth?<meta httpEquiv="refresh" content="0; URL=/uye/profil" />:<div className="container card noshadow">
        <div className="container w-75 card mt-3 mb-3 noshadow">
          <br />
          <p>
            <i className="fas fa-sign-in-alt"></i> Giriş Yap
          </p>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
              ref={user_mail}
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
              <label htmlFor="exampleInputPassword1">Şifre</label>
              <input
              ref={user_password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          <br />
          <button onClick={loginHandler} className={`btn back-color-blue text-color-white ${loading&&"disabled"}`}>{loading?spinner:"Giriş Yap"} </button>
          <p>
            {" "}
            Hesabınız yok mu? <u className="text-primary"><Link href="/uye/kayit">Kayıt Ol</Link></u>
          </p>
          <br />
          {durum}
        </div>
      </div>
    
    
    }
    
    </>
  );
};
export default Giris;
