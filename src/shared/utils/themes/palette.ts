export type Palette = {
  title: 'light' | 'dark'
  fonts: {
    light: string
    regular: string
    bold: string
  }
  colors: {
    primary: string
    secondary: string
    main: string

    shapes: {
      strong: string
      light: string
    }

    background: string

    texts: {
      strong: string
      medium: string
      light: string
    }

    white: string
    green: string
    red: string
  }
}

export type Theme = {
  palette: Palette
}
