require('dotenv').config({ path: '../.env.producao' })
const Express = require('express')
const cors = require('cors')
const { saveOrder } = require('./lib/spreadsheet')
const { createPixCharge } = require('./lib/pix')

const app = Express()

app.use(cors())
app.use(Express.json())

app.get('/', (req, res) => {
  res.send({ ok: true })
})
app.post('/create-order', async (req, res) => {
  const pixCharge = await createPixCharge(req.body)
  const { qrcode, cobranca } = pixCharge
  await saveOrder({ ...req.body, id: cobranca.txid })
  res.send({ ok: 1, qrcode, cobranca })
})

app.listen(3002, (err) => {
  if (err) {
    console.log('Servidor não Iniciado!')
  } else {
    console.log('Servidor TRUFASHOP rodando na porta 3002')
  }
})
