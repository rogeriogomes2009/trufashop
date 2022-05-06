require('dotenv').config({ path: '../.env.homologacao' })
const fs = require('fs')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciais = require('../credenciais.json')

const doc = new GoogleSpreadsheet(
  '1BlsOdl4Y01eepf5LWunWFgCnaTXeWRcdwc_pIZ4QqZs'
)
const run = async () => {
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL_GOOGLE_API,
    private_key: credenciais.private_key,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  await sheet.addRows([
    {
      Pedido: '2',
      Cliente: 'Rogério Gomes',
      Telefone: '21 972300670',
      Endereço: 'Rua Luiz Fabiano, 49 - Tribobó - SG',
      Produto: 'Trufa de Morango',
      Quantidade: '6',
      ValorUnit: 'R$ 4,00',
      Total: 'R$ 24,00',
      StatusPg: 'Aguardando PIX',
      StatusEntrega: 'A Confirmar',
    },
  ])
}
run()
