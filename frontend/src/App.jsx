import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './Layout/MainLayout.jsx'
import { Toaster } from "react-hot-toast";


function App() {

  return (

    <>
      <MainLayout />
     <Toaster position="top-right" reverseOrder={false} />

    </>
  )
}

export default App
