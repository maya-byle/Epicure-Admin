import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from './resources/constants.ts';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Layout from './pages/Layout/Layout.tsx';
import Login from './pages/Login/Login.tsx';

const router = createBrowserRouter([
  { path: ROUTES.LOGIN_PAGE , element: <Login /> }, 
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
