import { CSSProperties } from 'react'
import InvHexColor from '../../lib/InvHexColor'
import GlassStyle from './glass.module.css'

export default function GlassButton(props: { children: JSX.Element, fallbackColor: string }) {

    const acrylicFallback: CSSProperties = {
        background: props.fallbackColor,
        color: InvHexColor(props.fallbackColor)
    }

    return (
        <button type='button' style={acrylicFallback} className={`${GlassStyle.acrylic} btn rounded-circle shadow`}>
            {props.children}
        </button>)
}