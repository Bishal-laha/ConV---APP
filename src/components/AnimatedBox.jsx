import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileComp, setIsImageComp, setIsTextComp } from "../store/slice/componentSlice";
import "../style.css";

const AnimatedBox = () => {
    const dispatch = useDispatch();
    const { isFileComp, isImageComp } = useSelector((state) => state.component);
    const [animationComplete, setAnimationComplete] = useState(false);

    return (
        <motion.div className="bg-blue-400 w-full"
            animate={{ scale: [1, 2, 2, 1, 1], rotate: [0, 0, 180, 180, 0], borderRadius: ["0%", "0%", "50%", "50%", "0%"] }}
            transition={{
                duration: 2, ease: "easeInOut", times: [0, 0.2, 0.5, 0.8, 1],
                onComplete: () => setAnimationComplete(true),
            }}
        >
            <div className={`${animationComplete ? "opacity-100" : "opacity-0"}`}>
                <h1 className="font-bold text-6xl mt-5 bg-gradient-to-r from-[#ffa974] to-[#ff1cb0] bg-clip-text text-transparent text-center">Welcome To</h1>
                <div className="w-[90%] mt-[24%] mx-auto cursor-pointer">
                    <div className="flex justify-center items-center gap-[3rem] bg-white rounded-xl py-2 shadow-2xl hover:scale-105 hover:duration-300 duration-300 " onClick={() => {
                        if (isFileComp) {
                            dispatch(setIsFileComp(false));
                            dispatch(setIsTextComp(true));
                        } else {
                            dispatch(setIsFileComp(true));
                            dispatch(setIsImageComp(false));
                            dispatch(setIsTextComp(false));
                        }
                    }}>
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-[1.1rem]">Click here for File Related Tasks</h3>
                            <span className="font-light">File Compress, File Convert...</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </div>
                    <div className="flex justify-center items-center gap-[3rem] bg-white mt-[10%] rounded-xl py-2 px-4 shadow-2xl hover:scale-105 hover:duration-300 duration-300 " onClick={() => {
                        if (isImageComp) {
                            dispatch(setIsImageComp(false));
                            dispatch(setIsTextComp(true));
                        } else {
                            dispatch(setIsImageComp(true));
                            dispatch(setIsFileComp(false));
                            dispatch(setIsTextComp(false));
                        }
                    }}>
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-[1.1rem]">Click here for Image Related Tasks</h3>
                            <span className="font-light">Image Compress, Image Crop...</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </div>
                    <div className="cursor-text bg-white mt-[20%] rounded-lg p-2 shadow-2xl text-center">
                        Made with Love by <span className="font-semibold">BISHAL LAHA</span> ❤️❤️❤️❤️
                    </div>
                </div>
            </div>
        </motion.div >
    );
};

export default AnimatedBox;
