import React, { useRef, useState } from 'react';
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";

const CheckWebcam = () => {
  const canvasRef = useRef();
  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const HiddenFileInput = styled.input`
  display: none;
`;
  const fileInputRef = useRef();
  const imageRef = useRef(null);
  console.log(imageRef, 'what');
  const [imgData, setImgData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const readImage = (file) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onSelectImage = async (e) => {
    setLoading(true);

    const file = e.target.files[0];
    const imgData = await readImage(file);
    setImgData(imgData);

    const imageElement = document.createElement("img");
    imageElement.src = imgData;
    imageElement.onload = async () => {
      await main();
      setLoading(false);
    };
  };
  async function main() {
    if(
      typeof imageRef.current !== "undefined" && 
      imageRef.current !== null
    ){
      const model = await blazeface.load(imageRef.current);
      // Get video properties
      const photo = imageRef.current;
      const photoWidth = imageRef.current.width;
      const photoHeight = imageRef.current.height;

      // Set video width
      imageRef.current.width = photoWidth;
      imageRef.current.height = photoHeight;

      // Set canvas width
      canvasRef.current.width = photoWidth;
      canvasRef.current.height = photoHeight;

      const returnTensors = false; // Pass in `true` to get tensors back, rather than values.

      const predictions = await model.estimateFaces(
        photo, returnTensors);
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
          console.log(size);
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 0, 0)";
          ctx.lineWidth = 2;
          ctx.rect(start[0], start[1], size[0], size[1]);
          ctx.stroke();
        }
      }
    }
  }

  return (
    <>
        <div>
            <img src={imgData} ref={imageRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    textAlign: "centr",
                    zIndex: 9,
                    width: 640,
                    height: 480
                }}
            />
        </div>
        <div>
            <canvas ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    textAlign: "centr",
                    zIndex: 9,
                    width: 640,
                    height: 480
                }}
            />
        </div>
        <HiddenFileInput
            type="file"
            ref={fileInputRef}
            onChange={onSelectImage}
        />
        <button onClick={openFilePicker}>
            {isLoading ? "Recognizing..." : "Select Image"}
        </button>
    </>
  );
}

export default CheckWebcam;
