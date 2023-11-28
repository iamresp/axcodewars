declare module '*.svg' {
    import type React from 'react'
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
    export default SVG
}
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}