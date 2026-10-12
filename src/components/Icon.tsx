import type { IconProps } from "@@/formatting/interfaces"

export default function Icon({ src, alt = "Icon", id }: IconProps) {

    return (
        <img src={src} id={id != undefined ? String(id) : ""} loading="lazy" alt={alt} draggable={false} className="w-[5rem] h-[5rem]"/>
    )
}