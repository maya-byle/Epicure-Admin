import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from './resources/constants.ts';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import Login from './pages/Login/Login.tsx';

const router = createBrowserRouter([
  { path: ROUTES.LOGIN_PAGE , element: <Login /> }, 
  { path: ROUTES.HOME_PAGE, element: <HomePage />,
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
