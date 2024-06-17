import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearFileMetaData, clearFileUrl, setFileMetaData, setFileUrl, setIsFileUrl } from "../store/slice/fileSlice";
import { setIsFileComp, setIsTextComp } from "../store/slice/componentSlice";
import { IconButton } from '@mui/material';
import { useMediaQuery } from "react-responsive";
import "../style.css";

function FileDragDrop() {
    const dispatch = useDispatch();
    const { isFileUrl } = useSelector((state) => state.file);
    const [isFocused, setIsFocused] = useState(false);
    const isMobileScreen = useMediaQuery({ maxWidth: 600 });

    const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 10, onDragEnter: () => setIsFocused(true), onDragLeave: () => setIsFocused(false)
    });

    const onDone = useCallback(async () => {
        try {
            setIsFocused(false);
            if (acceptedFiles.length === 1) {
                setIsFocused(true);
                toast.success("File is accepted");
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    dispatch(setFileMetaData({ fileName: acceptedFiles[0].name, fileType: acceptedFiles[0].type }));
                    dispatch(setFileUrl(fileReader.result));
                    dispatch(setIsFileUrl(true));
                }
                fileReader.readAsDataURL(acceptedFiles[0]);
            }
            else if (acceptedFiles.length >= 2 && acceptedFiles.length <= 10) {
                // setIsFocused(true);
                // toast.success(`${acceptedFiles.length} Files are accepted`);
                // dispatch(setIsFileUrl(true));
                // acceptedFiles.map((item) => {
                //     const fileReader = new FileReader();
                //     fileReader.onload = () => {
                //         dispatch(setFileMetaData(({ fileName: item.name, fileType: item.type })));
                //         dispatch(setFileUrl(fileReader.result));
                //     }
                //     fileReader.readAsDataURL(item);
                // });
                toast.error("Select Only One File");
            } else {
                fileRejections?.length === 0 ? toast.error("No File is Selected") : toast.error(fileRejections[0]?.errors[0]?.message);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }, [acceptedFiles, fileRejections, dispatch]);

    const onReset = () => {
        dispatch(clearFileUrl());
        dispatch(clearFileMetaData());
        dispatch(setIsFileUrl(false));
        toast.success("Reset Done");
    }

    const acceptedFileItems = acceptedFiles.map((file) => (
        isFileUrl && (<li key={file.path} >
            {file.path} - {(file.size / 1000000).toFixed(2)} Mb
        </li >)
    ));

    return (
        <section className={`${isMobileScreen ? "py-2 px-1" : "p-5"}`}>
            <div className={`flex-1 flex-col align-middle p-[20px] border-2 rounded-lg bg-[#fafafa] text-[#bdbdbd] outline-none border-dashed transition-all ease-in-out duration-[240] border-[${isFocused ? "#2196f3" : "#eeeeee"}]`}>
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} onClick={() => setIsFocused(true)} />
                    {isDragActive ? (<p>Drop the files here ...</p>) :
                        (<p>Drag 'n' drop files here, or click to select file</p>)}
                </div>
            </div>
            <div className={`flex gap-5 items-center ${isMobileScreen ? "flex-col" : "flex-row"} relative`}>
                <div className={`flex gap-5`}>
                    <button onClick={onDone} className='p-3 mt-5 rounded-lg bg_btn text-white font-semibold duration-300 hover:duration-300 cursor-pointer'>CLICK TO PROCEED</button>
                    <button onClick={onReset} className={` mt-5 p-3 rounded-lg bg_btn text-white font-semibold duration-300  hover:duration-300 cursor-pointer`} disabled={!isFileUrl}>RESET</button>
                </div>
                <div className={`flex flex-col ${isMobileScreen ? "text-[0.7rem]" : "text-[0.9rem]"}`}>
                    <p className='text-gray-600 font-medium'>*Click <span className='text-blue-500'>CLICK TO PROCEED</span> After Selecting File</p>
                    <p className='text-gray-600 font-medium'>*Select One File to Avail <span className='text-blue-500'>COMPRESS,CONVERT</span> Options</p>
                </div>
                <IconButton onClick={() => {
                    dispatch(setIsTextComp(true));
                    dispatch(setIsFileComp(false));
                }} className={`${isMobileScreen ? "absolute top-0 left-[40%]" : "relative"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                </IconButton>
            </div>
            <aside className={` ${isMobileScreen ? "mb-3" : "mt-5 mb-5"}`}>
                <h4 className='font-bold text-blue-600'>Accepted File:</h4>
                <div className={`${isMobileScreen ? "text-[0.7rem]" : "text-[0.9rem]"}`}>
                    {acceptedFileItems.length === 0 ? (<p className='text-gray-600 font-medium'>No File Is Selected</p>) : (<ul className='list-disc px-5'>{acceptedFileItems}</ul>)}
                </div>
            </aside>
        </section>
    );
}

export default FileDragDrop;