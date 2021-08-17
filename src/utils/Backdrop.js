export const Backdrop = ({show,children,onClick}) => {
    return show ? (
        <div className="backdrop" onClick={onClick}>
            {children}
        </div>
    ) : ""
}