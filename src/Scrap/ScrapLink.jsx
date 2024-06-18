import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {URL} from '../url/url'
function ScrapLink() {
    const [link , setLinks ] = useState('')
    const getLink = async ()=>{
        const response = await axios.get(`${URL}/scrape?url=https://www.designersx.us/`)
        for(let i=0 ; i<= response.data.links.length ; i++){
          // console.log(response.data.links[i])
          setLinks(response.data.links[i])
        }
        console.log("links" , link )
    }
    useEffect(()=>{
      getLink()
    } , [])
  return (
    <></>
  )
}

export default ScrapLink