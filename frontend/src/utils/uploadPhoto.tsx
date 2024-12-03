import base64ToFile from "./base64ToFile";
import plantnetAPI from "./api.json";

interface ResultData {
  query: {
    project: string;
    images: string[];
    organs: string[];
    includeRelatedImages: boolean;
    noReject: boolean;
  };
  language: string;
  preferedReferential: string;
  bestMatch: string;
  results: Array<{
    score: number;
    species: {
      scientificNameWithoutAuthor: string;
      scientificNameAuthorship: string;
      genus: {
        scientificNameWithoutAuthor: string;
        scientificNameAuthorship: string;
        scientificName: string;
      };
      family: {
        scientificNameWithoutAuthor: string;
        scientificNameAuthorship: string;
        scientificName: string;
      };
      commonNames: string[];
      scientificName: string;
    };
    gbif: {
      id: string;
    };
    powo: {
      id: string;
    };
  }>;
  version: string;
  remainingIdentificationRequests: number;
}

const uploadPhoto = (
  imageData: any,
  organ: string,
  setResultData: (result: ResultData) => void
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
      console.error("上传失败:" + error);
    });
};

function submitData(
  setSubmitButtonstatus: any,
  imageData: string,
  organ: string,
  setResultData: (result: ResultData) => void
) {
  setSubmitButtonstatus(true);
  uploadPhoto(imageData, organ, setResultData);
  setTimeout(() => {
    setSubmitButtonstatus(false);
  }, 2000);
}

export { uploadPhoto, submitData };
