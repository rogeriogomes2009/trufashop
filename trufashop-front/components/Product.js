import { useCart } from './CartContext'
import CartIcon from './icons/CartIcon'

const Product = ({ product }) => {
  const cart = useCart()
  const add = (product) => () => {
    cart.addToCart(product)
  }
  return (
    <section className='flex flex-col md:flex-row py-5 px-5 bg-gradient-to-tr from-gray-300 to-white rounded-3xl shadow-lg w-1/3'>
      <div className='text-indigo-500 flex flex-col justify-between'>
        <img src={product.data.image.url} alt='' />
      </div>
      <div className='text-black'>
        <h4 className='uppercase text-lg text-right'>peça já!</h4>
        <h3 className='font-style: italic text-black text-2xl font-medium text-right'>
          {product.data.name}
        </h3>
        <div>
          <h3 className='text-3xl font-semibold mb-7 text-center'>
            R$ {product.data.price}
          </h3>
        </div>
        <div className='flex gap-0.5 mt-0'>
          <button
            id='addToCartButton'
            className='bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3'
            onClick={add(product)}
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
export default Product
