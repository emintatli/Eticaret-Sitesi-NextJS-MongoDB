import {useEffect} from "react"
const LogOut=()=>{
    useEffect(()=>{
        localStorage.clear();
    },[])
    
    return <><meta http-equiv="refresh" content="0; URL=/uye/giris" /></>
}
export default LogOut;