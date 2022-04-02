import { execSync } from 'child_process'
import latestVersion from 'latest-version'

import * as log from '../../util/log'
import type { DependencyManager, InstalledPackage } from '../context/dependencies'

async function getDependenciesToUpdate(
  eslintDependencies: string[],
  installedPackages: InstalledPackage[]
) {
  const dependenciesToUpdate: string[] = []
  const devDependenciesToUpdate: string[] = []

  for (const eslintDependency of eslintDependencies) {
    const installedPackage = installedPackages.find(pkg => pkg.name === eslintDependency)

    if (installedPackage?.version !== (await latestVersion(eslintDependency))) {
      if (installedPackage === undefined || installedPackage.isDev) {
        devDependenciesToUpdate.push(eslintDependency)
      } else {
        dependenciesToUpdate.push(eslintDependency)
      }
    }
  }
  return {
    dependenciesToUpdate,
    devDependenciesToUpdate,
  }
}

interface InstallDependenciesParameters {
  dependenciesToUpdate: string[]
  devDependenciesToUpdate: string[]
  cwd: string
  debug: boolean
}

const installNpmDependencies = (parameters: InstallDependenciesParameters): void => {
  const { dependenciesToUpdate, devDependenciesToUpdate, cwd, debug } = parameters
  const dependencyList = dependenciesToUpdate.map(dependency => `${dependency}@latest`).join(' ')
  const developmentDependencyList = devDependenciesToUpdate
    .map(dependency => `${dependency}@latest`)
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
  const dependencyList = dependenciesToUpdate.map(dependency => `${dependency}@latest`).join(' ')
  const developmentDependencyList = devDependenciesToUpdate
    .map(dependency => `${dependency}@latest`)
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

interface Parameters {
  dependencyManager?: DependencyManager
  eslintDependencies: string[]
  installedPackages: InstalledPackage[]
  cwd: string
  debug: boolean
}
export const installDependencies = async (parameters: Parameters) => {
  const { dependencyManager, eslintDependencies, installedPackages, cwd, debug } = parameters
  const { dependenciesToUpdate, devDependenciesToUpdate } = await getDependenciesToUpdate(
    eslintDependencies,
    installedPackages
  )

  const allDependencies = [...dependenciesToUpdate, ...devDependenciesToUpdate]

  if (allDependencies.length === 0) {
    log.debug('all dependencies are up to date')
    return
  }
  log.debug(`dependencies to install or update: ${allDependencies.join(', ')}`)

  if (!dependencyManager) {
    execSync('npm init -y', { cwd, stdio: debug ? 'inherit' : 'ignore' })
    installNpmDependencies({
      dependenciesToUpdate,
      devDependenciesToUpdate,
      cwd,
      debug,
    })
  } else if (dependencyManager === 'npm') {
    installNpmDependencies({
      dependenciesToUpdate,
      devDependenciesToUpdate,
      cwd,
      debug,
    })
  } else {
    installYarnDependencies({
      dependenciesToUpdate,
      devDependenciesToUpdate,
      cwd,
      debug,
    })
  }
}
