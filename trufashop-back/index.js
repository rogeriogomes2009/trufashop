require('dotenv').config({ path: '../.env.producao' })

const https = require('https')
const fs = require('fs')
const app = require('./app')

const options = {
  //tls
  key: fs.readFileSync(
    '/etc/letsencrypt/live/api-trufashop.kadoshdev.xyz/fullchain.pem'
  ),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/ api-trufashop.kadoshdev.xyz/privkey.pem'
  ),
  //mtls
  ca: fs.readFileSync('/chain-pix-prod.crt'), //gerencianet
  minVersion: 'TLSv1.2',
  requestCert: true,
  rejectUnauthorized: false,
}

const server = https.createServer(options, app)
server.listen(443)
