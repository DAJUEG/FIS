function stopCamera(videoRef: React.RefObject<HTMLVideoElement>) {
  if (videoRef.current && videoRef.current.srcObject) {
    const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    tracks.forEach((track) => track.stop());
  }
}

function startCamera(videoRef: React.RefObject<HTMLVideoElement>) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    })
    .catch((error) => {
      console.error("can't access the camera,", error);
    });
}

function capturePhoto(
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  onCapture: (ImageData: string) => void
) {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (video && canvas) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // create image context
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      onCapture(imageData);
    }
  }
}

export { stopCamera, startCamera, capturePhoto };
