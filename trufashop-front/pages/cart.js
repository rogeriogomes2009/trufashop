import Prismic from 'prismic-javascript'
import Header from '../components/Header'
import { useCart } from '../components/CartContext'
import Head from 'next/head'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'

const Index = ({ products }) => {
  const [orderStatus, setOrderStatus] = useState('pre-order')
  const [qrcode, setQRCode] = useState('')
  const cart = useCart()
  const form = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      telefone: '',
      endereco: '',
      residencia: '',
      bairro: '',
      municipio: '',
    },
    onSubmit: async (values) => {
      const order = { ...values }
      const items = Object.keys(cart.cart).map((curr) => {
        const item = {
          quantity: cart.cart[curr].quantity,
          price: cart.cart[curr].product.data.price,
          name: cart.cart[curr].product.data.name,
        }
        return item
      })
      order.items = items
      setOrderStatus('ordering')
      const result = await axios.post(
        'https://api-trufashop.kadoshdev.xyz/create-order',
        order
      )
      setQRCode(result.data.qrcode.imagemQrcode)
      setOrderStatus('order-received')
    },
  })
  const remove = (id) => () => {
    cart.removeFromCart(id)
  }
  const changeQuantity = (id) => (evt) => {
    cart.changeQuantity(id, Number(evt.target.value))
  }
  const itensCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)
  const total = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity * cart.cart[curr].product.data.price
  }, 0)
  //const products = [1, 2, 3, 4, 5, 6]
  return (
    <>
      <Head>
        <title>TRUFASHOP - Carrinho</title>
      </Head>
      <Header />

      <div className='flex justify-center my-6'>
        <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
          <div className='flex-1'>
            <table className='w-full text-sm lg:text-base' cellSpacing='0'>
              <thead>
                <tr className='h-12 uppercase'>
                  <th className='hidden md:table-cell'></th>
                  <th className='text-left'>Produto</th>
                  <th className='lg:text-right text-left pl-5 lg:pl-0'>
                    <span className='lg:hidden' title='Quantity'>
                      Qtd
                    </span>
                    <span className='hidden lg:inline'>Quantidade</span>
                  </th>
                  <th className='hidden text-right md:table-cell'>
                    Valor Unitário
                  </th>
                  <th className='text-right'>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart.cart).map((key) => {
                  const { product, quantity } = cart.cart[key]
                  return (
                    <tr key={key}>
                      <td className='hidden pb-4 md:table-cell'>
                        <img
                          src={product.data.image.url}
                          className='w-20 rounded'
                          alt={product.data.name}
                        />
                      </td>
                      <td>
                        <p className='mb-2 md:ml-4'>{product.data.name}</p>

                        <button
                          type='submit'
                          className='text-gray-700 md:ml-4'
                          onClick={remove(key)}
                        >
                          <small>(Remover item)</small>
                        </button>
                      </td>
                      <td className='justify-center md:justify-end md:flex mt-6'>
                        <div className='w-20 h-10'>
                          <div className='relative flex flex-row w-full h-8'>
                            <input
                              type='number'
                              defaultValue={quantity}
                              onBlur={changeQuantity(key)}
                              className='w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black'
                            />
                          </div>
                        </div>
                      </td>
                      <td className='hidden text-right md:table-cell'>
                        <span className='text-sm lg:text-base font-medium'>
                          R${' '}
                          {Number(product.data.price)
                            .toFixed(2)
                            .replace('.', ',')}
                        </span>
                      </td>
                      <td className='text-right'>
                        <span className='text-sm lg:text-base font-medium'>
                          R${' '}
                          {Number(product.data.price * quantity)
                            .toFixed(2)
                            .replace('.', ',')}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <hr className='pb-6 mt-6' />
            <div className='my-4 mt-6 -mx-2 lg:flex'>
              <div className='lg:px-2 lg:w-1/2'>
                <div className='p-4 bg-gray-100 rounded-full'>
                  <h1 className='ml-2 font-bold uppercase'>Seus dados</h1>
                </div>
                <div className='p-4'>
                  <div className='justify-center'>
                    {orderStatus === 'pre-order' && (
                      <form onSubmit={form.handleSubmit}>
                        <p className='mb-4 italic'>
                          Por favor, informe SEUS DADOS abaixo para concluir!
                        </p>
                        <div className='my-1 flex items-center w-full h-13 pl-3'>
                          <label className='w-1/4 text-center'>Seu nome</label>
                          <input
                            type='text'
                            name='nome'
                            id='nome'
                            placeholder='Seu nome'
                            value={form.values.nome}
                            onChange={form.handleChange}
                            className='w-3/4 p-4 bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none rounded-full'
                          />
                        </div>
                        <div className='my-1 flex items-center w-full h-13 pl-3'>
                          <label className='w-1/4 text-center'>Seu CPF</label>
                          <input
                            type='text'
                            name='cpf'
                            id='cpf'
                            placeholder='Seu CPF'
                            value={form.values.cpf}
                            onChange={form.handleChange}
                            className='w-3/4 p-4 bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none rounded-full'
                          />
                        </div>
                        <div className='my-1 flex items-center w-full h-13 pl-3'>
                          <label className='w-1/4 text-center'>
                            Seu Telefone
                          </label>
                          <input
                            type='text'
                            name='telefone'
                            id='telefone'
                            placeholder='Seu Nº de Telefone'
                            value={form.values.telefone}
                            onChange={form.handleChange}
                            className='w-3/4 p-4 bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none rounded-full'
                          />
                        </div>
                        <div className='my-1 flex items-center w-full h-13 pl-3'>
                          <label className='w-1/4 text-center'>Endereço</label>
                          <input
                            type='text'
                            name='endereco'
                            id='endereco'
                            placeholder='Seu endereço'
                            value={form.values.endereco}
                            onChange={form.handleChange}
                            className='w-3/4 p-4 bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none rounded-full'
                          />
                        </div>
                        <div className='my-1 flex items-center w-full h-13 pl-3'>
                          <label className='w-1/4 text-center'>
                            Número da Residência
                          </label>
                          <input
                            type='text'
                            name='residencia'
                            id='residencia'
                            placeholder='Nº de sua Residência'
                            value={form.values.residencia}
                            onChange={form.handleChange}
                            className='w-3/4 p-4 bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none rounded-full'
                          />
                        </div>
                        <div className='my-1 flex items-center w-full h-13 pl-3'>
                          <label className='w-1/4 text-center'>Bairro</label>
                          <input
                            type='text'
                            name='bairro'
                            id='bairro'
                            placeholder='Bairro'
                            value={form.values.bairro}
                            onChange={form.handleChange}
                            className='w-3/4 p-4 bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none rounded-full'
                          />
                        </div>
                        <div className='my-1 flex items-center w-full h-13 pl-3'>
                          <label className='w-1/4 text-center'>Município</label>
                          <input
                            type='text'
                            name='municipio'
                            id='municipio'
                            placeholder='Município'
                            value={form.values.municipio}
                            onChange={form.handleChange}
                            className='w-3/4 p-4 bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none rounded-full'
                          />
                        </div>
                        <button className='flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none'>
                          <svg
                            aria-hidden='true'
                            data-prefix='far'
                            data-icon='credit-card'
                            className='w-8'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 576 512'
                          >
                            <path
                              fill='currentColor'
                              d='M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z'
                            />
                          </svg>
                          <span className='ml-2 mt-10px'>Concluir Pedido</span>
                        </button>
                      </form>
                    )}
                    {orderStatus === 'ordering' && (
                      <p>Pedido sendo realizado. Aguarde...</p>
                    )}
                    {orderStatus === 'order-received' && (
                      <>
                        <p>Efetue o pagamento com o QRCode abaixo:</p>
                        <img src={qrcode} />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='lg:px-2 lg:w-1/2'>
                <div className='p-4 bg-gray-100 rounded-full'>
                  <h1 className='ml-2 font-bold uppercase'>Seu Pedido</h1>
                </div>
                <div className='p-4'>
                  <div className='flex justify-between border-b'>
                    <div className='lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800'>
                      Quantidade do Pedido
                    </div>
                    <div className='lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900'>
                      {itensCount}
                    </div>
                  </div>

                  <div className='flex justify-between pt-4 border-b'>
                    <div className='w-1/4 lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800'>
                      Total
                    </div>
                    <div className='w-1/4 lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900'>
                      R$ {Number(total).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  <div className='flex justify-between pt-4 border-b'>
                    <div className='lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800'>
                      Peça também pelo WhatsApp através do QRCode abaixo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
