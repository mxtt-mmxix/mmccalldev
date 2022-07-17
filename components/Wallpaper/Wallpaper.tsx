import { CSSProperties, useEffect, useState } from "react"
import { Random } from "unsplash-js/dist/methods/photos/types"
import hex_inverse_bw from "../../lib/InvHexColor"
import { Pane as GlassPane } from '../Glass'
import VCenter from "../VCenter"
import WallpaperStyles from './wallpaper.module.css'

interface WallpaperProps {
    wallpaper: Random,
    children?: JSX.Element | JSX.Element[]
}

export default function Wallpaper({ wallpaper, children }: WallpaperProps) {

    const style: CSSProperties = {
        backgroundImage: `url(${wallpaper.urls.regular})`,
        color: hex_inverse_bw(wallpaper.color as string)
    }

    return (
        <div style={style} className={`${WallpaperStyles.parallax} d-flex flex-column min-vh-100 vw-100 container-fluid`}>
            <div className="d-inline-flex p-3">
                <GlassPane fallbackColor={wallpaper.color as string}>
                    <small className="m-2">Photo by &nbsp;
                        <a href={wallpaper.links.html} className="text-reset">
                            {wallpaper.user.name}
                        </a>
                        &nbsp; on <a className="text-reset" href="https://unsplash.com">Unsplash</a>
                    </small>
                </GlassPane>
            </div>
            <div className="flex-grow-1 row">
                <VCenter>
                    {children}
                </VCenter>
            </div>
            <div className="p-3">&nbsp;</div>
        </div>
    )
}