export default function VCenter(props: { children?: JSX.Element | JSX.Element[] }) {
    return (
        <div className="my-auto">
            {props.children}
        </div>
    )
}