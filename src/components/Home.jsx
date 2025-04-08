import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import './css/home.css'

const Home = () => {
  const [selectedPath, setSelectedPath] = useState('');

  return (
    <div className='home-root'>
      <Sidebar onPathChange={setSelectedPath}  />
      <Main currentPath={selectedPath} />      
    </div>
  )
}

export default Home
