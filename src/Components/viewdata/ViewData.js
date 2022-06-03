import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Bottom from '../bottom/Bottom'
import { useParams } from 'react-router-dom'
import Loading from '../loader/Loading';

const ViewData = () => {
    const {id} =useParams();
    const[dataa,setDataa] =useState({ img:"",det:"",date:"",description:"",category:""})
    useEffect(() => {
        axios.get(`https://manikumar-react-blog-server.herokuapp.com/api/blog/?id=${id}`).then((res) => {
            res.data.forEach((view)=>{
            if(view.id === id){
                console.log("Matched Param");
                setDataa({
                    img:view.img,
                    det:view.det,
                    date:view.date,
                    description:view.description,
                    category:view.category,
                });
            }
        })});
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          })
    },[id]);

    return (
        <div>
            {dataa.img!=="" ? 
            <div className='viewdata'>
            <h1 className='vih1'>{dataa.category}</h1><hr className='thhr'/>
            <div className='clap'><div className='clap1'>👏</div><h1>500</h1></div>
            <div className='viewD'>
            <div>
                <div className='vimg'><img src={dataa.img} alt="" /></div>
                <div className='vh3'><h3>{dataa.det}</h3></div>
                <div className='vh5'><h5>{dataa.date}</h5></div>
                <div className='vp'><p>{dataa.description.slice(0,1000)}</p></div>
                <div className='vpm'><p>{dataa.description.slice(0,250)}</p></div>
            </div>
            </div>
            <div className='viewbottom'><Bottom/></div>
            </div>:<Loading/>}
        </div>
    )
}
export default ViewData;
