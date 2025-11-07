# Public Assets Folder

This folder contains static assets that are served directly by the web server.

## Logo Image

Place your logo image file here with the name: **`logo.png`**

### Supported Formats:
- PNG (recommended)
- SVG
- JPG/JPEG
- WEBP

### File Location:
```
frontend/public/logo.png
```

### Usage:
The logo will be automatically loaded from `/logo.png` in the Logo component.

### Recommended Logo Specifications:
- **Format**: PNG with transparency (or SVG)
- **Size**: 200px width (height will scale proportionally)
- **Aspect Ratio**: Any (will be contained within max dimensions)
- **Background**: Transparent (recommended)

### Alternative File Names:
If you want to use a different filename, update the `src` attribute in:
`frontend/src/components/Logo.jsx`

Change this line:
```jsx
src="/logo.png"
```

To your filename, for example:
```jsx
src="/covidvax-logo.svg"
```

