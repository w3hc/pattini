import * as main from '../src/main'
import * as core from '@actions/core'

// Mock the action's entrypoint
const runMock = jest.spyOn(main, 'run').mockImplementation()

// Mock the GitHub Actions core library
let getInputMock: jest.SpiedFunction<typeof core.getInput>

describe('main', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  it('TO DO', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'ISSUE_NUMBER':
          return '1234-5678'
        case 'PULL_REQUEST_NUMBER':
          return '1234'
        case 'PRIVATE_KEY':
          return '0x1234567890abcdef'
        case 'ACTION':
          return 'test'
        case 'REPOSITORY':
          return 'my-org/my-repo'
        case 'GITHUB_TOKEN':
          return 'my-token'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
  })
})
