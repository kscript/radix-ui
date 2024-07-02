const fs = require('fs')
const path = require('path')
fs.writeFileSync(path.join(process.cwd(), 'build/404.html'), fs.readFileSync(path.join(process.cwd(), 'build/index.html')))