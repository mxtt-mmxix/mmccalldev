import { Random } from "unsplash-js/dist/methods/photos/types"
import hex_inverse_bw from "../lib/InvHexColor"
import GlassPane from "./GlassPane"

interface WallpaperProps {
    wallpaper: Random,
    children?: JSX.Element | JSX.Element[]
}

export default function Wallpaper({ wallpaper, children }: WallpaperProps) {
    return (
        <div style={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${wallpaper.urls.full})`,
            backgroundAttachment: 'fixed',
            color: hex_inverse_bw(wallpaper.color as string)
        }} className='d-flex flex-column min-vh-100 vw-100 container-fluid'>
            <div className='container-fluid p-3 opacity-75 sticky-top'>
                <div className="d-inline-flex">
                    <GlassPane fallbackColor={wallpaper.color as string}>
                        <small className="m-2">Photo by &nbsp;
                            <a href={wallpaper.links.html} className="text-reset">
                                {wallpaper.user.name}
                            </a>
                            &nbsp; on <a className="text-reset" href="https://unsplash.com">Unsplash</a>
                        </small>
                    </GlassPane>
                </div>
            </div>
            <div className="flex-grow-1 row">
                <div className="my-auto">
                    {children}
                </div>
            </div>
            <div className="p-3">&nbsp;</div> {/** Bottom div that's the same height as attribution to maintain centered look  */}
        </div>
    )
}