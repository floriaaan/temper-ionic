import { theme } from "@chakra-ui/core";
import "./temper.scss"

export const temper = {
  ...theme,
  fonts: {
    body: "Nunito, system-ui, sans-serif",
    heading: "Nunito, Georgia, serif",
    mono: "Menlo, monospace",
  }
}