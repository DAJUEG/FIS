import base64ToFile from "./base64ToFile";
import plantnetAPI from "./api.json";

const uploadPhoto = (
  imageData: any,
  organ: string,
  setResultData: (result: JSON) => void
) => {
  const file = base64ToFile(imageData, "photo.png");
  // create FormData object
  const formData = new FormData();
  formData.append("images", file);
  formData.append("organs", organ);

  fetch(plantnetAPI.api, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response.status);
      if (response.status === 404) {
        alert("wrong img, please try again");
        return;
      }
      // setScientificName(data);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setResultData(data);
    })
    .catch((error) => {
      console.error("上传失败:");
    });
};

export default uploadPhoto;
