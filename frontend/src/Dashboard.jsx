export default function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div>
            <h2> Bem-vindo ao Dashboard!</h2>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}