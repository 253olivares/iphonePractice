import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ModelView from "./ModelView";
import { useRef, useState } from "react";
import { yellowImg } from "../utils";
gsap.registerPlugin(ScrollTrigger);

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

import { OrbitControls } from 'three-stdlib'


export interface modelState {
    title:string,
    color: string[],
    img:string
}

const Model = () => {

    const [size, setSize] = useState<string>('small');

    const [model, setModel] = useState<modelState>({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81','#FFE7B9','#6F6C64'],
        img:yellowImg
    })

    // camera controls for the model view

    const cameraControlSmall = useRef<OrbitControls>(null);
    const cameraControlLarge = useRef<OrbitControls>(null);

    // model
    const small = useRef<THREE.Group>(new THREE.Group());
    const large = useRef<THREE.Group>(new THREE.Group());

    // rotation
    const [smallRotation, setSmallRotation] = useState<number>(0);
    const [largeRotation, setLargeRotation] = useState<number>(0);

    useGSAP(()=> {
        gsap.to('#heading',{
            y:0,
            opacity:1,
            duration:1,
            scrollTrigger: {
                trigger: '#heading',
                // start is 'position of trigger  position of viewport'
                start: 'top 85%'
            },
            ease: 'power1.inOut'
        })  
    },[]);

  return (
    <section className="common-padding">
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">
                Take a closer look
            </h1>

            {/* 3d look */}
            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView 
                        index ={1}
                        groupRef={small}
                        gsapType="view1"
                        controlRef = {cameraControlSmall}
                        setRotationState={setSmallRotation}
                        item = {model}
                        size = {size}
                    />

                    <ModelView 
                        index ={2}
                        groupRef={large}
                        gsapType="view2"
                        controlRef = {cameraControlLarge}
                        setRotationState={setLargeRotation}
                        item = {model}
                        size = {size}
                    />
                    {/* Canvas that will control the viewport to see our 3d modelss */}
                    <Canvas
                        className="w-full h-full"
                        style={{
                            position:'fixed',
                            top:0,
                            bottom:0,
                            left:0,
                            right:0,
                            overflow: 'hidden'
                        }}
                        // this tells our fiber what element will control the scrolling and movement of our model
                        eventSource={document.getElementById('root')!}
                    >
                        {/* View Port */}
                        <View.Port />
                    </Canvas>
                </div>
                <div className="mx-auto w-full">
                        <p className="text-sm font-light text-center mb-5">{model.title}</p>
                        <div className="flex-center">
                            {/* Buttons to control the colors */}
                            <ul className="color-container">
                                {
                                    models.map((mod,index)=> <li key={index} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{
                                        backgroundColor: mod.color[0]
                                    }} onClick={()=> setModel(mod)} />)
                                }
                            </ul>
                            {/* Buttons to control diff sizes */}
                            <button className="size-btn-container">
                                {sizes.map(({label, value})=> (
                                    <span key={label} className="size-btn"
                                    style={{
                                        backgroundColor: size === value ? 'white': 'transparent',
                                        color: size === value ? 'black': 'white'
                                    }}
                                    onClick={()=>setSize(value)}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model