import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from './pages/Dashboard.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { ROUTES } from './resources/constants.ts';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
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
