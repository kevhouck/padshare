var hostname = process.env.CORE_HOSTNAME
var port = process.env.CORE_PORT
var protocol = process.env.CORE_PROTOCOL

var server = {
  protocol: protocol,
  hostname: hostname,
  port: port
}

export const config = {
  server: server
}
