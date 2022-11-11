/* eslint-disable no-console */
import { ref } from 'vue'
import { useCurrentUser } from 'composables/useCurrentUser'
import { useSessionToken } from 'composables/useSessionToken'
import { Users } from 'lib/api/Users'
import { isProblemDetails } from 'lib/helpers'
import type { LoginRequest, ProblemDetails } from 'lib/api/data-contracts'

interface LoginUserResponse {
  loading: boolean
  error: ProblemDetails | null
}

export const useLoginUser = async (
  requestData: LoginRequest,
): Promise<LoginUserResponse> => {
  const responseLoading = ref(true)
  const responseError = ref<ProblemDetails | null>(null)
  const authToken = useSessionToken()
  const currentUser = useCurrentUser()

  const userClient = new Users({
    baseUrl: useRuntimeConfig().public.BACKEND_BASE_URL,
  })

  try {
    const authResponse = await userClient.usersLoginCreate(requestData)

    console.log('here')
    console.log(authResponse)

    if (authResponse.ok) {
      authToken.value = authResponse.data.token

      console.log('before the call')

      const userResponse = await userClient.usersMeList({
        headers: { Authorization: `Bearer ${authToken.value}` },
      })

      console.log('here as well')
      console.log(userResponse)

      if (userResponse.ok) {
        currentUser.value = userResponse.data
      } else {
        responseError.value = userResponse.error
      }
    } else {
      responseError.value = authResponse.error
    }
  } catch (e: unknown) {
    if (isProblemDetails(e)) {
      const error = e as ProblemDetails

      console.error(error) // eslint-disable-line no-console
      responseError.value = error
    }
  } finally {
    responseLoading.value = false
  }

  return {
    error: responseError.value,
    loading: responseLoading.value,
  }
}

export default useLoginUser
