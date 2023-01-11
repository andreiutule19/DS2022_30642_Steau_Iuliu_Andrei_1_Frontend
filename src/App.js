import './App.css';
import PrivateRouteAdmin from './components/privateRoute/privateRouteADMIN';
import Login from './layouts/sign-in';
import Home from './layouts/Admin/home';
import Devices from './layouts/Admin/devices';
import Users from './layouts/Admin/users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UserDevicesList from './components/tables/userDevicesTable';
import Associated from './layouts/Admin/asociatedDevices';
import DataChart from './layouts/User/dataChart';
import HomeUser from './layouts/User/homeUser';

import {
  BrowserRouter,
  Route,
  Routes as Switch,
} from "react-router-dom";
import PrivateRouteUser from './components/privateRoute/privateRouteUSER';
import ChatRoom from './components/chat/ChatRoom';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});




function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" element={<Login />} />
            <Route exact path='/' element={<PrivateRouteAdmin />}>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/devices" element={<Devices />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/data" element={<UserDevicesList />} />
              <Route exact path="/associate" element={<Associated />} />
              <Route exact path="/chat" element={<ChatRoom />} />
            </Route>
            <Route exact path='/' element={<PrivateRouteUser />}>
              <Route exact path="/homeUser" element={<HomeUser />} />
              <Route exact path="/associated" element={<DataChart />} />
              <Route exact path="/chaty" element={<ChatRoom />} />
            </Route>
          </Switch>
        </BrowserRouter>

      </ThemeProvider>
    </div>
  );
}

export default App;
