import Rating from "@material-ui/lab/Rating";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import {navbarActions} from "../../../store";
import {MongoClient} from "mongodb";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export async function getServerSideProps(context){
	const urlId= context.params.urunid ; // url deki /345345 okuma
	const req= context.req;
	const res = context.res; // incoming request things

  const uri ="MONGO_DB_ADRESS";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  try{
    await client.connect();
    const database = client.db("alisveris_db");
    const movies = database.collection("urunler");
    const finder=await movies.findOne({url:urlId});
    if(finder){
      
      await client.close();
      return{
        props:{
        urun:JSON.stringify(finder) 
        }
        }
      
    }
    else{
      console.log("not found")
    }
  }
  catch(err){
    console.log(err.toString())
  }

    
  }

  
    

const UrunDetay = (props) => {
  const [urunStar,setUrunStar]=useState(<></>);
  const [urun,setUrun]=useState({
    id:0,
    active_img:0,
    category:"",
    brand:["",""],
    name:"",
    image:["","",""],
    detay:[
        "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",

],
    old_price:0,
    current_price:0,
    stock:0,
    url:"",
    style:["","",""],
    comments:[{
        user:"",
        comment:"",
        star:0
    },
    {
      user:"",
      comment:"",
      star:0
  }]
});

  const [yorumShow,setyorumShow]=useState(1);
  const dispatch=useDispatch();
  
  const [stars, setStars] = useState(0);


  const sepetEkleHandler=()=>{
    const new_urun={...urun,id:Math.random()}
      dispatch(navbarActions.sepet_ekle({urun:new_urun}))
  }
  
  useEffect(()=>{
   setUrun(JSON.parse(props.urun));
  },[])  
  useEffect(()=>{
    const stars =  <Box component="fieldset" mb={3} borderColor="transparent">
    <Rating
      name="simple-controlled"
      value={urun.comments.map((value)=>{return value.star}).reduce((a, b) => a + b, 0)/urun.comments.length}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      readOnly
    />
  </Box>
    setUrunStar(stars)
   
  },[urun])
  return (
    <>
    <div className="urun-pc">
      <div className="container card noshadow">
        <div className="card-body d-flex ">
          <div className="card w-50 ">
            <div className="card-body d-flex flex-column align-items-center">
            {props.meetups}
              <img
                src={urun.image[urun.active_img]}
                width="500px"
                height="500px"
              ></img>
              <div className="card w-100">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <i className="fas fa-chevron-left"></i>
                  <img
                  onClick={()=>{setUrun({...urun,active_img:0})}}
                    src={urun.image[0]}
                    width="100px"
                    height="100px"
                  ></img>
                  <img
                   onClick={()=>{setUrun({...urun,active_img:1})}}
                    src={urun.image[1]}
                    width="100px"
                    height="100px"
                  ></img>
                  <img
                   onClick={()=>{setUrun({...urun,active_img:2})}}
                    src={urun.image[2]}
                    width="100px"
                    height="100px"
                  ></img>
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              <div className="card w-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <img src={urun.brand[1]}></img>
                  <span>{urun.brand[0]}</span>
                </div>
              </div>
              
            </div>
          </div>

          <div className="card w-50">
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Anasayfa</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">{urun.category}</a>
                  </li>
                  
                </ol>
              </nav>

              <h1 className="fs-4">
               {urun.name}
              </h1>
              {urunStar}
              <br />
              <s className="fs-5 text-danger">{urun.old_price} ₺</s><br/>
              <span className="fs-1 text-info">{urun.current_price} ₺</span>
              <br />
              <span className="fs-6 text-black-50">
                <b>{urun.current_price/5}₺</b> den başlayan taksitlerle (5 Taksit)
              </span>
              <br />
              <span className="fs-6 text-black-50">Tür</span>
              <br />
              {urun.style.map((value)=>{return <button type="button" className="btn btn-outline-secondary btn-sm ms-1">{value}</button>})}

              <br />
              <button
              
              onClick={sepetEkleHandler}
                type="button"
                className="btn btn-primary btn-lg mt-3 back-color-blue border-color-blue"
              >
                <i className="fas fa-cart-plus"></i> Sepete Ekle
              </button>
              <button type="button" className="btn btn-danger btn-lg mt-3 ms-1">
                <i className="fas fa-heart"></i>
              </button>
              <button type="button" className="btn btn-warning btn-lg mt-3 ms-1">
                <i className="fas fa-share-alt"></i>
              </button>

              <div className="card mt-3">
                <div className="card-body">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className={`nav-link ${yorumShow===1&&"active"}`} active onClick={()=>{setyorumShow(1)}} aria-current="page" href="#">
                        Yorum Yap
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className={`nav-link ${yorumShow===2&&"active"}`} onClick={()=>{setyorumShow(2)}} href="#">
                        Yorumlar
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${yorumShow===3&&"active"}`} onClick={()=>{setyorumShow(3)}} href="#">
                        Ürün Detay
                      </a>
                    </li>
                  
                  </ul>
                  {yorumShow===1&&<div className="card mt-3">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Yorum Yap:
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                        <div className="d-flex mt-3 justify-content-between">
                          <Rating
                            name="hover-feedback"
                            value={stars}
                            size="large"
                            className="justify-self-center"
                            precision={0.5}
                            onChange={(event, newValue) => {
                              setStars(newValue);
                              console.log(stars);
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary "
                          >
                            Gönder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  }
                  {yorumShow===2&&
                                      <div className="card-body">
                                      <div className="form-group">
                                        <ul>
                                          {urun.comments.map((value)=>{
                                            return <li>
                                              <div className="card mt-1">
                                                <div className="card-body d-flex flex-column">
                                                <Rating
                                                 name="half-rating-read"
                                                 defaultValue={value.star}
                                                 precision={0.5}
                                                  readOnly
                                                   />
                                                  <span className="fs-4">{value.user}</span>
                                                 Yorum: <p>{value.comment}</p>
                                              </div>
                                              </div>
                                              </li>
                                            })}
                                          
                                          
                                         
                                       
                                         
                                        </ul>
                                       
                                        </div>
                                        </div>
                  
                  }
                    {yorumShow===3&&
                                      <div className="card-body">
                                      <div className="form-group">
                                        <ul>
                                       {urun.detay.map((value)=>{
                                         return <li>{value}</li>
                                       })}
                                       </ul>
                                        </div>
                                        </div>
                  
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>




      <div className="urun-mobile">
      <div className="container card noshadow">
        <div className="card-body d-flex flex-column">
          <div className="card">
            <div className="card-body d-flex flex-column align-items-center">
            {props.meetups}
              <img
                src={urun.image[urun.active_img]}
                width="300px"
                height="300px"
              ></img>
              <div className="card w-100">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <i className="fas fa-chevron-left"></i>
                  <img
                  onClick={()=>{setUrun({...urun,active_img:0})}}
                    src={urun.image[0]}
                    width="100px"
                    height="100px"
                  ></img>
                  <img
                   onClick={()=>{setUrun({...urun,active_img:1})}}
                    src={urun.image[1]}
                    width="100px"
                    height="100px"
                  ></img>
                  <img
                   onClick={()=>{setUrun({...urun,active_img:2})}}
                    src={urun.image[2]}
                    width="100px"
                    height="100px"
                  ></img>
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              <div className="card w-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <img src={urun.brand[1]}></img>
                  <span>{urun.brand[0]}</span>
                </div>
              </div>
              
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Anasayfa</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">{urun.category}</a>
                  </li>
                  
                </ol>
              </nav>

              <h1 className="fs-4">
               {urun.name}
              </h1>
              {urunStar}
              <br />
              <s className="fs-5 text-danger">{urun.old_price} ₺</s><br/>
              <span className="fs-1 text-info">{urun.current_price} ₺</span>
              <br />
              <span className="fs-6 text-black-50">
                <b>{urun.current_price/5}₺</b> den başlayan taksitlerle (5 Taksit)
              </span>
              <br />
              <span className="fs-6 text-black-50">Tür</span>
              <br />
              {urun.style.map((value)=>{return <button type="button" className="btn btn-outline-secondary btn-sm ms-1">{value}</button>})}

              <br />
              <button
              
              onClick={sepetEkleHandler}
                type="button"
                className="btn btn-primary btn-lg mt-3 back-color-blue border-color-blue"
              >
                <i className="fas fa-cart-plus"></i> Sepete Ekle
              </button>
              <button type="button" className="btn btn-danger btn-lg mt-3 ms-1">
                <i className="fas fa-heart"></i>
              </button>
              <button type="button" className="btn btn-warning btn-lg mt-3 ms-1">
                <i className="fas fa-share-alt"></i>
              </button>

              <div className="card mt-3">
                <div className="card-body">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className={`nav-link ${yorumShow===1&&"active"}`} active onClick={()=>{setyorumShow(1)}} aria-current="page" href="#">
                        Yorum Yap
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className={`nav-link ${yorumShow===2&&"active"}`} onClick={()=>{setyorumShow(2)}} href="#">
                        Yorumlar
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${yorumShow===3&&"active"}`} onClick={()=>{setyorumShow(3)}} href="#">
                        Ürün Detay
                      </a>
                    </li>
                  
                  </ul>
                  {yorumShow===1&&<div className="card mt-3">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Yorum Yap:
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                        <div className="d-flex mt-3 justify-content-between">
                          <Rating
                            name="hover-feedback"
                            value={stars}
                            size="large"
                            className="justify-self-center"
                            precision={0.5}
                            onChange={(event, newValue) => {
                              setStars(newValue);
                              console.log(stars);
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary "
                          >
                            Gönder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  }
                  {yorumShow===2&&
                                      <div className="card-body">
                                      <div className="form-group">
                                        <ul>
                                          {urun.comments.map((value)=>{
                                            return <li>
                                              <div className="card mt-1">
                                                <div className="card-body d-flex flex-column">
                                                <Rating
                                                 name="half-rating-read"
                                                 defaultValue={value.star}
                                                 precision={0.5}
                                                  readOnly
                                                   />
                                                  <span className="fs-4">{value.user}</span>
                                                 Yorum: <p>{value.comment}</p>
                                              </div>
                                              </div>
                                              </li>
                                            })}
                                          
                                          
                                         
                                       
                                         
                                        </ul>
                                       
                                        </div>
                                        </div>
                  
                  }
                    {yorumShow===3&&
                                      <div className="card-body">
                                      <div className="form-group">
                                        <ul>
                                       {urun.detay.map((value)=>{
                                         return <li>{value}</li>
                                       })}
                                       </ul>
                                        </div>
                                        </div>
                  
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default UrunDetay;
