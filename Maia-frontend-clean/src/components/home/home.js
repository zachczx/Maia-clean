import React from 'react';
import NavBar from "@/components/home/nav-bar/nav-bar";
import Body from "@/components/home/body";
import Chatbot from "@/components/chatbot/chatbot";

function Home () {
  return (
    <div className='font-lato'>
      <NavBar />
      <Body />
      <Chatbot />
    </div>
  )
}
export default Home;