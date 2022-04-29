# DoMeLint

[![tests](https://github.com/nikolai-katkov/do-me-lint/actions/workflows/tests.yml/badge.svg)](https://github.com/nikolai-katkov/do-me-lint/actions/workflows/tests.yml)

## What

CLI tool to make your JS/TS projects linted with ESLint and Prettier for the best possible developer experience.

## For whom

For busy developers who appreciate the benefits of code linting but find it tedious. For those who find themselves in the following situations:

<details>
<summary>See motivation</summary>
<p>

**I spend too much time to read ESLint rule docs.** It indicates that you are not happy with just applying recommended configs. To make a concious choice you have to learn what is considered a warning, how it might conflict with other rules, test all the rule options. **For hundreds of rules.**

**I don't remember why this rule is here.** Is your current config specific to the project? Do you keep track of the reasons to enable or disable a specific rule?

**I'm not sure if a rule is enabled in my config at all.** ESLint configurations work like layers: one recommended config can enable a rule, another one can cancel it, recommended configs are usually extended from some "base" in a tree-like hierarchy. In addition your project config may be impacted by the parent folder config unless you explicitly forbid it.

**I'd like to use modern ESLint plugins, but I have no time to monitor it.** You suspect that ESLint world is awesome, but trying out all these plugins?

**Sometimes I see more than one warning for the same code.** It indicates you have conflicting rules, or some cases are covered by Typescript.

</p>
</details>

## Features

- Configures ESLint, Prettier and your IDE (currently VSCode only)
- Scans your codebase: fixes all fixable ESLint rules and formats all files with Prettier
- Adds all Git-ignored patterns to `.prettierignore` and `.eslintignore`
- Provides you a detailed report of the most common errors
- Rules are finely selected for you from the [best plugins](#supported-eslint-plugins)
- Your projects gets only relevant rules, e.g. you get Typescript plugin and rules only if you have typescript as a dependency
- All ESlint configuration is stored in a single `.eslintrc.yml` file. DoMeLint ensures there are no conflicting configurations. No extended, recommended or nested configurations - what you see is what you get.
- No configuration needed
- Still fully flexible: you can specify your file patterns, disable rules that are not worth fixing , and have completely own, team- or company-wide ruleset (see [configuration](#configuration) section)
- Supports new projects and existing codebases
- Automatically updates linting dependencies using your project's dependency manager, Yarn or NPM
- Supports monorepos - configures IDE once for the whole repo while keeping linting configurations per project

## Usage

```bash
cd [path-to-your-project]
npx do-me-lint
```

### Best practices

You can achieve best results running `do-me-lint` once or periodically if you want to keep the configuration up to date.

It makes sense to keep `.domelintrc.yml` as part of your git repository.

For monorepos you need to run the script from each project's directory.

## Troubleshooting

If there are too many warnings to fix in one go:

- revert the changes
- disable the rules you don't want to fix (see [configuration](#configuration) section, `ignoreRules`)
- apply the command again

If `do-me-lint` throws an error or stops responding at the _"Checking required NPM dependencies"_ step, run it again in the debug mode:

```bash
DML_DEBUG=1 npx do-me-lint
```

## Configuration

`do-me-lint` reads script settings in the following priority:

1. Environment variables
2. Settings in `.domelintrc.yml`
3. Default values

> All settings are optional

| Setting in `.domelintrc.yml`                     | Description                                                     | Default                                                                    | Environment variable                                          |
| ------------------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------- |
| semi <br> <small>`boolean`</small>               | Force semicolons to be required (`true`) or forbidden (`false`) |                                                                            | DML_SEMI <br> <small>`"1"` (other values are false)</small>   |
| ignoredRules <br> <small>`Array<string>`</small> | Ignored rules <br> <small>will be not added</small>             |                                                                            | DML_IGNORED_RULES<br> <small>`comma-separated string`</small> |
| jestFiles<br> <small>`string`</small>            | Pattern for Jest specs                                          | <small> `src/**/{__tests__/*,*.{spec,test}}`<br>`.{js,ts,jsx,tsx}`</small> | DML_JEST_FILES <br> <small>`string`</small>                   |
| —                                                | Extended debug info                                             |                                                                            | DML_DEBUG <br> <small>`"1"` (other values are false)</small>  |

Your `.domelintrc.yml` may look like this:

```yaml
semi: true
ignoredRules:
  - max-params
  - func-names
  - prefer-template
```

## Supported ESLint plugins

- [Typescript](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
- [Simple import sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [React](https://github.com/yannickcr/eslint-plugin-react)
- [React hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)
- [JSX a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [Jest](https://github.com/jest-community/eslint-plugin-jest)
- [SonarJS](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [Promise](https://github.com/xjamundx/eslint-plugin-promise)
- [YAML](https://github.com/ota-meshi/eslint-plugin-yml)
- [array-func](https://github.com/freaktechnik/eslint-plugin-array-func)
- [import](https://github.com/import-js/eslint-plugin-import)
