import { useState, useEffect } from 'react'

const CartProduct = ({ product, handleChangeQuantity }) => {
  const { productId, title, brand, image, qnt, price } = product;

  const [quantity, setQuantity] = useState(qnt);

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  }

  const handleRemoveQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  }

  useEffect(() => {
    handleChangeQuantity(productId, quantity);
  }, [quantity]);

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-24" src={image} alt={title} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{title}</span>
          <span className="text-red-500 text-xs">{brand}</span>
          <a href="/" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Elimina</a>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button onClick={handleRemoveQuantity}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>

        <input className="mx-2 border text-center w-8" type="text" value={qnt} />

        <button onClick={handleAddQuantity}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">€{price}</span>
      <span className="text-center w-1/5 font-semibold text-sm">€{price * qnt}</span>
    </div>
  )
}

export default CartProduct;
