const Express = require('express')
const cors = require('cors')
const { saveOrder } = require('./spreadsheet')

const app = Express()

app.use(cors())
app.use(Express.json())

app.get('/', (req, res) => {
  res.send({ ok: true })
})
app.post('/create-order', async (req, res) => {
  await saveOrder(req.body)
  res.send({ ok: 1 })
})

app.listen(3002, (err) => {
  console.log('Opa', err)
})
