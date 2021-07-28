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
- Rules are managed in a Google spreadsheet
- Rules are finely selected for you from the [best plugins](#supported-eslint-plugins)
- Your projects gets only relevant rules, e.g. you get Typescript plugin and rules only if you have typescript as a dependency
- All ESlint configuration is stored in a single `.eslintrc.yml` file. DoMeLint ensures there are no conflicting configurations. No extended, recommended or nested configurations - what you see is what you get.
- No configuration needed
- Still fully flexible: you can specify your file patterns, disable rules that are not worth fixing (see [configuration](#configuration) section), and have completely own, team- or company-wide spreadsheet (see [forking](#forking-the-rules-spreadsheet) section)
- Supports new projects and existing codebases
- Automatically updates linting dependencies using your project's dependency manager, Yarn or NPM
- Supports monorepos - configures IDE once for the whole repo while keeping linting configurations per project

## Usage

```bash
cd [path-to-your-project]
npx do-me-lint
```

<details>
<summary>What you'll see</summary>
<p>

![DoMeLint in action](https://raw.githubusercontent.com/nikolai-katkov/do-me-lint/master/docs/in-action.png)

</p>
</details>

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

| Setting in `.domelintrc.yml`                     | Description                                                     | Default                                                                                                                                                                                                            | Environment variable                                          |
| ------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| spreadsheet<br> <small>`string`</small>          | Spreadsheet URL (displayed in the script output)                | <small>`https://docs.google.com/spreadsheets/`<br>`d/149ecBpNj1mfgTKlCcVwxdKbi5VDNeJdsVW-`<br>`c2Y62z9k/edit#gid=1499443148` </small>                                                                              | DML_SPREADSHEET <br> <small>`string`</small>                  |
| spreadsheetCsv<br> <small>`string`</small>       | Spreadsheet CSV <br> (for fetching rules)                       | <small>`https://docs.google.com/spreadsheets/`<br>`d/e/2PACX-1vS0YEIZpNgczI9Y0J6r59onLdrh`<br>`OXLv866Oz9CkhNByDiz5tl-dAABu`<br>`5edZPlTchTeG4m6Gg-lJmYPX/pub`<br>`?gid=1499443148&single=true&output=csv`</small> | DML_SPREADSHEET_CSV <br> <small>`string`</small>              |
| semi <br> <small>`boolean`</small>               | Force semicolons to be required (`true`) or forbidden (`false`) |                                                                                                                                                                                                                    | DML_SEMI <br> <small>`"1"` (other values are false)</small>   |
| ignoredRules <br> <small>`Array<string>`</small> | Ignored rules <br> <small>will be not added</small>             |                                                                                                                                                                                                                    | DML_IGNORED_RULES<br> <small>`comma-separated string`</small> |
| jestFiles<br> <small>`string`</small>            | Pattern for Jest specs                                          | <small> `src/**/{__tests__/*,*.{spec,test}}`<br>`.{js,ts,jsx,tsx}`</small>                                                                                                                                         | DML_JEST_FILES <br> <small>`string`</small>                   |
| —                                                | Extended debug info                                             |                                                                                                                                                                                                                    | DML_DEBUG <br> <small>`"1"` (other values are false)</small>  |

Your `.domelintrc.yml` may look like this:

<img src="https://raw.githubusercontent.com/nikolai-katkov/do-me-lint/master/docs/domelintrc-example.png" width="500">

## Supported ESLint plugins

- [Typescript](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
- [array-func](https://github.com/freaktechnik/eslint-plugin-array-func)
- [Jest](https://github.com/jest-community/eslint-plugin-jest)
- [JSX a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [Promise](https://github.com/xjamundx/eslint-plugin-promise)
- [React](https://github.com/yannickcr/eslint-plugin-react)
- [React hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)
- [Simple import sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [SonarJS](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [YAML](https://github.com/ota-meshi/eslint-plugin-yml)

## Google Sheets as a source of truth

![Spreadsheet](https://raw.githubusercontent.com/nikolai-katkov/do-me-lint/master/docs/spreadsheet.png)

### Motivation to use Google Sheets

- More illustrative than any configuration format
- Easy to export: no API keys
- Easy to update: auto-save, no need to commit
- Inherent Google Sheets features: change history, comments, custom styling, sorting, filtering

### Forking the rules spreadsheet

You want to create your own spreadsheet if

- You have your own (or team) guidelines that go against the default spreadsheet
- You need to make sure the rule selection doesn't change in the future
- You forked the repo to add custom logic and now want to add/modify meaning of the columns

You **don't** want to create your own spreadsheet if

- do-me-lint reported too many warnings that are not worth fixing. Use `ignoredRules` [setting](#configuration) instead.
- you see that some rule in the default spreadsheet doesn't make sense, or missing, or broken. Open an [issue](https://github.com/nikolai-katkov/do-me-lint/issues) instead.

#### Steps to fork the spreadsheet

1. Open a [source](https://docs.google.com/spreadsheets/d/149ecBpNj1mfgTKlCcVwxdKbi5VDNeJdsVW-c2Y62z9k/edit#gid=1499443148) spreadsheet
2. Clone it by selecting menu `File` -> `Make a copy`
3. Make any changes, add rules, enable/disable desired rules etc.
4. Export as CSV via `File` -> `Publish to the web`: <br /><img src="https://raw.githubusercontent.com/nikolai-katkov/do-me-lint/master/docs/csv-publish.png" width="300"/>
5. Configure spreadsheet and CSV URLs as stated in [configuration](#configuration) section
