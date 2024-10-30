import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)
import { ReactNode } from "react"
import { rightImg, watchImg } from "../utils"
import VideoCarousel from "./VideoCarousel"

const Highlight = ():ReactNode => {

  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">

        <HighlightsHeader />

        {/* video carosouel */}

        <VideoCarousel />

      </div>
    </section>
  )
}

const HighlightsHeader = ():ReactNode => {

  useGSAP(()=>{
    gsap.to("#title", {
      opacity:1,
      y:0,
      duration:1,
      scrollTrigger: {
        trigger: "#title"
      }
    })
  },[])

  return (
    <div className="mb-12 w-full md:flex items-end justify-between">
      <h1 id="title" className="section-heading">Get the highlights</h1>
      <div className="flex flex-wrap items-end gap-5">
        <HighlightLink text={"Watch the film"} id = "film" delay={0} altDesc={"Watch Image"} imgSrc={watchImg} />
        <HighlightLink text={"Watch the event"} id ="event" delay={0.25} altDesc={"Right Image"} imgSrc={rightImg} />
      </div>
    </div>
  )
}

const HighlightLink = ({text,id,delay,altDesc,imgSrc}:{text:string,id:string,delay:number,altDesc:string,imgSrc:string}):ReactNode => {

  useGSAP(()=>{
    gsap.to(`#${id}`,{
      opacity:1,
      y:0,
      duration:1,
      delay:delay,
      scrollTrigger: {
        trigger: `#${id}`,
        toggleActions: "play none none none",  
      }
    })
  },[])

  return (
    <p id={id} className='link'>{text}<img src={imgSrc} alt={altDesc} className="ml-2"/></p>
  )
}

export default Highlight