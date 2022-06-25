import { CSSProperties } from 'react'
import InvHexColor from '../lib/InvHexColor'

export default function GlassPane(props: { children: JSX.Element | JSX.Element[], fallbackColor: string }) {

    const acrylicFallback: CSSProperties = {
        background: props.fallbackColor,
        color: InvHexColor(props.fallbackColor)
    }

    return (
        <div style={acrylicFallback} className='acrylic rounded-5 p-3'>
            {props.children}
        </div>)
}