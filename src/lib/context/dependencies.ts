import type { LockFileObject } from '@yarnpkg/lockfile'
import { parse as parseYarnLock } from '@yarnpkg/lockfile'
import fs from 'fs'
import path from 'path'
import type { PackageJson } from 'type-fest'

import type { PackageLock } from '../../types/packageLock'
import { fileExists } from '../../util/file'

export type DependencyManager = 'npm' | 'yarn'

export interface InstalledPackage {
  name: string
  version: string
  isDev: boolean
}

const getNpmPackages = (projectDirectory: string): InstalledPackage[] => {
  const installedPackages: InstalledPackage[] = []
  const packageLockRaw = fs.readFileSync(path.join(projectDirectory, 'package-lock.json'), 'utf-8')
  const packageLock = JSON.parse(packageLockRaw) as PackageLock
  for (const packageName in packageLock.dependencies) {
    if (Object.prototype.hasOwnProperty.call(packageLock.dependencies, packageName)) {
      const dependencyInfo = packageLock.dependencies[packageName]
      installedPackages.push({
        name: packageName,
        isDev: Boolean(dependencyInfo.dev) || Boolean(dependencyInfo.devOptional),
        version: dependencyInfo.version,
      })
    }
  }
  return installedPackages
}

const getYarnPackages = (
  packageJson: PackageJson,
  projectDirectory: string
): InstalledPackage[] => {
  const installedPackages: InstalledPackage[] = []
  const yarnLockRaw = fs.readFileSync(path.join(projectDirectory, 'yarn.lock'), 'utf-8')
  const lockFileObject = parseYarnLock(yarnLockRaw).object as LockFileObject
  for (const dependencyWithVersion in lockFileObject) {
    if (Object.prototype.hasOwnProperty.call(lockFileObject, dependencyWithVersion)) {
      const match = dependencyWithVersion.match(/^(?<package>.*?)@[^@]+$/u)
      if (match?.groups) {
        const packageName = match.groups.package

        installedPackages.push({
          name: packageName,
          isDev: packageJson.devDependencies
            ? Object.keys(packageJson.devDependencies).includes(packageName)
            : false,
          version: lockFileObject[dependencyWithVersion].version,
        })
      }
    }
  }
  return installedPackages
}

interface GetInstalledPackagesParameters {
  packageJson: PackageJson
  dependencyManager: DependencyManager
  projectDirectory: string
}

export const getInstalledPackages = (
  parameters: GetInstalledPackagesParameters
): InstalledPackage[] => {
  const { packageJson, dependencyManager, projectDirectory } = parameters
  let installedPackages: InstalledPackage[] = []
  installedPackages =
    dependencyManager === 'npm'
      ? getNpmPackages(projectDirectory)
      : getYarnPackages(packageJson, projectDirectory)
  return installedPackages
}

export const getDependencyManager = (projectDirectory: string): DependencyManager | undefined => {
  if (fileExists(path.join(projectDirectory, 'package-lock.json'))) {
    return 'npm'
  } else if (fileExists(path.join(projectDirectory, 'yarn.lock'))) {
    return 'yarn'
  }
  return undefined
}

export const getPackageJson = (projectDirectory: string): PackageJson | undefined => {
  const fileName = path.join(projectDirectory, 'package.json')
  try {
    const packageJsonRaw = fs.readFileSync(fileName, 'utf-8')
    return JSON.parse(packageJsonRaw) as PackageJson
  } catch (error: unknown) {
    return undefined
  }
}
