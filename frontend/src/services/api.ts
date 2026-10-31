/**
 * Frontend boundary for the future C++ REST API.
 * The backend is intentionally unimplemented in this repository foundation.
 */
export const backendConfig = {
  baseUrl: 'http://127.0.0.1:8080/api',
  connected: false,
}

export class BackendUnavailableError extends Error {
  constructor() {
    super('The FINTRACE C++ backend has not been implemented yet.')
    this.name = 'BackendUnavailableError'
  }
}
