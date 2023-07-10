import { Route, Routes } from "react-router-dom";
import { CampaignDetails, Home, Profile } from "./pages";
import { Navbar, Sidebar } from "./components";
import CreateCampaign from "./pages/CreateCampaign";
export default function App() {
  return (
    <div className="reative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/profile" />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
}
