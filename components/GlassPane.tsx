import { CSSProperties } from 'react'
import InvHexColor from '../lib/InvHexColor'
import InvHexShadow from '../lib/InvHexShadow'

export default function GlassPane(props: { children: JSX.Element | JSX.Element[], fallbackColor: string }) {

    const acrylicFallback: CSSProperties = {
        background: props.fallbackColor,
        color: InvHexColor(props.fallbackColor),
        textShadow: InvHexShadow(props.fallbackColor)
    }

    return (
        <div style={acrylicFallback} className='acrylic rounded h-100'>
            {props.children}
        </div>)
}