import ConvertApi from 'convertapi-js';
import { useDispatch, useSelector } from 'react-redux';
import { convertBlobForFile } from '../utils/Features';
import { useEffect, useState } from 'react';
import { clearFileMetaData, clearFileUrl, setIsFileUrl } from '../store/slice/fileSlice';
import toast from "react-hot-toast";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { setIsConvertFileDrawerOpen } from '../store/slice/componentSlice';
import "../style.css";

const conversion_data = [
    { title: "Select File Type", format: "" },
    { title: "Word File", format: "docx" },
    { title: "Power-Point File", format: "pptx" },
    { title: "Excel File", format: "xlsx" },
    { title: "HTML File", format: "html" },
    { title: "Text File", format: "txt" },
    { title: "CSV File", format: "csv" },
    { title: "PDF File", format: "pdf" },
    { title: "Image File-JPG", format: "jpg" },
    { title: "Image File-PNG", format: "png" },
    { title: "Image File-SVG", format: "svg" }
];

function FileConverter() {
    const dispatch = useDispatch();
    const { isFileUrl, fileUrl, fileMetaData } = useSelector((state) => state.file);
    const { isConvertFileDrawerOpen } = useSelector((state) => state.component);
    const [userGivenFormat, setUserGivenFormat] = useState(null);
    const [userSelectedFormat, setUserSelectedFormat] = useState(null);

    useEffect(() => {
        if (fileMetaData)
            setUserGivenFormat(fileMetaData[0].fileName.split(".")[1]);
    }, [fileMetaData]);

    const handleConvert = async () => {
        try {
            if (fileUrl) {
                if (userSelectedFormat) {
                    const toastId = toast.loading("Conversion Is Processing....");
                    const blob = convertBlobForFile(fileUrl);
                    const file = new File([blob], fileMetaData[0].fileName, { type: blob.type });
                    let convertApi = ConvertApi.auth(import.meta.env.VITE_CONVERT_API_SECRET);
                    let params = convertApi.createParams();
                    params.add("File", file);
                    const result = await convertApi.convert(userGivenFormat, userSelectedFormat, params);
                    const converted_result = result?.dto?.Files[0];
                    toast.success("File Conversion Is Done....", { id: toastId });
                    const link = document.createElement('a');
                    link.href = converted_result.Url;
                    link.download = `converted_${converted_result.FileName}`;
                    document.body.appendChild(link);
                    link.click();
                    toast.success("Converted File Downloaded Successfully....", { id: toastId });
                    document.body.removeChild(link);
                    dispatch(setIsFileUrl(false));
                    dispatch(clearFileUrl());
                    dispatch(clearFileMetaData());
                    setUserGivenFormat(null);
                    setUserSelectedFormat(null);
                    dispatch(setIsConvertFileDrawerOpen(false));
                } else
                    toast.error("Please Choose a File Type to Convert");
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    return (
        <div>
            {isFileUrl &&
                <Dialog open={isConvertFileDrawerOpen} fullWidth>
                    <DialogTitle sx={{ textAlign: "center" }}>{"Convert File"}</DialogTitle>
                    <IconButton sx={{ position: "absolute", top: "12px", right: "10px" }} onClick={() => dispatch(setIsConvertFileDrawerOpen(false))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </IconButton>
                    <DialogContent sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                        <DialogContentText>Select File Type to Convert: </DialogContentText>
                        <select className='p-2 rounded-lg w-[60%] bg-white border border-1 border-black font-semibold'>
                            {conversion_data.map((item, id) => <option key={id} value={item.format} disabled={item.format === userGivenFormat} className='text-[0.85rem]' onClick={() => setUserSelectedFormat(item.format)}>
                                {item.title}</option>)}
                        </select>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleConvert} className='p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer mx-auto mb-5 font-semibold text-white'>CONVERT</button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    )
}

export default FileConverter
