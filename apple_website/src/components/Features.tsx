import { useGSAP } from "@gsap/react"
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { useRef } from "react";
import gsap from "gsap";


const Features = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(()=> {
        gsap.to('#exploreVideo',{
            scrollTrigger: {
                trigger:'#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: '-10% bottom',
            }, onComplete: ()=> {
                videoRef.current && videoRef.current.play();
            }
        },)
        animateWithGsap('#features_title', 
            {y:0, opacity:1}, {
                trigger: '#features_title',
                toggleActions: 'restart none none reverse',
                start: "top 80%"
            });
        animateWithGsap('.g_grow', {
            scale:1, 
            opacity:1,
            ease: 'power1'
        }, {
            scrub: 5.5
        });
        animateWithGsap(".g_text", {
            y:0,
            opacity: 1,
            ease: 'power2.inOut',
            duration:1,
            stagger: 0.25
        })
    }, []);

  return (

    <section className="h-full common-padding bg-zinc relative overflow-hidden">
        <div className="screen-max-width">
            {/* Head for features */}
            <div className="w-full mb-12">
                <h1 id="features_title" className="section-heading">Explore the full story.</h1>
            </div>

            {/* Grid of iphone videos */}
            <div className="flex flex-co justify-center items-center overflow-hidden">
                <div className="mt-32 mb-24 pl-24">
                    <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
                    <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium</h2>
                </div>

                {/* This is our video */}
                <div className="flex-center flex-col sm:px-10">
                    <div className="relative h-[50vh] w-full flex items-center">
                        <video playsInline id="exploreVideo" 
                        className="
                        w-full 
                        h-full 
                        object-cover 
                        object-venter" 
                        preload="none" 
                        muted 
                        autoPlay 
                        ref={videoRef}>
                            <source src={exploreVideo} type="video/mp4" />
                        </video>
                    </div>
                    <div className="flex flex-col w-full relative">
                        <div className="feature-video-container">

                            <div className=" overflow-hidden flex-1 h-[50vh]">
                                <img className="feature-video g_grow" src={explore1Img} alt="titanium" />
                            </div>

                            <div className=" overflow-hidden flex-1 h-[50vh]">
                                <img className="feature-video g_grow" src={explore2Img} alt="titanium2" />
                            </div>

                        </div>

                        <div className="feature-text-container">
                            <div className=" flex-1 flex-center">
                                <p className="feature-text g_text">
                                    iPhone 15 Pro is {` `}
                                    <span className="text-white">
                                        the first iPhone to feature a aerospace-grade titanium design
                                    </span>
                                    using the same alloy that spacecrafts use for missions to mars.
                                </p>
                            </div>
                            <div className=" flex-1 flex-center">
                                <p className="feature-text g_text">
                                    Titanium has one of the best strength to weight ratios of any meta, making these our {` `}
                                    <span className="text-white">
                                        lightest Pro models ever,
                                    </span>
                                    You'll notice the difference the moment you pick one up.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}

export default Features