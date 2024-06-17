import imglyRemoveBackground from "@imgly/background-removal";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { useState } from "react";
import { clearImageMetaData, clearImageUrl, setIsImageUrl } from "../store/slice/imageSlice";
import { setIsRemoveBgDrawerOpen } from "../store/slice/componentSlice";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";

function ImageRemoveBg() {
    const dispatch = useDispatch();
    const { imageUrl, imageMetaData } = useSelector((state) => state.img);
    const { isRemoveBgDrawerOpen } = useSelector((state) => state.component);
    const [isRemovedBg, setIsRemovedBg] = useState(false);
    const [removedBgURL, setRemovedBgURL] = useState(null);

    const handleRemoveBg = async () => {
        try {
            if (imageUrl) {
                const toastId = toast.loading("Remove Background Is Processing....");
                const res = await imglyRemoveBackground(imageUrl);
                if (res)
                    toast.success("Remove Background Done", { id: toastId });
                const url = URL.createObjectURL(res);
                setIsRemovedBg(true);
                setRemovedBgURL(url);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = removedBgURL;
        link.download = `removedBG_${imageMetaData.imgName}.png`;
        document.body.appendChild(link);
        link.click();
        toast.success("Removed Background Image Downloaded Successfully....");
        document.body.removeChild(link);
        URL.revokeObjectURL(removedBgURL);
        setIsRemovedBg(false);
        setRemovedBgURL(null);
        dispatch(setIsImageUrl(false));
        dispatch(clearImageMetaData());
        dispatch(clearImageUrl());
        dispatch(setIsRemoveBgDrawerOpen(false));
    }

    return (
        <Dialog open={isRemoveBgDrawerOpen}>
            <DialogTitle sx={{ textAlign: "center" }}>{"Remove background of Image"}</DialogTitle>
            <IconButton sx={{ position: "absolute", top: "40px", right: "10px" }} onClick={() => dispatch(setIsRemoveBgDrawerOpen(false))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
            </IconButton>
            <DialogContent>
                <DialogContentText>
                    <p className="text-gray-500 mt-5 text-center font-light text-[0.9rem]">Do You Want to Remove Background of Image?</p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleRemoveBg} className='p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer mx-auto mb-5 font-semibold text-white'>REMOVE BACKGROUND</button>
                {isRemovedBg && <button onClick={handleDownload} className='p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer mx-auto mb-5 font-semibold text-white'>Download Removed Bg Image</button>}
            </DialogActions>
        </Dialog>
    )
}

export default ImageRemoveBg;