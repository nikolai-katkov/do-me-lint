import type { Rule } from '../../lib/eslint/rulesConfig'
import { projectHas } from '../../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  'jsx-a11y/alt-text': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/anchor-has-content': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/anchor-is-valid': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/aria-activedescendant-has-tabindex': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/aria-props': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/aria-proptypes': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/aria-role': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/aria-unsupported-elements': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/autocomplete-valid': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/click-events-have-key-events': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/heading-has-content': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/html-has-lang': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/iframe-has-title': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/img-redundant-alt': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/interactive-supports-focus': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/label-has-associated-control': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/media-has-caption': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/mouse-events-have-key-events': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-access-key': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-autofocus': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-distracting-elements': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-interactive-element-to-noninteractive-role': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-noninteractive-element-interactions': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-noninteractive-element-to-interactive-role': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-noninteractive-tabindex': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-onchange': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-redundant-roles': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/no-static-element-interactions': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/role-has-required-aria-props': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/role-supports-aria-props': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/scope': {
    enabled: projectHas('react'),
  },
  'jsx-a11y/tabindex-no-positive': {
    enabled: projectHas('react'),
  },
}
