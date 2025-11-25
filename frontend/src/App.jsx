import { useEffect, useState } from "react";

function App() {
    const [characters, setCharacters] = useState([]);
    const [players, setPlayers] = useState([]);
    const [playerWinRates, setPlayerWinRates] = useState({});
    const [playerGames, setPlayerGames] = useState({});

    const [winningPlayer, setWinningPlayer] = useState("");
    const [winningCharacter, setWinningCharacter] = useState("");
    const [losingPlayer, setLosingPlayer] = useState("");
    const [losingCharacter, setLosingCharacter] = useState("");
    const [message, setMessage] = useState("");

    // Helper function to fetch stats for a list of players
    const fetchPlayerStats = async (playerList) => {
        const newWinRates = { ...playerWinRates };
        const newGames = { ...playerGames };

        for (const player of playerList) {
            const [winRateRes, totalGamesRes] = await Promise.all([
                fetch(`https://smash-wins-counter-production.up.railway.app/wins/winrate/${player}`),
                fetch(`https://smash-wins-counter-production.up.railway.app/wins/totals/${player}`)
            ]);
            newWinRates[player] = await winRateRes.json();
            newGames[player] = await totalGamesRes.json();
        }

        setPlayerWinRates(newWinRates);
        setPlayerGames(newGames);
    };

    // Initial load
    useEffect(() => {
        async function loadAll() {
            const charRes = await fetch("https://smash-wins-counter-production.up.railway.app/wins/characters");
            const charData = await charRes.json();
            setCharacters(charData);
            setWinningCharacter(charData[0]?.name || "");
            setLosingCharacter(charData[0]?.name || "");

            const playerRes = await fetch("https://smash-wins-counter-production.up.railway.app/wins/players");
            const playerData = await playerRes.json();
            setPlayers(playerData);

            await fetchPlayerStats(playerData);
        }

        loadAll();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const win = { winningPlayer, winningCharacter, losingPlayer, losingCharacter };

        try {
            const res = await fetch("https://smash-wins-counter-production.up.railway.app/wins/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(win)
            });

            if (!res.ok) throw new Error("Failed to add win");

            const data = await res.json();
            setMessage(`${data.winningPlayer} (${data.winningCharacter}) beat ${data.losingPlayer} (${data.losingCharacter})`);

            // Reset inputs
            setWinningPlayer("");
            setLosingPlayer("");
            setWinningCharacter(characters[0]?.name || "");
            setLosingCharacter(characters[0]?.name || "");

            // Update stats only for the affected players
            await fetchPlayerStats([data.winningPlayer, data.losingPlayer]);

            // Ensure new players are added to the list
            setPlayers(prev => {
                const newSet = new Set([...prev, data.winningPlayer, data.losingPlayer]);
                return Array.from(newSet);
            });

        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            fontFamily: "Arial, sans-serif",
            padding: "2rem",
        }}>
            <h1 style={{ color: "#fff", marginBottom: "2rem", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>Add a Win</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    backdropFilter: "blur(15px)",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    padding: "2rem",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    width: "100%",
                    maxWidth: "600px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                }}
            >
                {/* Winning Player */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#fff", marginBottom: "0.5rem" }}>Winning Player</label>
                    <input
                        type="text"
                        value={winningPlayer}
                        onChange={(e) => setWinningPlayer(e.target.value)}
                        list="players-list"
                        placeholder="Enter or select player"
                        required
                        style={{
                            padding: "14px",
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "1rem",
                            outline: "none",
                        }}
                    />
                    <datalist id="players-list">
                        {players.map(player => <option key={player} value={player} />)}
                    </datalist>
                </div>

                {/* Winning Character */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#fff", marginBottom: "0.5rem" }}>Winning Character</label>
                    <select
                        value={winningCharacter}
                        onChange={(e) => setWinningCharacter(e.target.value)}
                        style={{
                            padding: "14px",
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "1rem",
                            outline: "none",
                        }}
                    >
                        {characters.map(char => (
                            <option key={char.name} value={char.name}>{char.displayName}</option>
                        ))}
                    </select>
                </div>

                {/* Losing Player */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#fff", marginBottom: "0.5rem" }}>Losing Player</label>
                    <input
                        type="text"
                        value={losingPlayer}
                        onChange={(e) => setLosingPlayer(e.target.value)}
                        list="players-list"
                        placeholder="Enter or select player"
                        required
                        style={{
                            padding: "14px",
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "1rem",
                            outline: "none",
                        }}
                    />
                </div>

                {/* Losing Character */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#fff", marginBottom: "0.5rem" }}>Losing Character</label>
                    <select
                        value={losingCharacter}
                        onChange={(e) => setLosingCharacter(e.target.value)}
                        style={{
                            padding: "14px",
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "1rem",
                            outline: "none",
                        }}
                    >
                        {characters.map(char => (
                            <option key={char.name} value={char.name}>{char.displayName}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "14px",
                        borderRadius: "12px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        background: "rgba(255,255,255,0.25)",
                        color: "#fff",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(5px)"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                >
                    Add Win
                </button>
            </form>

            {message && <p style={{ color: "#fff", marginTop: "1rem", textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}>{message}</p>}

            <h2 style={{ color: "#fff", marginTop: "3rem", textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}>Player Win Rates</h2>

            <table
                border="0"
                cellPadding="10"
                style={{
                    marginTop: "1rem",
                    borderCollapse: "separate",
                    borderSpacing: "0 10px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    color: "#fff",
                    minWidth: "400px",
                    textAlign: "center",
                }}
            >
                <thead>
                <tr>
                    <th style={{ padding: "10px" }}>Player</th>
                    <th>Win Rate</th>
                    <th>Total Games</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr key={player} style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                        <td>{player}</td>
                        <td>{playerWinRates[player] != null ? (playerWinRates[player] * 100).toFixed(0) + "%" : "Loading..."}</td>
                        <td>{playerGames[player] != null ? playerGames[player] : "Loading..."}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
