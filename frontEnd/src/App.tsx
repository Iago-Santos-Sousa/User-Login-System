import Router from "./routes";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <Router />
      </AppProvider>
    </>
  );
}

export default App;
