import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import SecretInput from '../Components/SecretInput'
import LinkResult from '../Components/LinkResult'
import Feature from '../Components/Feature'

const Home = () => {
  const [generatedLink, setGeneratedLink] = useState("");

  return (
    <div>
      <Navbar/>
      <Hero/>
      <SecretInput setGeneratedLink={setGeneratedLink} />
      
      {generatedLink && <LinkResult secretLink={generatedLink} />}
      
      <Feature/>
    </div>
  )
}

export default Home