import React from 'react'

interface TopSectionProps {
  title: string
  image?: string
}

const TopSection = ({ title, image }: TopSectionProps) => {




  return (
    <div className={`relative min-h-[400px] bg-[url('${image || '/assets/locationbg.png'}')] bg-cover bg-center bg-no-repeat text-white flex items-center justify-center`}>
      
      <div className="absolute inset-0 bg-[#1D1818]/90 backdrop-brightness-90 z-0"></div>   
       
      <div className="relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl  uppercase font-light tracking-wide">
         {title}
        </h2>
      </div>

    </div>
  )
}

export default TopSection