function Games({
  clicked: handleGame, card1, card2, card3, card4, card5, card6, card7, card8, card9,
}) {
  return (
    <div>
      <h1>Games</h1>
      <p>Choose random box below to get reward!</p>
      <p>Chance</p>
      <button type="button" value={1} onClick={handleGame}>{card1}</button>
      <button type="button" value={2} onClick={handleGame}>{card2}</button>
      <button type="button" value={3} onClick={handleGame}>{card3}</button>
      <button type="button" value={4} onClick={handleGame}>{card4}</button>
      <button type="button" value={5} onClick={handleGame}>{card5}</button>
      <button type="button" value={6} onClick={handleGame}>{card6}</button>
      <button type="button" value={7} onClick={handleGame}>{card7}</button>
      <button type="button" value={8} onClick={handleGame}>{card8}</button>
      <button type="button" value={9} onClick={handleGame}>{card9}</button>
    </div>
  );
}

export default Games;
