import { useCart } from './CartContext'

const Header = () => {
  const cart = useCart()
  const itensCount = Object.keys(cart.cart).length
  return (
    <header>
      <navbar>
        <div class='flex justify-between px-6 bg-gradient-to-tr from-red-300 to-pink-900 items-center py-4'>
          <div>
            <img src='/logo.png' alt='TRUFA SHOP' />
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M4 6h16M4 12h8m-8 6h16'
            />
          </div>
          <ul class='flex space-x-6'>
            <li class='text-white text-lg font-semibold tracking-normal cursor-pointer'>
              Home
            </li>
            <li class='text-white text-lg font-semibold tracking-normal cursor-pointer'>
              Sobre
            </li>
            <li class='text-white text-lg font-semibold tracking-normal cursor-pointer'>
              Contato
            </li>
            <li class='bg-indigo-600 hover:bg-indigo-500 text-lg font-semibold focus:outline-none transition text-white px-4'>
              Carrinho {itensCount > 0 && <span>({itensCount})</span>}
            </li>
          </ul>
        </div>
      </navbar>
    </header>
  )
}
export default Header
