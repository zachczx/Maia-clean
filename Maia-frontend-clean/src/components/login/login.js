import React from "react";
import Header from "@/components/login/header";
import Body from "@/components/login/body";

function Login () {
  return (
    <div className="flex h-screen justify-center items-center bg-blue-50">
      <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] p-9 rounded-lg">
        <Header />
        <Body />
      </div>
    </div>
  )
}

export default Login;
