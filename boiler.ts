import { basename, join } from "path"
import { PromptBoiler, ActionBoiler } from "boiler-dev"

export const prompt: PromptBoiler = async ({ cwdPath }) => {
  const prompts = []

  prompts.push({
    type: "input",
    name: "className",
    message: "class name (CamelCase)",
    default: `-${basename(cwdPath)}`.replace(
      /-([a-z])/gi,
      g => g[1].toUpperCase()
    ),
  })

  return prompts
}

export const generate: ActionBoiler = async ({
  answers,
}) => {
  const actions = []

  actions.push({
    action: "write",
    source: "tsignore/index.ts",
    path: "src/index.ts",
    bin: true,
    modify: (src: string) =>
      src.replace(/\sClassName/g, " " + answers.className),
  })

  return actions
}
