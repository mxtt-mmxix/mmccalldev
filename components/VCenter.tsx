export default function VCenter(props : { children: JSX.Element}) {
    return (
        <div className="row h-100">
            <div className="my-auto">
                {props.children}
            </div>
        </div>
    )
}