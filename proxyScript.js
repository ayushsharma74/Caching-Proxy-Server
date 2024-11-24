import { program } from "commander"

program
  .option('--port <number>', 'Port to run the proxy server')
  .option('--origin <url>', 'Origin server URL')
  .option('--clear-cache', 'Clear the cache');


program.parse(process.argv);
const options = program.opts();
export {options}


