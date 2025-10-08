import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          900: "#1a365d",
          800: "#153e75",
          700: "#2a69ac",
        }
      },
    },
  },
})

export const form = {
  colorPalette: 'green'
}
export const tabs = {
  colorPalette: 'green'
}

export const system = createSystem(defaultConfig, config)

export const theme = {
  config,
  form,
  tabs,
  system
}

export default theme
