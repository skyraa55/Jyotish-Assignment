import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"

export default function Details(){
    const { id } = useParams();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);
    const drawCanvasRef = useRef(null);
  
    useEffect(()=>{
        startCamera();
    },[]);
    const startCamera = async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            video:true
        });
        videoRef.current.srcObject = stream;
    }
    const capturePhoto = ()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 300;
        ctx.drawImage(videoRef.current,0,0,400,300);

    };
    const startDrawing = (e)=>{
        drawingRef.current = true;
        const drawCanvas = drawCanvasRef.current;
        const ctx = drawCanvas.getContext("2d");
        const rect = drawCanvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX-rect.left,e.clientY-rect.top);
    }
    const stopDrawing = ()=>{
        drawingRef.current = false;
    }
      const draw = (e)=>{
        if(!drawingRef.current) return;
        const drawCanvas = drawCanvasRef.current;
        const ctx = drawCanvas.getContext("2d");
        const rect = drawCanvas.getBoundingClientRect();
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX-rect.left,e.clientY-rect.top);
        ctx.stroke();

    }
    const mergePhotoAndSignature = ()=>{
        const photoCanvas = canvasRef.current;
        const signatureCanvas = drawCanvasRef.current;
        const finalCanvas = document.createElement('canvas');
        const ctx = finalCanvas.getContext("2d");
        const width = 400;
        const photoHeight = 300;
        const signHeight = 60;
        finalCanvas.width=width;
        finalCanvas.height=photoHeight+signHeight;
        ctx.drawImage(photoCanvas,0,0,width,photoHeight);
        ctx.drawImage(signatureCanvas,0,photoHeight,width,signHeight);

        const finalImage = finalCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = finalImage;
        link.download="employee_photo_signature.png";
        link.click();

    }
    return (
        <div>
            <h1 className="text-3xl font-semibold mb-2">Employee Id: {id}</h1>
            <video ref={videoRef} autoPlay width={400} />
            <br />
            <button className="px-4 py-2 rounded-lg bg-green-500 text-white" onClick={capturePhoto}>cature photo</button>
            <br />
            <canvas ref={canvasRef} style={{ border:"1px solid black "}} />
            <h2 className="px-4 py-2 rounded-lg bg-green-500 text-white" >Signature</h2>
            <canvas ref={drawCanvasRef} width="400" height="60" style={{ border:"1px solid black "}} onMouseDown={startDrawing} onMouseLeave={stopDrawing} onMouseUp={stopDrawing} onMouseMove={draw} />
            <br />
            <button className="px-4 py-2 rounded-lg bg-green-500 text-white" onClick={mergePhotoAndSignature}>
                photo+sign 
            </button>
        </div>
    );
}