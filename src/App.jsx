import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Posts from './components/posts/Posts'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Posts />} path='/' ></Route>
      </Routes>
    </BrowserRouter>
  )
}
