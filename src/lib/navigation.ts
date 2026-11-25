const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, '')

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/'
}

export function getAppPath(pathname = window.location.pathname) {
  if (
    appBasePath &&
    (pathname === appBasePath || pathname.startsWith(`${appBasePath}/`))
  ) {
    return normalizePath(pathname.slice(appBasePath.length))
  }

  return normalizePath(pathname)
}

export function getAppHref(pathname: string) {
  const normalizedPath = normalizePath(pathname)
  return `${appBasePath}${normalizedPath}`
}

export function navigateTo(pathname: string) {
  const normalizedPath = normalizePath(pathname)

  if (getAppPath() === normalizedPath) {
    return false
  }

  window.history.pushState({}, '', getAppHref(normalizedPath))
  window.dispatchEvent(new PopStateEvent('popstate'))
  return true
}
