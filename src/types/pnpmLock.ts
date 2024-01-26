import type { JsonObject } from 'type-fest'

export interface PnpmLock {
  lockfileVersion: string
  settingsautoInstallPeers: {
    autoInstallPeers: boolean
    excludeLinksFromLockfile: boolean
  }
  importers?: Record<
    string,
    {
      dependencies: Record<string, PackageDescriptor>
      devDependencies: Record<string, PackageDescriptor>
    }
  >
  packages: Record<
    string,
    {
      resolution: {
        integrity: string
      }
      engines?: Record<string, string>
      transitivePeerDependencies?: string[]
      dependencies?: Record<string, string>
      peerDependencies?: Record<string, string>
      peerDependenciesMeta?: Record<string, JsonObject>
      cpu?: string[]
      os?: string[]
      hasBin?: boolean
      requiresBuild?: boolean
      dev: boolean
    }
  >
  dependencies?: Record<
    string,
    {
      specifier: string
      version: string
    }
  >
  devDependencies?: Record<
    string,
    {
      specifier: string
      version: string
    }
  >
}

interface PackageDescriptor {
  specifier: string
  version: string
}
