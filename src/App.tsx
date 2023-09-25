import "./App.css";
import { CatContainer } from "./cats/CatContainer";

function App() {
  return (
    <div className="h-screen bg-gray-100 drop-shadow-lg p-4">
      <div className="w-full flex items-center justify-center">
        <CatContainer />
      </div>
    </div>
  );
}

export default App;
