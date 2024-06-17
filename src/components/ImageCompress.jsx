import { useState } from 'react';
import { compressAccurately } from "image-conversion";
import { useDispatch, useSelector } from 'react-redux';
import { convertBlob, getCompressionAccuracy } from '../utils/Features';
import toast from 'react-hot-toast';
import { clearImageMetaData, clearImageUrl, setIsImageUrl } from '../store/slice/imageSlice';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { setIsCompressDrawerOpen } from '../store/slice/componentSlice';
import { useMediaQuery } from "react-responsive";

function ImageCompress() {
    const dispatch = useDispatch();
    const { imageUrl, imageMetaData } = useSelector((state) => state.img);
    const { isCompressDrawerOpen } = useSelector((state) => state.component);
    const [userSize, setUserSize] = useState(0);
    const [isCompressed, setIsCompressed] = useState(false);
    const [compressedURL, setCompressedURL] = useState(null);
    const [compressedMetaData, setCompressedMetaData] = useState({ compressedSize: "", accuracy: "" });
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    const handleCompress = async () => {
        try {
            if (imageUrl) {
                if (userSize == 0) toast.error("Invalid Compress Size....Please Provide Compress Size");
                if (userSize != 0) {
                    const toastId = toast.loading("Image Compression Is Processing....");
                    const blobUrl = convertBlob(imageUrl);
                    let res;
                    if (userSize >= 10)
                        res = await compressAccurately(blobUrl, { size: (userSize - 10), accuracy: 0.99 });
                    else
                        res = await compressAccurately(blobUrl, { size: userSize, accuracy: 0.99 });
                    toast.success("Image Compression Is Done....", { id: toastId });
                    const accuracy = getCompressionAccuracy(blobUrl.size, res.size, userSize);
                    setCompressedMetaData({ compressedSize: (res.size / 1024).toFixed(2), accuracy });
                    const url = URL.createObjectURL(res);
                    setIsCompressed(true);
                    setCompressedURL(url);
                }
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = compressedURL;
        link.download = `compressed_${imageMetaData.imgName}.png`;
        document.body.appendChild(link);
        link.click();
        toast.success("Compressed Image Downloaded Successfully....");
        // Remove the link from the document body
        document.body.removeChild(link);
        // Revoke the URL to release the Blob object from memory
        URL.revokeObjectURL(compressedURL);
        setCompressedMetaData({ compressedSize: "", accuracy: "" });
        setCompressedURL(null);
        setIsCompressed(false);
        setUserSize(0);
        dispatch(setIsImageUrl(false));
        dispatch(clearImageMetaData());
        dispatch(clearImageUrl());
        dispatch(setIsCompressDrawerOpen(false));
    }

    return (
        <Dialog open={isCompressDrawerOpen}>
            <DialogTitle sx={{ textAlign: "center" }}>{"Compress Image"}</DialogTitle>
            <IconButton sx={{ position: "absolute", top: "12px", right: "10px" }} onClick={() => dispatch(setIsCompressDrawerOpen(false))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
            </IconButton>
            <DialogContent>
                <div className={`gap-3 justify-center items-center ${isMobileScreen ? "flex flex-col" : "flex"}`}>
                    <DialogContentText>Enter Size: </DialogContentText>
                    <input value={userSize} placeholder='0 KB' onChange={(e) => setUserSize(e.target.value)} className='p-2 rounded-lg outline-none border border-1 border-black text-black' />
                    <button onClick={handleCompress} className='p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer text-white font-semibold'>COMPRESS</button>
                </div>
                <DialogContentText>
                    {isCompressed && <p className='text-gray-500 mt-5 text-center font-light text-[0.9rem]'>Compressed Image Size: {compressedMetaData.compressedSize}Kb & Accuracy: {compressedMetaData.accuracy}%</p>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isCompressed && <button onClick={handleDownload} className='p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer mx-auto mb-5 font-semibold text-white'>Download Cropped Image</button>}
            </DialogActions>
        </Dialog>
    )
}

export default ImageCompress;