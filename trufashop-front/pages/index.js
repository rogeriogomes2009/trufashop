import Prismic from 'prismic-javascript'
const Index = (props) => {
  const CartIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-8'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
      />
    </svg>
  )
  const { products } = props
  //const products = [1, 2, 3, 4, 5, 6]
  return (
    <>
      <header>
        <navbar>
          <div class='flex justify-between px-6 bg-red-400 items-center py-4'>
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
                Carrinho
              </li>
            </ul>
          </div>
        </navbar>
      </header>
      <div className='h-screen bg-red-300'>
        <h1 className='p-2 bg-red-900'></h1>
        <main className='flex flex-row bg-red-900 flex-wrap gap-0'>
          {products.map((product) => (
            <section className='flex flex-col md:flex-row py-5 px-5 bg-red-500 rounded-3xl shadow-lg w-1/3'>
              <div className='text-indigo-500 flex flex-col justify-between'>
                <img src={product.data.image.url} alt='' />
              </div>
              <div className='text-white'>
                <h4 className='uppercase text-lg text-right'>TRUFADOS</h4>
                <h3 className='uppercase text-black text-lg font-medium text-right'>
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
                  >
                    <CartIcon />
                  </button>
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  )
}
export async function getServerSideProps({ res }) {
  const client = Prismic.client('https://trufashop2022.prismic.io/api/v2')
  const products = await client.query(
    Prismic.Predicates.at('document.type', 'product')
  )
  return {
    props: {
      date: Date.now(),
      products: products.results,
    },
  }
}
export default Index
