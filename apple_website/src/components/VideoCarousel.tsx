import { Fragment, ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import { pauseImg, playImg, replayImg} from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

interface videoControls {
    isEnd:boolean,
    startPlay:boolean,
    videoId:number,
    isLastVideo:boolean,
    isPlaying:boolean
}

const VideoCarousel = ():ReactNode => {

    const videoRef = useRef<HTMLVideoElement[]>([]);
    const videoSpanRef = useRef<HTMLSpanElement[]>([]);
    const videoDivRef = useRef<HTMLSpanElement[]>([]);

    const [video,setVideo] = useState<videoControls>({
        isEnd:false,
        startPlay:false,
        videoId:0,
        isLastVideo:false,
        isPlaying:false
    })

    const [loadedData, setLoadedData] = useState<SyntheticEvent<HTMLVideoElement, Event>[]>([]);
    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useGSAP(()=>{

        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })

        gsap.to("#video",{
                scrollTrigger: {
                    trigger: '#video',
                    toggleActions: 'restart none none none',
                },
                onComplete: ()=> {
                    setVideo((pre)=> ({
                        ...pre,
                        startPlay:true,
                        isPlaying:true,

                    }))
                }
            }
        )
    },[isEnd, videoId]);

     // run the following code on start and then afterwards only when videoId, or startPlay changes
     useEffect(()=> {
        // set our current progress to 0
        let currentProgress = 0;
        // get the video we are currently on
        let span = videoSpanRef.current;
  
        if(span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                // call back function that runs when the animation updates
                onUpdate: ()=> {
  
                  const progress = Math.ceil(anim.progress()*100)
  
                  if(progress !== currentProgress){
                      currentProgress = progress
                  }
  
                  gsap.to(videoDivRef.current[videoId],{
                      width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                  })
  
                  gsap.to(span[videoId],{
                      width: `${currentProgress}%`,
                      backgroundColor: 'white'
                  })
  
                },
                // what happens when the animation completes
                onComplete: ()=> {
                  if(isPlaying){
                      gsap.to(videoDivRef.current[videoId], {
                          width: '12px'
                      })
  
                      gsap.to(span[videoId], {
                          backgroundColor: '#afafaf'
                      })
                  }
                }
            })
  
            if(videoId === 0) {
              anim.restart();
            }
  
            const animUpdate = () => {
              anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
  
            if(isPlaying) {
              gsap.ticker.add(animUpdate)
            } else {
              gsap.ticker.remove(animUpdate)
            }
            
        }    
      }, [videoId, startPlay]);

    // Another useeffect that we will trigger at start this will handle the actual video running
    // Now whenever we change our startPlay, videoId, isPlaying, and loading data this use effect will run
    useEffect(()=>{
        if(loadedData.length>3) {
            if(!isPlaying){
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[startPlay, videoId, isPlaying, loadedData]);

    const handleLoadedMetaData = (index:number,e:SyntheticEvent<HTMLVideoElement, Event>) => {
        setLoadedData((pre)=> [...pre,e])
    }

    const handleProcess = (type:string,i:number = 0) => {
        switch(type) {
            case 'video-end':
                setVideo((pre:videoControls) => ({
                    ...pre,
                    isEnd:true, 
                    videoId:i+1
                }))
                break;
            case 'video-last':
                setVideo((pre:videoControls) => ({
                    ...pre,
                    isLastVideo:true,
                }))
                break;
            case 'video-reset' : 
                setVideo((pre:videoControls) => ({
                    ...pre,
                    isLastVideo:false,
                    videoId:0
                }))
                break;
            case 'pause' : 
                setVideo((pre:videoControls) => ({
                    ...pre,
                    isPlaying: !pre.isPlaying
                }))
                break;
            case 'play' : 
                setVideo((pre:videoControls) => ({
                    ...pre,
                    isPlaying: !pre.isPlaying
                }))
                break;
            default:
                return video
        }
    }

  return (
    <Fragment>
        <div className="flex items-center">
            {hightlightsSlides.map((list,index)=>{
                return (
                    <div key={index} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">

                            {/* video */}
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video 
                                    id="video"
                                    ref={(el) => el && (videoRef.current[index] = el)}
                                    onEnded={()=>{
                                        if(index !== 3){
                                            handleProcess('video-end',index)
                                        } else {
                                            handleProcess('video-last')
                                        }
                                    }}
                                    onPlay={()=>{
                                        setVideo((prevVideo:videoControls)=> ({
                                            ...prevVideo, isPlaying:true
                                        }))
                                    }}
                                    playsInline={true} 
                                    preload="auto" 
                                    muted 
                                    className={`${
                                        list.id === 2 ? 'translate-x-44' : ""
                                    } pointer-events-none`}
                                    onLoadedMetadata={(e)=>{
                                        handleLoadedMetaData(index,e)
                                    }}  
                                    >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            {/* Video description */}
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map(text=> <p key={text} className="md:text-2xl text-xl font-medium">{text}</p>)}
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>

        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {videoRef.current.map((_,i)=>
                    <span key={i} ref={el=> videoDivRef.current[i]=el!} className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
                        <span className="absolute h-full w-full rounded-full" ref={el=> videoSpanRef.current[i]=el!} />
                    </span>
                )}
            </div>
            <button className="control-btn">
                <img
                    src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                    alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                    onClick={
                    isLastVideo
                        ? () => handleProcess("video-reset")
                        : !isPlaying
                        ? () => handleProcess("play")
                        : () => handleProcess("pause")
                    }
                />
            </button>
        </div>  
    </Fragment>
  )
}

export default VideoCarousel