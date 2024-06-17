import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearImageMetaData, clearImageUrl, setImageMetaData, setImageUrl, setIsImageUrl } from '../store/slice/imageSlice';
import { IconButton } from '@mui/material';
import { setIsImageComp, setIsTextComp } from '../store/slice/componentSlice';
import { useMediaQuery } from "react-responsive";
import "../style.css";

function ImageDragDrop() {
    const dispatch = useDispatch();
    const { isImageUrl, imageUrl } = useSelector((state) => state.img);
    const [isFocused, setIsFocused] = useState(false);
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1, accept: 'image/*', onDragEnter: () => setIsFocused(true), onDragLeave: () => setIsFocused(false)
    });

    const onDone = useCallback(() => {
        setIsFocused(false);
        if (acceptedFiles.length > 0) {
            setIsFocused(true);
            toast.success("File is accepted");
            const fileReader = new FileReader();
            fileReader.onload = () => {
                dispatch(setImageMetaData({ imgName: acceptedFiles[0].name }));
                dispatch(setImageUrl(fileReader.result));
                dispatch(setIsImageUrl(true));
            }
            fileReader.readAsDataURL(acceptedFiles[0]);
        } else {
            if (fileRejections?.length === 0)
                toast.error("No Image is Selected");
            else
                toast.error(fileRejections[0]?.errors[0]?.message);
        }
    }, [acceptedFiles, fileRejections, dispatch]);

    const onReset = () => {
        dispatch(clearImageUrl());
        dispatch(clearImageMetaData());
        dispatch(setIsImageUrl(false));
        toast.success("Reset Done");
    }

    const acceptedFileItems = acceptedFiles.map((file) => (
        isImageUrl && (<li key={file.path} >
            {file.path} - {(file.size / 1000000).toFixed(2)} Mb
        </li >)
    ));

    return (
        <section className={`${isMobileScreen ? "py-2 px-1" : "p-5"}`}>
            <div className={`flex-1 flex-col align-middle p-[20px] border-2 rounded-lg bg-[#fafafa] text-[#bdbdbd] outline-none border-dashed transition-all ease-in-out duration-[240] border-[${isFocused ? "#2196f3" : "#eeeeee"}]`}>
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} onClick={() => setIsFocused(true)} />
                    {isDragActive ? (<p>Drop the files here ...</p>) :
                        (<p>Drag 'n' drop image file here, or click to select file</p>)}
                </div>
            </div>
            <div className={`flex gap-5 items-center ${isMobileScreen ? "flex-col" : "flex-row"}`}>
                <div className={`flex gap-5`}>
                    <button onClick={onDone} className='p-3 mt-5 rounded-lg bg_btn text-white font-semibold duration-300 hover:duration-300 cursor-pointer'>CLICK TO PROCEED</button>
                    <button onClick={onReset} className='p-3 mt-5 rounded-lg bg_btn text-white font-semibold duration-300  hover:duration-300 cursor-pointer' disabled={!isImageUrl}>RESET</button>
                </div>
                <p className={`text-gray-600 font-medium ${isMobileScreen ? "text-[0.7rem]" : "text-[0.9rem]"}`}>*Click <span className='text-blue-500'>CLICK TO PROCEED</span> After Selecting Image</p>
                <IconButton onClick={() => {
                    dispatch(setIsImageComp(false));
                    dispatch(setIsTextComp(true));
                }} className={`${isMobileScreen ? "absolute top-0 left-[40%]" : "relative"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                </IconButton>
            </div>

            <div className={`flex flex-row gap-5 mb-5 ${isMobileScreen ? "mt-1" : "mt-5"}`}>
                <div className=''>
                    {isImageUrl ? (<div className='w-[100px] rounded-lg min-h-[100px] bg-slate-500 text-white text-center'><img src={imageUrl} width={100} height={100} /></div>) : (<div className='w-[100px] p-2 font-light text-[0.9rem] rounded-lg min-h-[100px] bg-slate-500 text-white text-center'><h5>No Image to Preview</h5></div>)}
                </div>
                <aside>
                    <h4 className='font-bold text-blue-600'>Accepted File:</h4>
                    <div className={`${isMobileScreen ? "text-[0.7rem]" : "text-[0.9rem]"}`}>
                        {acceptedFileItems.length === 0 ? (<p className='text-gray-600 font-medium'>No Image Is Selected</p>) : (<ul className='list-disc px-5'>{acceptedFileItems}</ul>)}
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default ImageDragDrop