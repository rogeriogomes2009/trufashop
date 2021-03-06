import { useCart } from './CartContext'
import Link from 'next/link'

const Header = () => {
  const cart = useCart()
  //const itensCount = Object.keys(cart.cart).length
  const itensCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)
  return (
    <header>
      <navbar>
        <div className='flex justify-between px-6 bg-gradient-to-tr from-red-300 to-pink-900 items-center py-4'>
          <div>
            <Link href='/'>
              <a>
                <img src='/logo.png' alt='TRUFA SHOP' />
              </a>
            </Link>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h8m-8 6h16'
            />
          </div>

          <ul className='flex space-x-6'>
            <li className='text-white text-lg font-semibold tracking-normal cursor-pointer'>
              Home
            </li>
            <li className='text-white text-lg font-semibold tracking-normal cursor-pointer'>
              Sobre
            </li>
            <li className='text-white text-lg font-semibold tracking-normal cursor-pointer'>
              Contato
            </li>
            <Link href='/cart'>
              <a>
                <li className='bg-indigo-600 hover:bg-indigo-500 text-lg font-semibold focus:outline-none transition text-white px-4'>
                  Carrinho {itensCount > 0 && <span>({itensCount})</span>}
                </li>
              </a>
            </Link>
          </ul>
        </div>
      </navbar>
    </header>
  )
}
export default Header
