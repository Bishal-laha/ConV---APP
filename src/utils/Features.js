const createImage = (url)=>  
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
  })

export const getCroppedImg = async (org_img, croppedAreaPixels) => {
    const image = await createImage(org_img);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return null;
    canvas.width = image.width; 
    canvas.height = image.height;  
    ctx.drawImage(image, 0, 0);  
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');
    if (!croppedCtx)
        return null;
    croppedCanvas.width = croppedAreaPixels.width;
    croppedCanvas.height = croppedAreaPixels.height;
    croppedCtx.drawImage(canvas, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
    return croppedCanvas.toDataURL('image/jpeg');
    //     return new Promise((resolve, reject) => {
    //         croppedCanvas.toBlob((file) => {
    //             resolve(URL.createObjectURL(file))
    //         }, 'image/jpeg')})
}

export const getCroppedImgRotate = async (org_img, croppedAreaPixels, rotation = 0) => {
    const image = await createImage(org_img);
    const { width: rotatedWidth, height: rotatedHeight } = rotateSize(image.width,image.height,rotation);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return null;
    canvas.width = rotatedWidth; 
    canvas.height = rotatedHeight;
    ctx.clearRect(0, 0, rotatedWidth, rotatedHeight)
    ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.drawImage(image, -image.width / 2, -image.height / 2); 
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');
    if (!croppedCtx)
        return null;
    croppedCanvas.width = croppedAreaPixels.width;
    croppedCanvas.height = croppedAreaPixels.height;
    croppedCtx.drawImage(canvas, rotatedWidth / 2 - croppedAreaPixels.width / 2 + croppedAreaPixels.x, rotatedHeight / 2 - croppedAreaPixels.height / 2 + croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
    return croppedCanvas.toDataURL('image/jpeg');
}

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export const convertBlobForFile = (base64Url)=>{
    const base64WithoutPrefix = base64Url[0].split(",")[1];
    const base64Data = atob(base64WithoutPrefix.toString());
    const buffer = new ArrayBuffer(base64Data.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < base64Data.length; i++) {
        view[i] = base64Data.charCodeAt(i);
    }
    const blob = new Blob([view],{ type: 'image/png' });
    return blob;
}

export const convertBlob = (base64Url)=>{
    const base64WithoutPrefix = base64Url.split(",")[1];
    const base64Data = atob(base64WithoutPrefix.toString());
    const buffer = new ArrayBuffer(base64Data.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < base64Data.length; i++) {
        view[i] = base64Data.charCodeAt(i);
    }
    const blob = new Blob([view],{ type: 'image/png' });
    return blob;
}

export const getCompressionAccuracy = (org_size,compress_size,desired_size)=>{
    const actual_size = (compress_size/1024).toFixed(2);
    console.log("ORG",(org_size/1024).toFixed(2));
    console.log("TARGET",desired_size);
    console.log("ACTUAL",actual_size);
    const result = (actual_size / desired_size) * 100;
    return result.toFixed(2);
}

// async function fileToBlob(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             const blob = new Blob([reader.result], { type: file.type });
//             resolve(blob);
//         };
//         reader.onerror = reject;
//         reader.readAsArrayBuffer(file);
//     });
// }