import React from "react";

export default function PlayerTable({ players, playerWinRates, playerGames }) {
    return (
        <div className="table-container">
            <h2>Player Win Rates</h2>
            <table className="glass-table">
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Win Rate</th>
                    <th>Total Games</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr key={player}>
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
