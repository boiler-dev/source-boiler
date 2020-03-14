import { basename } from "path"
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
    sourcePath: "tsignore/index.ts",
    path: "src/index.ts",
    bin: true,
    modify: (src: string) =>
      src.replace(/\sClassName/g, " " + answers.className),
  })

  return actions
}

export const absorb: ActionBoiler = async ({
  answers,
  writes,
}) => {
  return writes.map(({ path, sourcePath }) => ({
    action: "write",
    sourcePath: path,
    path: sourcePath,
    modify: (src: string): string =>
      src.replace(
        new RegExp(`\\s${answers.className}`, "g"),
        " ClassName"
      ),
  }))
}
