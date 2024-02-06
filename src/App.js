import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from './pages/Dashboard.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <Layout />,
    children: [
      { path: "/:routeName", element: <Dashboard /> }, 
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
