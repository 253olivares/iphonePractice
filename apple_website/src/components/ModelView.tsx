import { Dispatch, MutableRefObject, ReactNode, RefObject, SetStateAction, Suspense } from "react"
import * as THREE from 'three';
import { modelState } from "./Model";
import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import IPhone from './IPhone';
import Lights from "./Lights";
import { OrbitControls as OrbitType } from 'three-stdlib'

const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    item,
    size
} : {
    index: number,
    groupRef: MutableRefObject<THREE.Group>,
    gsapType: string,
    controlRef: RefObject<OrbitType>,
    setRotationState: Dispatch<SetStateAction<number>>,
    item:modelState,
    size:string
}):ReactNode => {
  return (
    <View
        index={index}
        id={gsapType}
        className={`border-2 border-red-500 w-full h-full
            ${index === 2 ? 'right-[-100%]':'' } 
            `}
        
    >
        {/* Creates a light for our object */}
        {/* Ambient Light */}
        <ambientLight intensity={0.3} />

{/* Creates our camera for our view */}
{/* Position marks the x,y,z coordinates of our camera  */}
        <PerspectiveCamera makeDefault position={[0,0,4]} />

        <Lights />

        <OrbitControls
            makeDefault
            ref={controlRef}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            target={new THREE.Vector3(0,0,0)}
            onEnd={()=> setRotationState(controlRef.current?.getAzimuthalAngle()!)}
        />

        <group ref={groupRef} name={`${index === 1 ? 'small': 'large'}`} >
            {/* Fallback option for our view port that will 
            place whatever is in our fallback while our assets 
            and lights load */}
            <Suspense fallback={<Html><div>Loading...</div></Html>}> 
                <IPhone 
                    scale= {index===1 ? [15,15,15] : [17,17,17]}
                    item={item}
                    size={size}
                />
            </Suspense>
        </group>
    </View>
  )
}

export default ModelView