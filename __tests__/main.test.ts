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
    const issue_number = '123'
    const private_key = '0x***'
    await main.run(issue_number, private_key)
    expect(runMock).toHaveReturned()
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('sets a failed status', async () => {
    const issue_number = '123'
    const private_key = '0x***'
    await main.run(issue_number, private_key)
    expect(runMock).toHaveReturned()
  })
})
