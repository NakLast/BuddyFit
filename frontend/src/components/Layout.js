import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/situp">SitUp</Link>
                    </li>
                    <li>
                        <Link to="/pushup">PushUp</Link>
                    </li>
                    <li>
                        <Link to="/squat">Squat</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;