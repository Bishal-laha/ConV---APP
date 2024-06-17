// import { useDispatch, useSelector } from 'react-redux';
// import { convertBlobForFile } from '../utils/Features';
// import ConvertApi from 'convertapi-js'
// import toast from 'react-hot-toast';
// import { clearFileMetaData, clearFileUrl, setIsFileUrl } from '../store/slice/fileSlice';
// import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
// import { setIsMergeFileDrawerOpen } from '../store/slice/componentSlice';



// function FileMerge() {
//     const dispatch = useDispatch();
//     const { isMergeFileDrawerOpen } = useSelector((state) => state.component);
//     const { fileUrl, fileMetaData, isFileUrl } = useSelector((state) => state.file);

//     const handleMerge = async () => {
//         try {
//             if (fileUrl) {
//                 // const toastId = toast.loading("File Merging Is Processing....");
//                 let convertApi = ConvertApi.auth(import.meta.env.VITE_CONVERT_API_SECRET);
//                 let params = convertApi.createParams();
//                 let arr = [];
//                 fileUrl.forEach((item, index) => {
//                     const blob = convertBlobForFile(item);
//                     const file = new File([blob], fileMetaData[index].fileName, { type: blob.type });
//                     arr.push(file);
//                 })
//                 arr.map((item) => params.add("File", item));

//                 console.log(params);
//                 const result = await convertApi.convert("pdf", "merge", params.params[0]);
//                 console.log(result);
//                 // const compressed_result = result?.dto?.Files[0];
//                 // toast.success("File Compression Is Done....", { id: toastId });
//                 // const link = document.createElement('a');
//                 // link.href = compressed_result.Url;
//                 // link.download = `compressed_${compressed_result.FileName}`;
//                 // document.body.appendChild(link);
//                 // link.click();
//                 // toast.success("Compressed File Downloaded Successfully....", { id: toastId });
//                 // document.body.removeChild(link);
//                 // setIsFileCompressed(false);
//                 // dispatch(setIsFileUrl(false));
//                 // dispatch(clearFileMetaData());
//                 // dispatch(clearFileUrl());
//             }
//         } catch (error) {
//             toast.error(error?.message);
//         }
//     }


//     return (

//         <Dialog open={isMergeFileDrawerOpen} fullWidth>
//             <DialogTitle sx={{ textAlign: "center" }}>Compress PDF</DialogTitle>
//             <IconButton sx={{ position: "absolute", top: "12px", right: "10px" }} onClick={() => dispatch(setIsMergeFileDrawerOpen(false))}>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
//                 </svg>
//             </IconButton>
//             <DialogContentText sx={{ textAlign: "center" }}>Do You Want to Compress PDF?</DialogContentText>
//             <DialogContent sx={{ marginX: "auto" }}>
//                 {
//                     // fileMetaData[0].fileName.split(".")[1].toString() === "pdf" ? (
//                     <div>
//                         <button onClick={handleMerge} className='p-3 rounded-lg bg_btn duration-300 hover:duration-300 cursor-pointer mx-auto mb-5 font-semibold text-white'>MERGE PDF</button>
//                     </div>
//                     // ) : (null)
//                 }
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default FileMerge;