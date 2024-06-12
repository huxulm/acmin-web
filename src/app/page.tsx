"use client";
import { lazy } from "react";

const HomeContent = lazy(() => import("@/components/HomeContent"));

const Home = () => {
  return (
      <HomeContent />
  );
};

export default Home;
