
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemListContainer from './pages/ItemListContainer';
import ProductDetail from './pages/ItemDetailContainer';
import Cart from './pages/Cart';
import { Header } from './components/Header/Header';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;