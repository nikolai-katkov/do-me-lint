import { execSync } from 'child_process'

import type { ExactDependency } from '../../types/eslint'
import * as log from '../../util/log'
import type { DependencyManager, InstalledPackage } from '../context/dependencies'

function getDependenciesToUpdate(
  dependencies: ExactDependency[],
  installedPackages: InstalledPackage[]
) {
  const dependenciesToUpdate: ExactDependency[] = []
  const devDependenciesToUpdate: ExactDependency[] = []

  for (const exactDependency of dependencies) {
    const [dependencyName, version] = exactDependency
    const installedPackage = installedPackages.find(pkg => pkg.name === dependencyName)

    if (installedPackage?.version !== version) {
      if (installedPackage === undefined || installedPackage.isDev) {
        devDependenciesToUpdate.push(exactDependency)
      } else {
        dependenciesToUpdate.push(exactDependency)
      }
    }
  }
  return {
    dependenciesToUpdate,
    devDependenciesToUpdate,
  }
}

interface InstallDependenciesParameters {
  dependenciesToUpdate: ExactDependency[]
  devDependenciesToUpdate: ExactDependency[]
  cwd: string
  debug: boolean
}

const installNpmDependencies = (parameters: InstallDependenciesParameters): void => {
  const { dependenciesToUpdate, devDependenciesToUpdate, cwd, debug } = parameters
  const dependencyList = dependenciesToUpdate
    .map(([dependency, version]) => `${dependency}@${version}`)
    .join(' ')
  const developmentDependencyList = devDependenciesToUpdate
    .map(([dependency, version]) => `${dependency}@${version}`)
    .join(' ')

  if (dependencyList) {
    execSync(`npm i ${dependencyList}`, { cwd, stdio: debug ? 'inherit' : 'ignore' })
  }

  if (developmentDependencyList) {
    execSync(`npm i -D ${developmentDependencyList}`, { cwd, stdio: debug ? 'inherit' : 'ignore' })
  }
}

const installYarnDependencies = (parameters: InstallDependenciesParameters): void => {
  const { dependenciesToUpdate, devDependenciesToUpdate, cwd, debug } = parameters
  const dependencyList = dependenciesToUpdate
    .map(([dependency, version]) => `${dependency}@${version}`)
    .join(' ')
  const developmentDependencyList = devDependenciesToUpdate
    .map(([dependency, version]) => `${dependency}@${version}`)
    .join(' ')

  if (dependencyList) {
    execSync(`yarn add ${dependencyList}`, { cwd, stdio: debug ? 'inherit' : 'ignore' })
  }

  if (developmentDependencyList) {
    execSync(`yarn add --dev ${developmentDependencyList}`, {
      cwd,
      stdio: debug ? 'inherit' : 'ignore',
    })
  }
}

const installPnpmDependencies = (parameters: InstallDependenciesParameters): void => {
  const { dependenciesToUpdate, devDependenciesToUpdate, cwd, debug } = parameters
  const dependencyList = dependenciesToUpdate
    .map(([dependency, version]) => `${dependency}@${version}`)
    .join(' ')
  const developmentDependencyList = devDependenciesToUpdate
    .map(([dependency, version]) => `${dependency}@${version}`)
    .join(' ')

  if (dependencyList) {
    execSync(`pnpm add ${dependencyList} -w`, { cwd, stdio: debug ? 'inherit' : 'ignore' })
  }

  if (developmentDependencyList) {
    execSync(`pnpm add -D ${developmentDependencyList} -w`, {
      cwd,
      stdio: debug ? 'inherit' : 'ignore',
    })
  }
}

interface Parameters {
  dependencyManager?: DependencyManager
  dependencies: ExactDependency[]
  installedPackages: InstalledPackage[]
  cwd: string
  debug: boolean
}
export const installDependencies = (parameters: Parameters) => {
  const { dependencyManager, dependencies, installedPackages, cwd, debug } = parameters
  const { dependenciesToUpdate, devDependenciesToUpdate } = getDependenciesToUpdate(
    dependencies,
    installedPackages
  )

  const allDependencies = [...dependenciesToUpdate, ...devDependenciesToUpdate]

  if (allDependencies.length === 0) {
    log.debug('all dependencies are up to date')
    return
  }

  const readableDependencyList = allDependencies
    .map(([dependency, version]) => `${dependency}@${version}`)
    .join(', ')

  log.debug(`dependencies to install or update: ${readableDependencyList}`)

  switch (dependencyManager) {
    case 'npm': {
      installNpmDependencies({
        dependenciesToUpdate,
        devDependenciesToUpdate,
        cwd,
        debug,
      })

      break
    }
    case 'yarn': {
      installYarnDependencies({
        dependenciesToUpdate,
        devDependenciesToUpdate,
        cwd,
        debug,
      })

      break
    }
    case 'pnpm': {
      installPnpmDependencies({
        dependenciesToUpdate,
        devDependenciesToUpdate,
        cwd,
        debug,
      })

      break
    }
    default: {
      execSync('npm init -y', { cwd, stdio: debug ? 'inherit' : 'ignore' })
      installNpmDependencies({
        dependenciesToUpdate,
        devDependenciesToUpdate,
        cwd,
        debug,
      })
    }
  }
}
