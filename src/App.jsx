import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Posts from './components/posts/Posts'
import User from './components/users/User'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<User />} path='/' ></Route>
      </Routes>
    </BrowserRouter>
  )
}
