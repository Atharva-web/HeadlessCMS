import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <>
            <h1>User Management Admin</h1>
            <div style={{display: "flex", gap: "10px"}}>
                <NavLink to = "/entityForm">Entity Form</NavLink>
                <NavLink to = "/dataForm">Data Form</NavLink>
                <NavLink to = "/displayEntities">Entities</NavLink>
            </div>
            <hr />
        </>
    );
}