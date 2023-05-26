import React, { useState,useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function Post(){
    const [posts, setImages] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setImages(response.data);
            //console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);

    return(
        <div>
        <h1>Kakaka</h1>
           <div>
            <div style={{display: 'flex',justifyContent: 'space-between',alignItems:'centre',fontSize: '14',overflow:'hidden',fontWeight: '550',padding:'8px 16px',borderBottom:'1px solid #e8e7e3'}}>
            {posts.map((post)=>(   
                
                <Swiper key={post._id} navigation={true} modules={[Navigation]} className="mySwiper">
                     <h2>{post.caption}</h2>
                {post.images.map((image, index)=>{
                    const base64Data = btoa(String.fromCharCode(...new Uint8Array(image.data.data)));
                    
                        return <SwiperSlide><img key={index} src={`data:${image.contentType};base64,${base64Data}`} alt='lala'/></SwiperSlide>
                   
                })}
                </Swiper>    
            ))}
            </div>
        </div>
    </div>
    )
}