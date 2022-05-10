require('dotenv').config({ path: '../.env.producao' })
const Express = require('express')
const cors = require('cors')
const { saveOrder } = require('./spreadsheet')
const { createPixCharge } = require('./lib/pix')

const app = Express()

app.use(cors())
app.use(Express.json())

app.get('/', (req, res) => {
  res.send({ ok: true })
})
app.post('/create-order', async (req, res) => {
  const qrcode = await createPixCharge()
  await saveOrder(req.body)
  res.send({ ok: 1, qrcode })
})

app.listen(3002, (err) => {
  if (err) {
    console.log('Servidor não Iniciado!')
  } else {
    console.log('Servidor TRUFASHOP rodando na porta 3002')
  }
})
