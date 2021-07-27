import { execSync } from 'child_process'
import latestVersion from 'latest-version'

import log from '../../util/log'
import type { DependencyManager, InstalledPackage } from '../context/dependencies'

async function getOutdatedDependencies(
  eslintDependencies: string[],
  installedPackages: InstalledPackage[]
) {
  const outdatedDependencies: string[] = []
  const outdatedDevelopmentDependencies: string[] = []

  for (const eslintDependency of eslintDependencies) {
    const installedPackage = installedPackages.find(pkg => pkg.name === eslintDependency)

    if (installedPackage?.version !== (await latestVersion(eslintDependency))) {
      if (installedPackage === undefined || installedPackage.isDev) {
        outdatedDevelopmentDependencies.push(eslintDependency)
      } else {
        outdatedDependencies.push(eslintDependency)
      }
    }
  }
  return {
    outdatedDependencies,
    outdatedDevelopmentDependencies,
  }
}

interface InstallDependenciesParameters {
  outdatedDependencies: string[]
  outdatedDevelopmentDependencies: string[]
  debug: boolean
}

const installNpmDependencies = (parameters: InstallDependenciesParameters): void => {
  const { outdatedDependencies, outdatedDevelopmentDependencies, debug } = parameters
  const dependencyList = outdatedDependencies.map(dependency => `${dependency}@latest`).join(' ')
  const developmentDependencyList = outdatedDevelopmentDependencies
    .map(dependency => `${dependency}@latest`)
    .join(' ')

  if (dependencyList) {
    execSync(`npm i ${dependencyList}`, { stdio: debug ? 'inherit' : 'ignore' })
  }

  if (developmentDependencyList) {
    execSync(`npm i -D ${developmentDependencyList}`, { stdio: debug ? 'inherit' : 'ignore' })
  }
}

const installYarnDependencies = (parameters: InstallDependenciesParameters): void => {
  const { outdatedDependencies, outdatedDevelopmentDependencies, debug } = parameters
  const dependencyList = outdatedDependencies.map(dependency => `${dependency}@latest`).join(' ')
  const developmentDependencyList = outdatedDevelopmentDependencies
    .map(dependency => `${dependency}@latest`)
    .join(' ')

  if (dependencyList) {
    execSync(`yarn add ${dependencyList}`, { stdio: debug ? 'inherit' : 'ignore' })
  }

  if (developmentDependencyList) {
    execSync(`yarn add --dev ${developmentDependencyList}`, { stdio: debug ? 'inherit' : 'ignore' })
  }
}

interface Parameters {
  dependencyManager?: DependencyManager
  eslintDependencies: string[]
  installedPackages: InstalledPackage[]
  debug: boolean
}
const installDependencies = async (parameters: Parameters) => {
  const { dependencyManager, eslintDependencies, installedPackages, debug } = parameters
  const { outdatedDependencies, outdatedDevelopmentDependencies } = await getOutdatedDependencies(
    eslintDependencies,
    installedPackages
  )

  const allDependencies = [...outdatedDependencies, ...outdatedDevelopmentDependencies]

  if (allDependencies.length === 0) {
    log.debug('all dependencies are up to date')
    return
  }
  log.debug(`missing / outdated dependencies: ${allDependencies.join(', ')}`)

  if (!dependencyManager) {
    execSync('npm init -y', { stdio: debug ? 'inherit' : 'ignore' })
    installNpmDependencies({ outdatedDependencies, outdatedDevelopmentDependencies, debug })
  } else if (dependencyManager === 'npm') {
    installNpmDependencies({ outdatedDependencies, outdatedDevelopmentDependencies, debug })
  } else {
    installYarnDependencies({ outdatedDependencies, outdatedDevelopmentDependencies, debug })
  }
}

export default installDependencies
