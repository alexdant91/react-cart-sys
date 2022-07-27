import { useState, useEffect } from 'react'

import axios from 'axios'

const CartSummary = ({ totalProducts, cartProducts }) => {
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState(false);
  const [promoValue, setPromoValue] = useState("");
  const [deliveryType, setDeliveryType] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDeliveryType = ({ target: { value } }) => {
    setDeliveryType(value);
  }

  const getPartialPrice = () => {
    return cartProducts.reduce((previous, current) => {
      return previous + (current.qnt * current.price);
    }, 0);
  }

  const calculateTotalWithDelivery = () => {
    const partial = getPartialPrice();

    return partial + parseFloat(deliveryType);
  }

  const calculateTotalWithPromo = () => {
    const withDelivery = calculateTotalWithDelivery();
    if (promo === null) {
      setTotalPrice(withDelivery);
    } else if (promo.type === "percentage") {
      setTotalPrice(withDelivery - (withDelivery * (promo.value / 100)));
    } else if (promo.type === "amount") {
      setTotalPrice(withDelivery - promo.value);
    }
  }

  const handleChangePromo = ({ target: { value } }) => {
    setPromoValue(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const results = await axios({
        url: `http://localhost:3000/promo-code/${promoValue}`,
        method: "GET",
      });

      setPromoError(false)
      setPromo(results.data.promo);
      setPromoValue("");
    } catch (err) {
      setPromo(null);
      console.error(err)
      setPromoValue("");
      setPromoError(true)
    }
  }

  const handleRemovePromo = () => {
    setPromo(null);
  }

  useEffect(() => {
    calculateTotalWithPromo();
  }, [promo]);

  useEffect(() => {
    calculateTotalWithPromo();
  }, [deliveryType]);

  useEffect(() => {
    calculateTotalWithPromo();
  }, []);

  return (
    <div id="summary" className="w-1/4 px-8 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Riassunto Ordine</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">Prodotti ({totalProducts})</span>
        <span className="font-semibold text-sm">€{getPartialPrice()}</span>
      </div>
      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">Spedizione</label>
        <select onChange={handleDeliveryType} value={deliveryType} className="block p-2 text-gray-600 w-full text-sm">
          <option value="0">Free - €0,00</option>
          <option value="10">Standard - €10,00</option>
          <option value="25">Premium - €25,00</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="py-10">
          <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" value={promoValue} onChange={handleChangePromo} name="promo" placeholder="Inserisci il tuo codice sconto" className="p-2 text-sm w-full" />
          <div className="mt-2">
            {
              promo != null ?
                (
                  <span className="text-xs font-semibold inline-block py-1 pl-3 pr-2 uppercase rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1">
                    {promo.name}
                    <button onClick={handleRemovePromo} className="ml-2">&#x2715;</button>
                  </span>
                )
                :
                (
                  <></>
                )
            }
            {
              promoError ?
                <p>Codice non valido</p>
                :
                <></>
            }
          </div>
        </div>
        <button type="submit" className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Applica</button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Totale</span>
            <span>€{totalPrice}</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </form>
    </div>
  )
}

export default CartSummary;
