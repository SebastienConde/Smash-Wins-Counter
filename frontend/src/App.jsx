import { useState, useEffect } from "react";
import WinForm from "./components/WinForm";
import PlayerTable from "./components/PlayerTable";
import "./App.css";
import {Box, Heading, HStack, VStack} from "@chakra-ui/react";

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

    useEffect(() => {
        async function loadAll() {
            const charData = await (await fetch("https://smash-wins-counter-production.up.railway.app/wins/characters")).json();
            setCharacters(charData);
            setWinningCharacter(charData[0]?.name || "");
            setLosingCharacter(charData[0]?.name || "");

            const playerData = await (await fetch("https://smash-wins-counter-production.up.railway.app/wins/players")).json();
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

            setWinningPlayer("");
            setLosingPlayer("");
            setWinningCharacter(characters[0]?.name || "");
            setLosingCharacter(characters[0]?.name || "");

            await fetchPlayerStats([data.winningPlayer, data.losingPlayer]);
            setPlayers(prev => Array.from(new Set([...prev, data.winningPlayer, data.losingPlayer])));
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <VStack>
            <Box padding="40px"></Box>
            <Heading>Add a Win</Heading>
            <div className="app-container">
                <WinForm
                    winningPlayer={winningPlayer} setWinningPlayer={setWinningPlayer}
                    losingPlayer={losingPlayer} setLosingPlayer={setLosingPlayer}
                    winningCharacter={winningCharacter} setWinningCharacter={setWinningCharacter}
                    losingCharacter={losingCharacter} setLosingCharacter={setLosingCharacter}
                    characters={characters} players={players}
                    handleSubmit={handleSubmit}
                />
                {message && <p>{message}</p>}
                <PlayerTable players={players} playerWinRates={playerWinRates} playerGames={playerGames} />
            </div>
        </VStack>
    );
}

export default App;
