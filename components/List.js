import { useState,useEffect} from "react";
import Image from "next/dist/client/image";
import Link from 'next/link'

const List = (props) => {
  const [urun, setUrun] = useState(
    [
      {
        id:0,
        active_img:0,
        category:"elektronik",
        brand:["Samsung Türkiye Garantili","/brands/samsung.webp"],
        name:"xxxx",
        image:["/urun_demo/urun1.png","/urun_demo/urun11.png","/urun_demo/urun2.png"],
        detay:[
            "İşlemci Hızı : 2 Ghz",
           "İşlemci Teknolojisi:Quad-Core",
           "Ram (Sistem Belleği):2 GB",
           "Ekran Özellikleri:TFT",
           "İşlemci Markası:Samsung",
           "İşlemci Numarası:SDM 429",
           "Ekran Boyutu:8 inch",
           "Çözünürlük (Piksel):1280 x 800",
    
    ],
        old_price:900,
        current_price:800,
        stock:10,
        url:"Logitech-G-G512-GX",
        style:["Siyah","Beyaz","default"],
        comments:[{
            user:"Ali Veli",
            comment:"Aliqua commodo nisi adipisicing sit officia minim magna velit.",
            star:5
        },
        {
          user:"Mehmet",
          comment:"Aliqua commodo nisi adipisicing sit officia minim magna velit.",
          star:5
      }]
    },
    {
      id:1,
      active_img:0,
      category:"phone",
      brand:["Samsung2 Türkiye Garantili","/brands/samsung.webp"],
      name:"Apple iPad 8. Nesil MYMH2TU/A 32GB 10.2",
      image:["/urun_demo/urun5.png","/urun_demo/urun6.png","/urun_demo/urun7.png"],
      detay:[
          "İşlemci Hızı : 22222 Ghz",
         "İşlemci Teknolojisi:Quad-Core",
         "Ram (Sistem Belleği):2 GB",
         "Ekran Özellikleri:TFT",
         "İşlemci Markası:Samsung",
         "İşlemci Numarası:SDM 429",
         "Ekran Boyutu:8 inch",
         "Çözünürlük (Piksel):1280 x 800",
  
  ],
      old_price:1000,
      current_price:1000,
      stock:10,
      url:"Apple-iPad-8-Nesil-MYMH2TU",
      style:["Siyah","Beyaz","default"],
      comments:[{
          user:"Ali Veli",
          comment:"Aliqua commodo nisi adipisicing sit officia minim magna velit.",
          star:5
      },
      {
        user:"Mehmet",
        comment:"Aliqua commodo nisi adipisicing sit officia minim magna velit.",
        star:5
    }]
  }
      
  ]
  );
 
useEffect(()=>{
  setUrun(props.urun);
},[])

  const changeImageOver = (props) => {
    
    const newUrun=urun.map((value)=>{
      if(props.target.id===value.id.toString()){
        value.active_img=1
      }
      return value
    })
    console.log(newUrun);
    setUrun(newUrun)
   

  };
  const changeImageLeave = (props) => {
    
    const newUrun=urun.map((value)=>{
      if(props.target.id===value.id.toString()){
        value.active_img=0
      }
      return value
    })
    console.log(newUrun);
    setUrun(newUrun)
  };

  return (
    <>

      <div className="container">
        <div className="card fs-5 fw-light text-center border rounded-pill p-2 mb-3 mt-1 nocursor noshadow">
          Fırsat Ürünleri
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">

        {urun.map((value)=>{return(<>
      <div key={value.id} className="col">
      <Link href={`/urun/detay/${value.url}`}><div className="product-card card h-100">
             <div className="mx-auto">
              <Image
              id={value.id}
                src={value.image[value.active_img]}
                width={300}
                height={200}
                onMouseOver={changeImageOver}
                onMouseLeave={changeImageLeave}
                className="card-img-top"
                alt="..."
              /></div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{value.name}</h5>
                <p className="card-text">
                 {/* text alanı*/}
                </p>
                <s className="text-danger">{value.old_price} ₺</s> <p className="fiyat fs-2">{value.current_price} ₺</p>
               <button type="button" className="btn btn-outline-info">
                  Ürünü İncele
                </button>
              </div>
            </div></Link>
          </div>
    
    </>)})}
          

        </div>
      </div>
    </>
  );
};
export default List;
