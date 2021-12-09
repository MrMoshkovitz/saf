import {Command, flags} from '@oclif/command'
import fs from 'fs'
import {XCCDFResultsMapper as Mapper} from '@mitre/hdf-converters'

function checkSuffix(input: string) {
  if (input.endsWith('.json')) {
    return input
  }
  return `${input}.json`
}

export default class XCCDFResultsMapper extends Command {
  static usage = 'xccdf_results -i, --input=XML -o, --output=OUTPUT'

  static description = fs.readFileSync('./help/convert/xccdf_results.md', {encoding: 'utf-8'})

  static flags = {
    help: flags.help({char: 'h'}),
    input: flags.string({char: 'i', required: true}),
    output: flags.string({char: 'o', required: true}),
  }

  async run() {
    const {flags} = this.parse(XCCDFResultsMapper)

    const converter = new Mapper(fs.readFileSync(flags.input, {encoding: 'utf-8'}))
    fs.writeFileSync(checkSuffix(flags.output), JSON.stringify(converter.toHdf()))
  }
}
