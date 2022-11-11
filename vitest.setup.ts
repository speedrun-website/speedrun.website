import { config } from '@vue/test-utils'
import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'
import type { Ref } from 'vue'
import { reactive, isRef, toRef } from 'vue'

const fetchMock = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMock.enableMocks()

// fetchMock.mockResponse((req) => {
//   if (req.url.endsWith('/api/Users/login')) {
//     console.debug(req)
//     return JSON.stringify({
//       token: 'jwt-token',
//     })
//   } else if (req.url.endsWith('/api/Users/me')) {
//     console.debug(req)
//     return JSON.stringify({
//       admin: false,
//       email: 'email',
//       username: 'uname',
//     })
//     // return Promise.resolve()
//   }

//   return JSON.stringify({
//     status: 500,
//   })
// })

vi.stubGlobal('fetch', fetchMock)

// enableAutoUnmount(afterEach)

// Stolen from here:
// https://zenn.dev/ninebolt6/articles/cadc924cb2416d
const payload = reactive<{ state: Record<string, any> }>({
  state: {},
})
export const useStateMock = vi.fn((key: string, init?: () => any) => {
  const state = toRef(payload.state, key)
  if (state.value === undefined && init) {
    const initialValue = init()
    if (isRef(initialValue)) {
      payload.state[key] = initialValue
      return initialValue as Ref<any>
    }
    state.value = initialValue
  }
  return state
})
vi.stubGlobal('useState', useStateMock)

vi.stubGlobal('useRuntimeConfig', () => ({
  public: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  },
}))

config.global.mocks = {
  $t: (msg: any) => msg,
}
