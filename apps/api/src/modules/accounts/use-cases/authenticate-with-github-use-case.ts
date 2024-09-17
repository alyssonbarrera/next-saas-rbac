import type { User } from '@prisma/client'
import { env } from '@saas/env'
import { z } from 'zod'

import { AppError } from '@/core/errors/app-error'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

import type { AccountsRepository } from '../repositories/accounts-repository'

type AuthenticateWithGithubUseCaseRequest = {
  code: string
}

type AuthenticateWithGithubUseCaseResponse = {
  user: User
}

export class AuthenticateWithGithubUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    code,
  }: AuthenticateWithGithubUseCaseRequest): Promise<AuthenticateWithGithubUseCaseResponse> {
    const githubOAuthURL = new URL(
      'https://github.com/login/oauth/access_token',
    )
    githubOAuthURL.searchParams.append('client_id', env.GITHUB_CLIENT_ID)
    githubOAuthURL.searchParams.append(
      'client_secret',
      env.GITHUB_CLIENT_SECRET,
    )
    githubOAuthURL.searchParams.append('redirect_uri', env.GITHUB_REDIRECT_URI)
    githubOAuthURL.searchParams.append('code', code)

    const githubAccessTokenResponse = await fetch(githubOAuthURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })

    const githubAccessTokenData = await githubAccessTokenResponse.json()

    const { access_token: githubAccessToken } = z
      .object({
        access_token: z.string(),
        token_type: z.literal('bearer'),
        scope: z.string(),
      })
      .parse(githubAccessTokenData)

    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    })

    const githubUserData = await githubUserResponse.json()

    const {
      id: githubId,
      name: githubName,
      email: githubEmail,
      avatar_url: avatarUrl,
    } = z
      .object({
        id: z.number().int().transform(String),
        name: z.string().nullable(),
        email: z.string().email().nullable(),
        avatar_url: z.string().url().nullable(),
      })
      .parse(githubUserData)

    if (!githubEmail) {
      throw new AppError(
        'Your GitHub account must have an email to authenticate',
        400,
      )
    }

    let user = await this.usersRepository.findByEmail(githubEmail)

    if (!user) {
      user = await this.usersRepository.save({
        name: githubName,
        email: githubEmail,
        avatarUrl,
      })
    }

    let account = await this.accountsRepository.findByProviderAndUserId({
      provider: 'GITHUB',
      userId: githubId,
    })

    if (!account) {
      account = await this.accountsRepository.save({
        userId: user.id,
        provider: 'GITHUB',
        providerAccountId: githubId,
      })
    }

    return { user }
  }
}
