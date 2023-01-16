import {Main} from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Contacts} from '../../pages/contacts/contacts';
import {Login} from '../../pages/login/login';
import {MyBooking} from '../../pages/my-booking/my-booking';
import {QuestPage} from '../../pages/quest-page/quest-page';
import {Booking} from '../../pages/booking/booking';
import {Error} from '../../pages/error/error';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Main />} path={AppRoute.Root}/>
        <Route element={<Contacts />} path={AppRoute.Contacts} />
        <Route element={<Login />} path={AppRoute.Login} />
        <Route element={<MyBooking />} path={AppRoute.MyBooking} />
        <Route element={<QuestPage />} path={`${AppRoute.Quest}/:id`} />
        <Route element={<Booking />} path={`${AppRoute.Quest}/:id${AppRoute.Booking}`} />
        <Route element={<Error />} path='*' />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
