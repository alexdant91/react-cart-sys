import { useState, useEffect } from 'react'

import axios from 'axios'
import CartProduct from './CartProduct';
import CartSummary from './CartSummary';

const Cart = ({ user, userToken }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchCartProducts = async () => {
    try {
      const results = await axios({
        url: "http://localhost:3000/cart",
        method: "GET",
        headers: {
          "Authorization": userToken
        }
      })

      setCartProducts(results.data.cart);
    } catch (err) {
      console.error(err);
    }
  }

  const getTotalCartProducts = () => {
    return cartProducts.reduce((prevValue, current) => prevValue + current.qnt, 0);
  }

  const handleChangeQuantity = (productId, quantity) => {
    const _cartProducts = [...cartProducts];

    const index = _cartProducts.findIndex(prod => prod.productId == productId);

    if (index != -1) {
      if (quantity == 0) {
        if (window.confirm("Sei sicuro di voler eliminare il prodotto dal carrello?")) {
          _cartProducts.splice(index, 1);

          // Elimina lato server tramite chiamata

          setCartProducts(_cartProducts);
          return;
        }
        return;
      };

      _cartProducts[index].qnt = quantity;

      // Modifica quantità lato server tramite chiamata

      setCartProducts(_cartProducts);
    }
  }

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    setTotalProducts(getTotalCartProducts());
  }, [cartProducts])

  return (
    <div className="bg-gray-100 h-full pt-10">
      <div className="container mx-auto">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Carrello</h1>
              <h2 className="font-semibold text-2xl">({totalProducts}) Prodott{totalProducts == 1 ? 'o' : 'i'}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Dettagli prodotto</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantità</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Prezzo</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Totale</h3>
            </div>

            {
              cartProducts.length > 0 ?
                cartProducts.map(product => {
                  return <CartProduct product={product} handleChangeQuantity={handleChangeQuantity} />
                })
                :
                (
                  <p>Carrello vuoto</p>
                )
            }
          </div>

          <CartSummary totalProducts={totalProducts} cartProducts={cartProducts} />

        </div>
      </div>
    </div>
  )
}

export default Cart;
