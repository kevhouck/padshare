
var hostname = process.env.CORE_HOSTNAME
var port = process.env.CORE_PORT

var server = {
  hostname: hostname,
  port: port
}

export const config = {
  server: server
}
