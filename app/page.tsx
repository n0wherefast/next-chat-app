import React from "react";
import WrappedMainPaige from "./coponents/wrapped/WrappedMainPaige";
import {caesarCipher }from '../app/utils/cCipher'



export default function Home() {
  //docker
  //storage
  //IA 
  //crittografia
 caesarCipher('A')
  
  return (
    <>
      <WrappedMainPaige/>
    </>
  );
}
