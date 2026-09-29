import { Box } from '@mui/material'
import Navbar from '../../components/Global/Navbar'
import Carousel from '../../components/Landing/Carousel'
import Hero from '../../components/Landing/Hero'
import WhyCustomersLove from '../../components/Landing/WhyCustomersLove'

function LandingScreen() {
  return (
    <Box>
        <Navbar position='fixed'/>
        
        <Box sx={{ position: "relative" }}>
            <Carousel />
            <Hero />
        </Box>

        <WhyCustomersLove />
    </Box>
  )
}

export default LandingScreen