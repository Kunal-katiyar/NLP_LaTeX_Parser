import type { IconProps } from "@@/formatting/interfaces"

export default function Icon({ src, alt = "Icon" }: IconProps) {
    return (
        <img src={src} loading="lazy" alt={alt} />
    )
}