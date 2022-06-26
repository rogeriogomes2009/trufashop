require('dotenv').config({ path: '../.env.producao' })

const app = require('./app')

app.listen(3002, (err) => {
  if (err) {
    console.log('Servidor não Iniciado!')
  } else {
    console.log('Servidor TRUFASHOP rodando na porta 3002')
  }
})
