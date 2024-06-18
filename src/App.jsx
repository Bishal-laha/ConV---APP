import { Toaster } from "react-hot-toast";
import { Image, File, Text } from "./page/Index";
import { AnimatedBox, AnimatedBoxMobile } from './components/Index';
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { IconButton } from "@mui/material";
import { setIsMenu } from "./store/slice/componentSlice";
import "./style.css";

function App() {
  const dispatch = useDispatch();
  const { isFileComp, isImageComp, isTextComp, isMenu } = useSelector((state) => state.component);
  const isMobileScreen = useMediaQuery({ maxWidth: 600 });

  return (
    <div className="bg_grad h-screen w-full">
      <div className="grid grid-cols-3">
        {isMobileScreen ? (<AnimatedBoxMobile />) : (<AnimatedBox />)}
        <div className={`${isMobileScreen ? "col-span-3" : "col-span-2"} w-full h-screen mx-auto relative`}>
          <div className={` bg-[#343434] shadow-2xl absolute top-0  ${isMobileScreen ? "px-[30.75%] py-[5%] left-0" : "clip-text px-[20%] left-[40%] mt-5"} py-2`}>
            <h1 className="font-bold text-6xl bg-gradient-to-r from-[#ffa974] to-[#ff1cb0] bg-clip-text text-transparent text-center">ConV</h1>
          </div>
          {isMobileScreen && <IconButton onClick={() => dispatch(setIsMenu(true))} className="absolute top-2 left-1 duration-300 hover:duration-300 hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </IconButton>}
          {isTextComp && <Text />}
          {isImageComp && <Image />}
          {isFileComp && <File />}
        </div>
      </div>
      <Toaster position="top-center" gutter={8} />
    </div>
  )
}

export default App
