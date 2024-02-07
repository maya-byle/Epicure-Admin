import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from './pages/Dashboard.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { ROUTES } from './resources/constants.ts';
import store from './redux/store.ts'

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

store.subscribe(() => {
  console.log("Store Changed:", store.getState())
})

function App() {
  store.dispatch({
    type: "ADD_DATA",
    payload: "maya"
  })
  store.dispatch({
    type: "DELETE_DATA",
    payload: {name: "maya"}
  })
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
