import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { getCroppedImg, getCroppedImgRotate } from '../utils/Features';
import { clearImageMetaData, clearImageUrl, setIsImageUrl } from '../store/slice/imageSlice';
import toast from 'react-hot-toast';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { setIsCropDrawerOpen } from '../store/slice/componentSlice';
import { useMediaQuery } from "react-responsive";

function ImageCrop() {
    const dispatch = useDispatch();
    const { imageUrl, imageMetaData } = useSelector((state) => state.img);
    const { isCropDrawerOpen } = useSelector((state) => state.component);
    const [userHeight, setUserHeight] = useState(0);
    const [userWidth, setUserWidth] = useState(0);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [cropSize, setCropSize] = useState({ height: 100, width: 100 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState([]);
    const [croppedImage, setCroppedImage] = useState(null);
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0);
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const handleDone = async () => {
        try {
            const toastId = toast.loading("Image Cropping Is Processing....");
            let croppedImage;
            if (rotation != 0)
                croppedImage = await getCroppedImgRotate(imageUrl, croppedAreaPixels, rotation);
            else
                croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
            setCroppedImage(croppedImage);
            toast.success("Cropping Done..", { id: toastId });
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleDownload = () => {
        const base64String = croppedImage;
        const link = document.createElement('a');
        link.href = base64String;
        link.download = `cropped_${imageMetaData.imgName}`;
        document.body.appendChild(link);
        link.click();
        toast.success("Crop Image Downloaded Successfully..");
        document.body.removeChild(link);
        dispatch(clearImageMetaData());
        dispatch(clearImageUrl());
        dispatch(setIsImageUrl(false));
        dispatch(setIsCropDrawerOpen(false));
    }

    const handleUserCropSize = () => {
        setCropSize({ height: parseInt(userHeight), width: parseInt(userWidth) });
        toast.success("Crop Size Is Set..");
        setUserHeight(0);
        setUserWidth(0);
    }

    return (
        <Dialog open={isCropDrawerOpen} maxWidth="xl" fullScreen={isMobileScreen ? true : false}>
            <DialogTitle sx={{ textAlign: "center" }}>{"Compress Image"}</DialogTitle>
            <IconButton sx={{ position: "absolute", top: "12px", right: "10px" }} onClick={() => dispatch(setIsCropDrawerOpen(false))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
            </IconButton>
            <div className={`flex justify-between gap-5 ${isMobileScreen ? "flex-col" : "flex-row"}`}>
                <DialogContent>
                    <div className={`crop-container relative ${isMobileScreen ? "w-[200px] h-[200px] mx-auto" : "w-[300px] h-[300px]"}`}>
                        <Cropper
                            image={imageUrl}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            cropSize={cropSize}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onRotationChange={setRotation}
                            onZoomChange={setZoom}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className='flex flex-col gap-3'>
                        <div className="controls flex gap-5">
                            <DialogContentText>Zoom: </DialogContentText>
                            <input type="range" value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom"
                                onChange={(e) => setZoom(e.target.value)} className="zoom-range"
                            />
                        </div>
                        <div className="controls flex gap-3">
                            <DialogContentText>Rotate: </DialogContentText>
                            <input type='range' value={rotation} min={0} max={360} step={1}
                                aria-labelledby="Rotation" onChange={(e) => setRotation(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center mb-3'>
                            <DialogContentText>Enter Height:</DialogContentText>
                            <input type="text" value={userHeight} className='p-2 w-[20%] rounded-lg border border-1 border-black outline-none ml-2 mr-5' onChange={(e) => setUserHeight(e.target.value)} />
                            <DialogContentText >Enter Width:</DialogContentText>
                            <input type="text" value={userWidth} className='p-2 w-[20%] rounded-lg border border-1 border-black outline-none ml-2' onChange={(e) => setUserWidth(e.target.value)} />
                        </div>
                        <div className={`flex gap-5 items-center ${isMobileScreen ? "text-[0.8rem]" : "text-[1rem]"}`}>
                            <button onClick={handleUserCropSize} className='p-3 w-[20%] rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer font-semibold text-white'>SET </button>
                            <button onClick={handleDone} className='p-3 rounded-lg w-[20%] bg_btn duration-300 hover:duration-300 cursor-pointer font-semibold text-white'>DONE</button>
                            <DialogContentText>*Click <span className='text-blue-500'>Set</span> Then <span className='text-blue-500'>DONE</span></DialogContentText>
                        </div>
                        <div>
                            <button onClick={handleDownload} className={`p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer font-semibold text-white ${isMobileScreen ? "w-full" : "w-[50%]"}`}>DOWNLOAD CROPPED IMAGE</button>
                        </div>
                    </div>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default ImageCrop