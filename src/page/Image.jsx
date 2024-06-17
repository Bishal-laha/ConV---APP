import { ImageDragDrop, ImageCrop, ImageCompress, ImageRemoveBg } from '../components/Index';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCompressDrawerOpen, setIsCropDrawerOpen, setIsRemoveBgDrawerOpen } from '../store/slice/componentSlice';
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function Image() {
    const dispatch = useDispatch();
    const { isCompressDrawerOpen, isCropDrawerOpen, isRemoveBgDrawerOpen } = useSelector((state) => state.component);
    const { isImageUrl } = useSelector((state) => state.img);
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    return (
        <motion.div
            className={`bg-[#deecf9] rounded-full shadow-2xl ${isMobileScreen ? " px-1 w-[95%]" : "w-[90%] min-h-[70%]"} mx-auto mt-[15%]`}
            animate={{ scale: [0, 1], borderRadius: ["10%", "0%"] }}
            transition={{ duration: 1, ease: "easeInOut", times: [0, 1] }}
        >
            <div className={`flex justify-center flex-col mx-auto ${isMobileScreen ? "w-full mt-[5%]" : "max-w-[70vw] mt-[10%]"}`}>
                <div ><ImageDragDrop /></div>
                <div className={`flex gap-2 px-5 text-white font-semibold' ${isMobileScreen ? "mb-5 text-[0.5rem] mx-auto" : "px-5"}`}>
                    <div>
                        <button onClick={() => {
                            dispatch(setIsCropDrawerOpen(true));
                        }} className='p-3 rounded-lg bg_btn duration-300  hover:duration-300 cursor-pointer' disabled={!isImageUrl}>CROP IMAGE</button>
                        {isCropDrawerOpen && <ImageCrop />}
                    </div>
                    <div>
                        <button onClick={() => {
                            dispatch(setIsCompressDrawerOpen(true));
                        }} className='p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer' disabled={!isImageUrl}>COMPRESS IMAGE</button>
                        {isCompressDrawerOpen && <ImageCompress />}
                    </div>
                    <div>
                        <button onClick={() => {
                            dispatch(setIsRemoveBgDrawerOpen(true));
                        }} className='p-3 rounded-lg bg_btn duration-300  hover:duration-300 cursor-pointer' disabled={!isImageUrl}>REMOVE BACKGROUND IMAGE</button>
                        {isRemoveBgDrawerOpen && <ImageRemoveBg />}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Image;