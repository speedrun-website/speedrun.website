import 'whatwg-fetch'
import { config } from '@vue/test-utils'
// import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'
import type { Ref } from 'vue'
import { reactive, isRef, toRef } from 'vue'

// const fetchMock = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
// fetchMock.enableMocks()

// enableAutoUnmount(afterEach)

// export * from './node_modules/nuxt/dist/app/composables'
// export { useState } from './node_modules/nuxt/dist/app/composables/state'
// export { useState } from '.nuxt/imports'
// export { useState } from 'nuxt/app'

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
