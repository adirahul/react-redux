import React, { useEffect, useState } from 'react'

const ShortenPara = ({para, wordLimit}) => {    
    
    const handleToggle = () => {
        console.log('inside handleToggle')

    }
  return (
    <>
        <p className="mt-1 text-sm text-gray-400">{(para.split(" ").length <= wordLimit) ? para : para.slice(0, 200)} {" "} 
        {
            para.split(" ").length > wordLimit ? <span className='text-white' onClick={handleToggle}>...read more</span> : ""
        }
        
        </p>
    </>
  )
}

export default ShortenPara