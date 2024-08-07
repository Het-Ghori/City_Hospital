import * as React from 'react';
import Header from '../user/component/Header';
import Footer from '../user/component/Footer';
import Home from '../user/container/Home';
import About from '../user/container/About';
import Appointment from '../user/container/Appointment';
import Contact from '../user/container/Contact';
import Departments from '../user/container/Departments';
import Doctors from '../user/container/doctors/Doctors';
import Doctor from '../user/container/doctors/Doctor';
import NotFound from '../user/component/NotFound';
import Auth from '../user/container/Auth';
import { Route, Routes } from 'react-router-dom';
import Medicine from '../user/container/medicines/Medicine';
import Cart from '../user/container/Cart';
import Favourite from '../user/container/Favourite';
import PrivateRoute from '../routes/PrivateRoute';
// import Splash from '../user/container/Splash';

const UserRoutes = () => {
  const [splashScreen, setSplashScreen] = React.useState(true);

  React.useEffect(() => {
    const splashTime = setTimeout(() => {
      setSplashScreen(false)
    }, 3000);

    return () => clearTimeout(splashTime);
  }, [])

  if (splashScreen) {
    document.body.classList.add("overflow-hidden");
    // return <Splash />
  } else {
    document.body.classList.remove("overflow-hidden");
    return <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/departments' element={<Departments />} />
        <Route element={<PrivateRoute />}>
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/medicines' element={<Medicine />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctor/'>
            <Route path=':id' element={<Doctor />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/favourite' element={<Favourite />} />
        </Route>
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  }
}

export default UserRoutes;