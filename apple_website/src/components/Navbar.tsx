import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"
import { ReactNode } from "react"

const Navbar = ():ReactNode => {
  return(
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <NavImages image={appleImg} altDesc="Apple Logo" width={14} height={18} />
        <div className="flex flex-1 items-center justify-center max-sm:hidden">
          {
            navLists.map((x)=> <NavLinks key={x} link={x} />)
          }
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <NavImages image={searchImg} altDesc="Search Image" width={18} height={18}/>
          <NavImages image={bagImg} altDesc="Bag Image" width={18} height={18} />
        </div>
      </nav>
    </header>
  )
}

const NavImages = ({image, altDesc, width, height}: {image:string,altDesc:string, width:number, height:number}):ReactNode=> {
  return (
    <img className="
    hover:cursor-pointer
    " src={image} alt={altDesc} width={width} height={height} />
  )
}

const NavLinks = ({link}:{link:string}):ReactNode => {
  return (
    <div className="
    px-5
    text-sm
    cursor-pointer
    text-gray
    hover:text-white
    transition-all
    ">
      {link}
    </div>
  )
}

export default Navbar