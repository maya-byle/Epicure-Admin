import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from './pages/Dashboard.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { ROUTES } from './resources/constants.ts';
import Header from './components/Header/Header.tsx';
import { Fade } from "react-awesome-reveal";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className='content_container'>
          <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  { path: ROUTES.HOME_PAGE, element: <Layout />,
  children: [
    { path: ROUTES.CONTENT_PAGE , element: <Dashboard /> }, 
  ] 
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
