import base64ToFile from "./base64ToFile";

const uploadPhoto = (imageData: any) => {
  const file = base64ToFile(imageData, "photo.png");
  // create FormData object
  const formData = new FormData();
  formData.append("images", file);
  formData.append("organs", "leaf");

  fetch(
    "https://my-api.plantnet.org/v2/identify/all?api-key=2b105CNFzkqUGenb8CPhOs4YVO",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("上传成功:", data);
    })
    .catch((error) => {
      console.error("上传失败:", error);
    });
};

export default uploadPhoto;
