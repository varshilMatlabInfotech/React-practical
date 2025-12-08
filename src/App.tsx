import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Index";
import Bookmark from "@/pages/bookmark/Index";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { usersData } from "./constans/Index";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { setInitData } from "@/store/user/userSlice";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const res = usersData?.map((item) => ({ ...item, is_book_mark: false }));
    dispatch(setInitData(res));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </div>
      <Toaster richColors closeButton duration={800} position="top-right" />
    </div>
  );
};

export default App;
