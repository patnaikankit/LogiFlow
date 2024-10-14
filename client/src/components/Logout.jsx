export default function Logout() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}