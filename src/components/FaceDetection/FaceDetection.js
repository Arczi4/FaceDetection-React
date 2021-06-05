import * as blazeface from "@tensorflow-models/blazeface";


export async function FaceDetection( img ) {
    // Load the model.
    const model = await blazeface.load();
  
    // Pass in an image or video to the model. The model returns an array of
    // bounding boxes, probabilities, and landmarks, one for each detected face.
  
    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
    const predictions = await model.estimateFaces(img, returnTensors);
    drawRect(predictions)
}

export async function drawRect( predictions, ctx){
    if (predictions.length > 0) {  
        for (let i = 0; i < predictions.length; i++) {
          const start = predictions[i].topLeft;
          const end = predictions[i].bottomRight;
          const size = [end[0] - start[0], end[1] - start[1]];
    
          // Render a rectangle over each detected face.
          ctx.fillRect(start[0], start[1], size[0], size[1]);
        }
      }
}