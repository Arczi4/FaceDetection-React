import * as blazeface from "@tensorflow-models/blazeface";


export async function FaceDetection( net ) {
  if(
    typeof webcamRef.current !== "undefined" && 
    webcamRef.current !== null && 
    webcamRef.current.video.readyState === 4
  ){
    // Get video properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.

    const predictions = await net.estimateFaces(
      video, returnTensors);
      
    const ctx = canvasRef.current.getContext("2d");

    if (predictions.length > 0) {
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
  
      for (let i = 0; i < predictions.length; i++) {
        if (returnTensors) {
          predictions[i].topLeft = predictions[i].topLeft.arraySync();
          predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
        }
  
        const start = predictions[i].topLeft;
        const end = predictions[i].bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 0, 0)";
        ctx.lineWidth = 2;
        ctx.rect(start[0], start[1], size[0], size[1]);
        ctx.stroke();
      }
    }
    if (predictions.length > 0) {
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
  
      for (let i = 0; i < predictions.length; i++) {
        if (returnTensors) {
          predictions[i].topLeft = predictions[i].topLeft.arraySync();
          predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
        }
  
        const start = predictions[i].topLeft;
        const end = predictions[i].bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 0, 0)";
        ctx.lineWidth = 2;
        ctx.rect(start[0], start[1], size[0], size[1]);
        ctx.stroke();
      }
    }
  }
}
