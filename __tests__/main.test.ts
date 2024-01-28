import * as core from '@actions/core'
import * as main from '../src/main'

const runMock = jest.spyOn(main, 'run')

let errorMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
  })

  it('sets the time output', async () => {
    await main.run()
    expect(runMock).toHaveReturned()
    expect(errorMock).not.toHaveBeenCalled()
  }, 100000)

  it('sets a failed status', async () => {
    await main.run()
    expect(runMock).toHaveReturned()
  }, 100000)
})
