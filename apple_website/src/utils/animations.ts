import gsap from "gsap"
import { MutableRefObject } from "react"
import * as THREE from 'three'
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target:string, animationProps:Record<string,string|number|Record<string, string|number>> = {}, scrollProps:Record<string, string|number>= {}) => {
    gsap.to(target,{
        ...animationProps,
        scrollTrigger: {
            trigger:target,
            toggleActions: 'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps
        }
    })
}

export const animationWithGsapTimeline = (
    tl:gsap.core.Timeline, 
    sizeRef:MutableRefObject<THREE.Group>, 
    rotation:number,
    target1:string,
    target2:string,
    command: Record<string,string|number|Record<string,string|number>>
) => {
    tl.to(sizeRef.current.rotation, {
        y:rotation,
        duration:1,
        ease: 'power2.inOut'
    })

    tl.to(
        target1, {
            ...command,
            ease: 'power2.inOut'
        },
        '<'
    )

    tl.to(
        target2, {
            ...command,
            ease: 'power2.inOut'
        },
        '<'
    )
}