export interface PackageLock {
  name: string
  version: string
  lockfileVersion: number
  requires: boolean
  dependencies?: Record<string, PackageDescriptor>
  packages?: Record<string, PackageDescriptor>
}

interface PackageDescriptor {
  version: string
  resolved: string
  integrity: string
  dev?: boolean
  optional?: boolean
  devOptional?: boolean
  requires?: Record<string, string>
  dependencies?: Record<string, string>
  engines?: Record<string, string>
}
