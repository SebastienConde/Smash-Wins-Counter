import { HStack, VStack, NativeSelect, Combobox, useListCollection, useFilter, Portal} from "@chakra-ui/react";
import WinButton from "./AddWinButton.jsx";

export default function WinForm({
                                    winningPlayer, setWinningPlayer,
                                    losingPlayer, setLosingPlayer,
                                    winningCharacter, setWinningCharacter,
                                    losingCharacter, setLosingCharacter,
                                    characters, players,
                                    handleSubmit
                                }) {
    const { contains } = useFilter({ sensitivity: "base" })

    const playerItems = players.map(p => ({
        value: p.name,
        label: p.displayName
    }));

    const {
        collection: playerCollection,
        filter: filterPlayers
    } = useListCollection({
        initialItems: playerItems,
        filter: contains,
    })

    const characterItems = characters.map(c => ({
        value: c.name,
        label: c.displayName
    }));

    const {
        collection: characterCollection,
        filter: filterCharacters
    } = useListCollection({
        initialItems: characterItems,
        filter: contains,
    });

    return (
        <form onSubmit={handleSubmit}>
            <VStack>
                <HStack>
                    <VStack>

                        <label>Winning Player</label>

                        <Combobox.Root
                            collection={playerCollection}
                            onInputValueChange={(e) => filterPlayers(e.inputValue)}
                            width="320px"
                            openOnClick
                        >
                            <Combobox.Control>
                                <Combobox.Input placeholder="Type to search" />
                                <Combobox.IndicatorGroup>
                                    <Combobox.ClearTrigger />
                                    <Combobox.Trigger />
                                </Combobox.IndicatorGroup>
                            </Combobox.Control>
                            <Portal>
                                <Combobox.Positioner>
                                    <Combobox.Content>
                                        <Combobox.Empty>No items found</Combobox.Empty>
                                        {playerCollection.items.map((item) => (
                                            <Combobox.Item
                                                item={item}
                                                key={item.value}
                                                onClick={() => setWinningPlayer(item.value)}
                                            >
                                                {item.label}
                                                <Combobox.ItemIndicator />
                                            </Combobox.Item>
                                        ))}
                                    </Combobox.Content>
                                </Combobox.Positioner>
                            </Portal>
                        </Combobox.Root>

                        {/*<NativeSelect.Root>*/}
                        {/*    <NativeSelect.Field*/}
                        {/*        value={winningPlayer}*/}
                        {/*        onChange={(e) => setWinningPlayer(e.target.value)}*/}
                        {/*        required*/}
                        {/*    >*/}
                        {/*        {players.map((p) => (*/}
                        {/*            <option key={p} value={p}>{p}</option>*/}
                        {/*        ))}*/}
                        {/*    </NativeSelect.Field>*/}
                        {/*    <NativeSelect.Indicator />*/}
                        {/*</NativeSelect.Root>*/}
                    </VStack>

                    <VStack>

                        <label>Winning Character</label>

                        <Combobox.Root
                            collection={characterCollection}
                            onInputValueChange={(e) => filterCharacters(e.inputValue)}
                            width="320px"
                            openOnClick
                        >
                            <Combobox.Control>
                                <Combobox.Input placeholder="Type to search" />
                                <Combobox.IndicatorGroup>
                                    <Combobox.ClearTrigger />
                                    <Combobox.Trigger />
                                </Combobox.IndicatorGroup>
                            </Combobox.Control>
                            <Portal>
                                <Combobox.Positioner>
                                    <Combobox.Content>
                                        <Combobox.Empty>No characters found</Combobox.Empty>
                                        {characterCollection.items.map((item) => (
                                            <Combobox.Item
                                                item={item}
                                                key={item.value}
                                                onClick={() => setWinningCharacter(item.value)}
                                            >
                                                {item.label}
                                                <Combobox.ItemIndicator />
                                            </Combobox.Item>
                                        ))}
                                    </Combobox.Content>
                                </Combobox.Positioner>
                            </Portal>
                        </Combobox.Root>

                        {/*<NativeSelect.Root>*/}
                        {/*    <NativeSelect.Field*/}
                        {/*        value={winningCharacter}*/}
                        {/*        onChange={(e) => setWinningCharacter(e.target.value)}*/}
                        {/*        required*/}
                        {/*    >*/}
                        {/*        {characters.map((c) => (*/}
                        {/*            <option key={c.name} value={c.name}>{c.displayName}</option>*/}
                        {/*        ))}*/}
                        {/*    </NativeSelect.Field>*/}
                        {/*    <NativeSelect.Indicator />*/}
                        {/*</NativeSelect.Root>*/}
                    </VStack>

                    <VStack>
                        <label>Losing Player</label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                value={losingPlayer}
                                onChange={(e) => setLosingPlayer(e.target.value)}
                                required
                            >
                                {players.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </VStack>

                    <VStack>
                        <label>Losing Character</label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                value={losingCharacter}
                                onChange={(e) => setLosingCharacter(e.target.value)}
                                required
                            >
                                {characters.map((c) => (
                                    <option key={c.name} value={c.name}>{c.displayName}</option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </VStack>
                </HStack>

                <HStack>
                    <WinButton type="submit">Add Win</WinButton>
                </HStack>
            </VStack>
        </form>
    );
}
