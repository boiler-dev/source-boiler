import { basename, join } from "path"
import { PromptBoiler, GenerateBoiler } from "boiler-dev"

export const prompt: PromptBoiler = async ({ cwdPath }) => {
  const prompts = []

  prompts.push({
    type: "input",
    name: "className",
    message: "class name (CamelCase)",
    default: basename(cwdPath).replace(/-([a-z])/gi, g =>
      g[1].toUpperCase()
    ),
  })

  return prompts
}

export const generate: GenerateBoiler = async ({
  answers,
  files,
  cwdPath,
}) => {
  const actions = []

  for (const file of files) {
    const { name, source } = file

    if (name === "index.ts") {
      actions.push({
        action: "write",
        path: join(cwdPath, "src", name),
        source: source.replace(
          /\sClassName/g,
          " " + answers.className
        ),
        bin: true,
      })
    }
  }

  return actions
}
