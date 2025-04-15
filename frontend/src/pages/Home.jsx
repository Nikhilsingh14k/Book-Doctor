
import React, { useEffect} from 'react'

import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'


const Home = () => {
    useEffect(() => {
    fetch("https://bookdoctor.onrender.com").catch(error => console.error("API call failed", error));
}, []);

  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
