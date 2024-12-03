import Router from "preact-router";
import PhotoPage from "./pages/PhotoPage";
import HomePage from "./pages/HomePage";
import ImagePage from "./pages/ImagePage";

const App = () => {
  return (
    <Router>
      <HomePage path="/"></HomePage>
      <PhotoPage path="/photo"></PhotoPage>
      <ImagePage path="image"></ImagePage>
    </Router>
  );
};

export default App;
