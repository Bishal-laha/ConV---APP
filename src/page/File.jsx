import { FileDragDrop, FileConverter, FileCompress } from '../components/Index';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCompressFileDrawerOpen, setIsConvertFileDrawerOpen } from '../store/slice/componentSlice';
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function File() {
    const dispatch = useDispatch();
    const { isFileUrl, fileUrl } = useSelector((state) => state.file);
    const { isCompressFileDrawerOpen, isConvertFileDrawerOpen } = useSelector((state) => state.component);
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    return (
        <motion.div
            className={`bg-[#deecf9] rounded-full shadow-2xl  ${isMobileScreen ? "px-1 w-[95%]" : "w-[90%] min-h-[70%]"} mx-auto mt-[15%]`}
            animate={{ scale: [0, 1], borderRadius: ["10%", "0%"] }}
            transition={{ duration: 1, ease: "easeInOut", times: [0, 1] }}
        >
            <div className={`flex justify-center flex-col  ${isMobileScreen ? "w-full mt-[5%]" : "max-w-[70vw] mt-[10%]"} mx-auto`}>
                <div><FileDragDrop /></div>
                <div className={`flex gap-2 text-white font-semibold ${isMobileScreen ? "px-1 mb-5 text-[0.9rem] mx-auto" : "px-5"}`}>
                    <div>
                        <button onClick={() => dispatch(setIsConvertFileDrawerOpen(true))} className='p-3 rounded-lg bg_btn duration-300  hover:duration-300 cursor-pointer' disabled={!isFileUrl || fileUrl.length > 1 ? true : false}>CONVERT FILE</button>
                        {isConvertFileDrawerOpen && <FileConverter />}
                    </div>
                    <div>
                        <button onClick={() => dispatch(setIsCompressFileDrawerOpen(true))} className='p-3 rounded-lg bg_btn duration-300  hover:duration-300 cursor-pointer' disabled={!isFileUrl || fileUrl.length > 1 ? true : false}>COMPRESS PDF</button>
                        {isCompressFileDrawerOpen && <FileCompress />}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default File