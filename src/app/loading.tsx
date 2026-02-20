import Image from "next/image";

export default function Loading() {

  return (
    <div className="min-h-screen center w-full flex flex-col items-center justify-center bg-white relative overflow-hidden">

      {/* Background soft glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full " style={
          {
            width:400, height:400, background:"radial-gradient(circle, #bbf7d0, transparent 70% )",
            top:"-120px", left:"-120px", opacity:0.5, animation:"blobFloat 6s ease-in-out infinite",
          }
        }/>

        <div className="absolute rounded-full" style={{width:300, height:300, background:"radial-gradient(circle, #86efac, transparent 70%", bottom:"-80px", right:"-80px", opacity:0.4, animation:"blobFloat 7s ease-in-out 1.5s infinite reverse"}}/>

        
      </div>

      {/* Card container */}

      <div className="relative z-10 flex flex-col items-center gap-8" style={{ animation:"fadeUp 0.6 ease-out both"}}>

        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center" style={{animation:"logoPluse 3s ease-in-out infinite"}}>

            <div className="absolute rounded-full" style={{ width:88, height:88,  animation:"ringPluse 2s ease-in-out infinite",}}/>
          {/* Dashed border */}

          <div className="absolute rounded-full" style={{ width:80, height:80, border:"2.5px dashed #86efac", animation:"pin 8s linear infinite", }}>

            <Image src="/logo.png" alt="EShop logo" width={100} height={100} style={{ objectFit:"contain", borderRadius:"50%", position:"relative", zIndex:1,}}/>

          </div>
         {/* Text */}

         <div className="flex flex-col items-center leading-none gap-0.5 mt-32">
          <h2 className="md:text-3xl text-[20px] font-bold text-green-800">
                 E<span className="md:text-2xl text-[16px] text-green-500">Shop</span> 
                 </h2>

                     <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 800,
                color: "#16a34a",
                letterSpacing: "4px",
                textTransform: "uppercase" as const,
                opacity: 0.6,
              }}
            >
              Loading...
            </span>

         </div>


          </div>

        </div>

        {/* spinner */}

        <div className="relative flex items-center justify-center" style={{width:56, height:56}}>
          <div className="absolute rounded-full" style={{width:56, height:56, border:"4px solid #dcfce7", borderTopColor:"#22c55e", MozBorderRightColors:"#16a34a", animation:"spin 0.9s linear infinite"}}/>

        <div className="absolute rounded-full" style={{width:38, height:38, border:"3px solid transparent", borderTopColor:"#4ade80", borderBottomColor:"#15803d", animation:"spinReverse 0.7s linear infinite"}}/>

       <div className="rounded-full " style={{ width:12 , height:12, background:"radial-gradient(circle, #4ade80, #16a34a", animation:"centerPluse 1.2s ease-in-out infinite", boxShadow:"0 0 10px rgba(34, 197, 94, 0.7", }}/>

        </div>

        <div className="flex items-center gap-2">
          {[0,1,2,3,4].map ((i) => (
            <div key={i} className="rounded-full" style={{ width: i===2 ? 10 : i===1 || i === 3 ? 7:5,  height:i===2 ? 10 : i===1 || i === 3 ? 7:5, background:"#22c55e", opacity:0.3, animation:`dotWave 1.2s ease-in-out ${i * 0.12}s infinite`,}}/>

        
          ))}

        </div>

      </div>
     
    </div>
  );
}
