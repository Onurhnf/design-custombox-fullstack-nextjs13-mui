"use client";
import Rectangle from "@/components/Rectangle.component";
import SideBar from "@/components/SideBar.component";
import { IRectangle } from "@/interfaces/IRectangle.interface";
import { useState } from "react";

const HomePage = () => {
  const [rectangle, setRectangle] = useState<IRectangle.IRectangleDetail>(
    {} as IRectangle.IRectangleDetail
  );

  return (
    <div style={{ display: "flex" }}>
      <Rectangle setRectangle={setRectangle} rectangle={rectangle} />
      <SideBar setRectangle={setRectangle} rectangle={rectangle} />
    </div>
  );
};

export default HomePage;
