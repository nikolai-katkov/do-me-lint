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
}

const installNpmDependencies = (parameters: InstallDependenciesParameters): void => {
  const { outdatedDependencies, outdatedDevelopmentDependencies } = parameters
  const dependencyList = outdatedDependencies.map(dependency => `${dependency}@latest`).join(' ')
  const developmentDependencyList = outdatedDevelopmentDependencies
    .map(dependency => `${dependency}@latest`)
    .join(' ')

  if (dependencyList) {
    try {
      execSync(`npm i ${dependencyList}`, { stdio: 'ignore' })
    } catch (error: unknown) {
      execSync(`npm i ${dependencyList}`)
    }
  }

  if (developmentDependencyList) {
    try {
      execSync(`npm i -D ${developmentDependencyList}`, { stdio: 'ignore' })
    } catch (error: unknown) {
      execSync(`npm i -D ${developmentDependencyList}`)
    }
  }
}

const installYarnDependencies = (parameters: InstallDependenciesParameters): void => {
  const { outdatedDependencies, outdatedDevelopmentDependencies } = parameters
  const dependencyList = outdatedDependencies.map(dependency => `${dependency}@latest`).join(' ')
  const developmentDependencyList = outdatedDevelopmentDependencies
    .map(dependency => `${dependency}@latest`)
    .join(' ')

  if (dependencyList) {
    try {
      execSync(`yarn add ${dependencyList}`, { stdio: 'ignore' })
    } catch (error: unknown) {
      execSync(`yarn add ${dependencyList}`)
    }
  }

  if (developmentDependencyList) {
    try {
      execSync(`yarn add --dev ${developmentDependencyList}`, { stdio: 'ignore' })
    } catch (error: unknown) {
      execSync(`yarn add --dev ${developmentDependencyList}`)
    }
  }
}

interface Parameters {
  dependencyManager?: DependencyManager
  eslintDependencies: string[]
  installedPackages: InstalledPackage[]
}
const installDependencies = async ({
  dependencyManager,
  eslintDependencies,
  installedPackages,
}: Parameters) => {
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
    execSync('npm init -y', { stdio: 'ignore' })
    installNpmDependencies({ outdatedDependencies, outdatedDevelopmentDependencies })
  } else if (dependencyManager === 'npm') {
    installNpmDependencies({ outdatedDependencies, outdatedDevelopmentDependencies })
  } else {
    installYarnDependencies({ outdatedDependencies, outdatedDevelopmentDependencies })
  }
}

export default installDependencies
