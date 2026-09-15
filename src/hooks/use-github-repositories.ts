import { useCallback, useEffect, useState } from 'react'

import { fetchLatestRepositories, type Repository } from '@/services/github'

type Status = 'loading' | 'success' | 'error'

type State = {
  status: Status
  repositories: Repository[]
}

const INITIAL_STATE: State = { status: 'loading', repositories: [] }

export function useGitHubRepositories(limit = 5) {
  const [state, setState] = useState<State>(INITIAL_STATE)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    fetchLatestRepositories(limit, controller.signal)
      .then((repositories) => {
        if (!active) return
        setState({ status: 'success', repositories })
      })
      .catch((error: unknown) => {
        if (!active || controller.signal.aborted) return
        console.error('Failed to load repositories from GitHub.', error)
        setState({ status: 'error', repositories: [] })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [limit, attempt])

  const retry = useCallback(() => {
    setState(INITIAL_STATE)
    setAttempt((value) => value + 1)
  }, [])

  return { ...state, retry }
}
