require('dotenv').config({ path: '../../.env.homologacao' })

const { v4 } = require('uuid')

const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciais = require('../credenciais.json')

const doc = new GoogleSpreadsheet(
  '1BlsOdl4Y01eepf5LWunWFgCnaTXeWRcdwc_pIZ4QqZs'
)
const saveOrder = async (order) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL_GOOGLE_API,
    private_key: credenciais.private_key,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]

  const orderId = order.id

  const rows = order.items.map((item) => {
    const row = {
      Pedido: orderId,
      Cliente: order.nome,
      CPF: order.cpf,
      Telefone: order.telefone,
      Endereco: order.endereco,
      NumResidencia: order.residencia,
      Bairro: order.bairro,
      Municipio: order.municipio,
      Produto: item.name,
      Quantidade: item.quantity,
      ValorUnit: item.price,
      Total: item.price * item.quantity,
      StatusPg: 'Aguardando PIX',
      StatusEntrega: 'A Confirmar',
    }
    return row
  })
  await sheet.addRows(rows)
}

const updateOrder = async (orderId, status) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL_GOOGLE_API,
    private_key: credenciais.private_key,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  const maxRows = sheet.rowCount
  await sheet.loadCells('A1:A' + maxRows)
  await sheet.loadCells('I1:I' + maxRows)
  const validIndex = [...Array(maxRows - 1).keys()]

  for await (const i of validIndex) {
    const cell = await sheet.getCell(1 + i, 0)
    if (cell.value) {
      if (cell.value === orderId) {
        console.log(1 + i, cell.value, typeof cell.value, typeof orderId)
        const statusCell = await sheet.getCell(1 + i, 12)
        statusCell.value = status
      }
    } else {
      break
    }
  }
  await sheet.saveUpdatedCells()
}

module.exports = {
  saveOrder,
  updateOrder,
}
