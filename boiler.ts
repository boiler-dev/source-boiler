import { PromptBoiler, GenerateBoiler } from "boiler-dev"

import { basename, join } from "path"

export const prompt: PromptBoiler = async ({
  rootDirPath,
}) => {
  const prompts = []

  prompts.push({
    type: "input",
    name: "className",
    message: "class name (CamelCase)",
    default: basename(rootDirPath).replace(
      /-([a-z])/gi,
      g => g[1].toUpperCase()
    ),
  })

  return prompts
}

export const generate: GenerateBoiler = async ({
  answers,
  files,
  rootDirPath,
}) => {
  const actions = []

  for (const file of files) {
    const { name, source } = file

    if (name === "index.ts") {
      actions.push({
        action: "write",
        path: join(rootDirPath, name),
        source: source.replace(
          /\sClassName/g,
          answers.className
        ),
        bin: true,
      })
    }
  }

  return actions
}
