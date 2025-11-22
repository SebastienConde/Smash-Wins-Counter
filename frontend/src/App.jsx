import { useEffect, useState } from "react";

function App() {
    const [characters, setCharacters] = useState([]);
    const [winningPlayer, setWinningPlayer] = useState("");
    const [winningCharacter, setWinningCharacter] = useState("");
    const [losingPlayer, setLosingPlayer] = useState("");
    const [losingCharacter, setLosingCharacter] = useState("");
    const [message, setMessage] = useState("");

    const [players, setPlayers] = useState([]);
    const [playerWinRates, setPlayerWinRates] = useState({});

    // Fetch characters and players on load
    useEffect(() => {
        // Fetch characters
        fetch("https://smash-wins-counter-production.up.railway.app/wins/characters")
            .then(res => res.json())
            .then(data => {
                setCharacters(data);
                setWinningCharacter(data[0]?.name || "");
                setLosingCharacter(data[0]?.name || "");
            });

        // Fetch all unique players
        fetch("https://smash-wins-counter-production.up.railway.app/wins/players")
            .then(res => res.json())
            .then(data => {
                setPlayers(data);

                // Fetch each player's win rate
                data.forEach(player => {
                    fetch(`https://smash-wins-counter-production.up.railway.app/wins/winrate/${player}`)
                        .then(res => res.json())
                        .then(rate => {
                            setPlayerWinRates(prev => ({ ...prev, [player]: rate }));
                        });
                });
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const win = { winningPlayer, winningCharacter, losingPlayer, losingCharacter };

        try {
            const response = await fetch("https://smash-wins-counter-production.up.railway.app/wins/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(win)
            });

            if (!response.ok) throw new Error("Failed to add win");
            const data = await response.json();

            setMessage(
                `${data.winningPlayer} (playing ${data.winningCharacter}) beat ${data.losingPlayer} (playing ${data.losingCharacter})`
            );

            // Reset form
            setWinningPlayer("");
            setWinningCharacter(characters[0]?.name || "");
            setLosingPlayer("");
            setLosingCharacter(characters[0]?.name || "");

            // Refresh win rates for the players involved
            [data.winningPlayer, data.losingPlayer].forEach(player => {
                fetch(`https://smash-wins-counter-production.up.railway.app/wins/winrate/${player}`)
                    .then(res => res.json())
                    .then(rate => {
                        setPlayerWinRates(prev => ({ ...prev, [player]: rate }));
                    });
            });

            // Ensure new players are added to the table if they didn’t exist before
            setPlayers(prev => {
                const newPlayers = new Set([...prev, data.winningPlayer, data.losingPlayer]);
                return Array.from(newPlayers);
            });

        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Add a Win</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Winner Player:</label>
                    <input
                        type="text"
                        value={winningPlayer}
                        onChange={(e) => setWinningPlayer(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Winner Character:</label>
                    <select
                        value={winningCharacter}
                        onChange={(e) => setWinningCharacter(e.target.value)}
                    >
                        {characters.map(char => (
                            <option key={char.name} value={char.name}>{char.displayName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Loser Player:</label>
                    <input
                        type="text"
                        value={losingPlayer}
                        onChange={(e) => setLosingPlayer(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Loser Character:</label>
                    <select
                        value={losingCharacter}
                        onChange={(e) => setLosingCharacter(e.target.value)}
                    >
                        {characters.map(char => (
                            <option key={char.name} value={char.name}>{char.displayName}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Add Win</button>
            </form>

            {message && <p>{message}</p>}

            <h2>Player Win Rates</h2>
            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Win Rate</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr key={player}>
                        <td>{player}</td>
                        <td>
                            {playerWinRates[player] != null
                                ? (playerWinRates[player] * 100).toFixed(0) + "%"
                                : "Loading..."}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
