import "./sidebar.scss";

interface SidebarProps {
    setActiveTab: (tab: string) => void;
}

export default function Sidebar({ setActiveTab}: SidebarProps) {
    return (
        <>
        <div className="sidebar">
            <ul>
                <li onClick={() => setActiveTab("usersteam")}>👾 Profile Steam</li>  
                <li onClick={() => setActiveTab("library")}>🎮 Bibliothèque de jeux</li>  
                <li onClick={() => setActiveTab("achievements")}>🏆 Succès</li>  
                <li onClick={() => setActiveTab("friends")}>👥 Amis</li>  
                <li onClick={() => setActiveTab("settings")}>⚙️ Paramètres</li>  
            </ul>
        </div>
        </>
    )
}