import * as core from '@actions/core'
import * as main from '../src/main'

const runMock = jest.spyOn(main, 'run')

let debugMock: jest.SpyInstance
let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
let setFailedMock: jest.SpyInstance
let setOutputMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()  
  })
  // a refaire en ajoutant "getInputMock = jest.spyOn(core, 'getInput').mockImplementation()""

  it('sets the time output', async () => {

    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'ISSUE_NUMBER':
          return '1'
        case 'PRIVATE_KEY':
          return '0x123456789'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('sets a failed status', async () => {
    await main.run()
    expect(runMock).toHaveReturned()
  })
})
