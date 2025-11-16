import { useEffect, useState } from "react";

function App() {
    const [characters, setCharacters] = useState([]);
    const [winningPlayer, setWinningPlayer] = useState("");
    const [winningCharacter, setWinningCharacter] = useState("");
    const [losingPlayer, setLosingPlayer] = useState("");
    const [losingCharacter, setLosingCharacter] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/wins/characters")
            .then(res => res.json())
            .then(data => {
                setCharacters(data);
                setWinningCharacter(data[0]?.name || "");
                setLosingCharacter(data[0]?.name || "");
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const win = {
            winningPlayer,
            winningCharacter, // enum name
            losingPlayer,
            losingCharacter  // enum name
        };

        try {
            const response = await fetch("http://localhost:8080/wins/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(win)
            });
            if (!response.ok) throw new Error("Failed to add win");
            const data = await response.json();
            setMessage(
                `${data.winningPlayer} (playing ${data.winningCharacter}) beat ${data.losingPlayer} (playing ${data.losingCharacter})`
            );
            setWinningPlayer("");
            setWinningCharacter(characters[0]?.name || "");
            setLosingPlayer("");
            setLosingCharacter(characters[0]?.name || "");
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
                        {characters.map((char) => (
                            <option key={char.name} value={char.name}>
                                {char.displayName}
                            </option>
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
                        {characters.map((char) => (
                            <option key={char.name} value={char.name}>
                                {char.displayName}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Add Win</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default App;
