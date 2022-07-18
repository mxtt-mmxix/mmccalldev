import { CSSProperties } from 'react'
import InvHexColor from '../../lib/InvHexColor'
import InvHexShadow from '../../lib/InvHexShadow'
import GlassStyle from './glass.module.css'

export default function GlassPane(props: { children: JSX.Element | JSX.Element[], fallbackColor: string, quiet?: boolean }) {

    const acrylicFallback: CSSProperties = {
        background: props.fallbackColor,
        color: InvHexColor(props.fallbackColor),
        textShadow: InvHexShadow(props.fallbackColor)
    }

    return (
        <div style={acrylicFallback} className={`${props.quiet ? GlassStyle['acrylic-quiet'] : GlassStyle['acrylic']} rounded overflow-hidden h-100 shadow`}>
            {props.children}
        </div>)
}