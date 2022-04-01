import loadable from "@loadable/component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//코드 스플리팅
const Workspace = loadable(() => import("./Workspace/index"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workspace/:workspace/*" element={<Workspace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
