import React from "react";
import styles from "./HeaderSection.module.scss";
import { Project } from "@/types/projects";
import About from "../AboutMe/About";

const HeaderSection = () => {
  return (
    <>
      {/* <div>HeaderSection</div> */}
      <About />
    </>
  );
};

export default HeaderSection;
