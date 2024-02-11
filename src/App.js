import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './pages/Dashboard.tsx';
import { ROUTES } from './resources/constants.ts';
import Layout from './pages/Layout/Layout.tsx';

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
