/* eslint-disable no-continue */
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

// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
const getNpmPackages = (projectDirectory: string): InstalledPackage[] => {
  const installedPackages: InstalledPackage[] = []
  const packageLockRaw = fs.readFileSync(path.join(projectDirectory, 'package-lock.json'), 'utf8')
  const packageLock = JSON.parse(packageLockRaw) as PackageLock
  if (packageLock.dependencies) {
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
  }
  if (packageLock.packages) {
    for (const packageNameWithPath in packageLock.packages) {
      if (Object.prototype.hasOwnProperty.call(packageLock.packages, packageNameWithPath)) {
        const dependencyInfo = packageLock.packages[packageNameWithPath]
        const packageNameMatch = packageNameWithPath.match(/\/(?<packageName>(?:@.*?\/)?[^/]*?)$/u)
        if (packageNameMatch === null || packageNameMatch.groups === undefined) {
          console.error(packageNameWithPath)
          continue
        }
        const { packageName } = packageNameMatch.groups

        installedPackages.push({
          name: packageName,
          isDev: Boolean(dependencyInfo.dev) || Boolean(dependencyInfo.devOptional),
          version: dependencyInfo.version,
        })
      }
    }
  }
  return installedPackages
}

const getYarnPackages = (
  packageJson: PackageJson,
  projectDirectory: string
): InstalledPackage[] => {
  const installedPackages: InstalledPackage[] = []
  const yarnLockRaw = fs.readFileSync(path.join(projectDirectory, 'yarn.lock'), 'utf8')
  const lockFileObject = parseYarnLock(yarnLockRaw).object as LockFileObject
  for (const dependencyWithVersion in lockFileObject) {
    if (!Object.prototype.hasOwnProperty.call(lockFileObject, dependencyWithVersion)) {
      continue
    }
    const match = dependencyWithVersion.match(/^(?<packageName>.*?)@(?<claimedVersion>[^@]+)$/u)
    if (!match?.groups) {
      continue
    }
    const { packageName, claimedVersion } = match.groups

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    if (allDeps[packageName] === claimedVersion) {
      installedPackages.push({
        name: packageName,
        isDev: packageJson.devDependencies
          ? Object.keys(packageJson.devDependencies).includes(packageName)
          : false,
        version: lockFileObject[dependencyWithVersion].version,
      })
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
    const packageJsonRaw = fs.readFileSync(fileName, 'utf8')
    return JSON.parse(packageJsonRaw) as PackageJson
  } catch (error: unknown) {
    return undefined
  }
}
