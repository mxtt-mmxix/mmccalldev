import { CSSProperties } from 'react'
import InvHexColor from '../lib/InvHexColor'

export default function GlassButton(props: { children: JSX.Element, fallbackColor: string }) {

    const acrylicFallback: CSSProperties = {
        background: props.fallbackColor,
        color: InvHexColor(props.fallbackColor)
    }

    return (
        <button type='button' style={acrylicFallback} className='btn rounded-circle acrylic shadow'>
            {props.children}
        </button>)
}