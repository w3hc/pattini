import * as core from '@actions/core'
import * as main from '../src/main'

const runMock = jest.spyOn(main, 'run')

let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })
  // a refaire en ajoutant "getInputMock = jest.spyOn(core, 'getInput').mockImplementation()""

  it('sets the time output', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'ISSUE_NUMBER':
          return '1'
        case 'PULL_REQUEST_NUMBER':
          return '2'
        case 'PRIVATE_KEY':
          return '0x123456789'
        case 'ACTION':
          return 'take'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(errorMock).not.toHaveBeenCalled()
  }, 100000)

  it('sets a failed status', async () => {
    await main.run()
    expect(runMock).toHaveReturned()
  }, 100000)
})
