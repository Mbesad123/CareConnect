let app

export function initializeFirebase(config = {}) {
  if (app) return app
  if (!Object.keys(config).length) {
    console.warn('Firebase config is not provided. Falling back to mock implementation.')
    app = { initialized: false }
    return app
  }
  // Placeholder for actual firebase/app initialization
  app = { initialized: true, config }
  return app
}

export function getFirebaseApp() {
  if (!app) {
    throw new Error('Firebase has not been initialized. Call initializeFirebase first.')
  }
  return app
}
