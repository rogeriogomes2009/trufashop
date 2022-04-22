import Prismic from 'prismic-javascript'
const Index = (props) => {
  const products = [1, 2, 3, 4, 5, 6]
  return (
    <div className='h-screen bg-gray-100'>
      <h1>TRUFA SHOP</h1>
      <p>Olá meus amigos!</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <main className='grid'>
        {products.map((product) => (
          <section className='flex flex-col md:flex-row gap-11 py-10 px-5 bg-white rounded-md shadow-lg w-1/4 md:max-w-2xl'>
            <div className='text-indigo-500 flex flex-col justify-between'>
              <img
                src='https://images.stockx.com/Nike-Epic-React-Flyknit-2-White-Pink-Foam-W-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1603481985'
                alt=''
              />
            </div>
            <div className='text-indigo-500'>
              <small className='uppercase'>TRUFADOS</small>
              <h3 className='uppercase text-black text-2xl font-medium'>
                Trufa de Brigadeiro
              </h3>
              <h3 className='text-2xl font-semibold mb-7'>R$3,50</h3>
              <div className='flex gap-0.5 mt-4'>
                <button
                  id='addToCartButton'
                  className='bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3'
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
export async function getServerSideProps({ res }) {
  const client = Prismic.client('https://trufashop2022.prismic.io/api/v2')
  const products = await client.query(
    Prismic.Predicates.at('document.type', 'products')
  )
  return {
    props: {
      date: Date.now(),
      products: products.results,
    },
  }
}
export default Index
