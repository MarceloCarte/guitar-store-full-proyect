import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/appProvider";
import AppRouter from "./routes/Routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <AppRouter/>
        </AppProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
