import { api } from '../../api-client'

type SignInWithGithubRequestParams = {
  code: string
}

type SignInWithGithubRequestResponse = {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
  token: string
}

export async function signInWithGithubRequest({
  code,
}: SignInWithGithubRequestParams): Promise<SignInWithGithubRequestResponse> {
  const result = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGithubRequestResponse>()

  return result
}
