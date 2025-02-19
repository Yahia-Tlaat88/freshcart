import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import { Layout } from './Pages/Layout.jsx';
import { Cart } from './Pages/Cart.jsx';
import Brands from './Pages/Brands.jsx';
import { Categories } from './Pages/Categories.jsx';
import Wishlist from './Pages/Wishlist.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Products from './Pages/Products.jsx';
import Register from './Pages/Auth/Register.jsx';
import Login from './Pages/Auth/Login.jsx';
import ProductDetailes from './Pages/ProductDetailes.jsx';
import NotFound from './Pages/NotFound.jsx';
import CartContextProvider from './Pages/context/CartContext.jsx';
import UserContextProvider from './Pages/context/UserLogin.jsx';
import WishlistContextProvider from './Pages/context/WishlistContext.jsx';
import CheckOut from './Pages/Commponents/CheckOut.jsx';

const Routes = createBrowserRouter(
  [{
    path: "/",
    element: <UserContextProvider><Layout /></UserContextProvider>,
    children: [
      { index: true, element: <Login /> },
      { path: "Home", element: <Home /> },
      { path: "Cart", element: <Cart /> },
      { path: "brands", element: <Brands /> },
      { path: "Categories", element: <Categories /> },
      { path: "Wishlist", element: <Wishlist /> },
      { path: "Products", element: <Products /> },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
      { path: "Products/:id", element: <ProductDetailes /> },
      { path: "Checkout", element: <CheckOut/>},
      { path: "*", element: <NotFound /> },
    ],
  },
  ])


createRoot(document.getElementById('root')).render(
  <WishlistContextProvider>
    <CartContextProvider>

      <RouterProvider router={Routes}>

        <App />
      </RouterProvider>

    </CartContextProvider>
  </WishlistContextProvider>
)