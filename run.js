const { Player, Properties } = require('./game');

const board = ['go', 'red1', 'red2', 'taxes', 'blue1', 'taxes', 'blue2', 'blue3', 'taxes', 'green1', 'green2', 'taxes'];

const Player1 = new Player('Steve', 10000, 0);
const Player2 = new Player('Amanda', 10000, 0);
const Player3 = new Player('Blaire', 10000, 0);
const AllProperties = new Properties();

const rollDice = () => Math.ceil(Math.random() * 4);

const playGame = (players, props) => {
  let total = 0;
  let current = 0;
  
  while(players.filter(e => !e.bankrupt).length > 1) {
    const currentPlayer = players[current];
    if (!currentPlayer.bankrupt) {
      console.log(`Player ${current+1}'s turn`);
      const dice = rollDice();
      currentPlayer.moveSpace(dice, board);
      
      const space = board[currentPlayer.getSpace()];

      if (space === 'go') {
        currentPlayer.passGo();
      } else if (space === 'taxes') {
        currentPlayer.payTaxes();
      } else {
        const property = props.checkProperties(space);

        if (property.owner === null) {
          currentPlayer.purchaseProperty(property);
          props.assignOwner(currentPlayer.name, property.name);
        } else {
          const propertyOwner = players.find(e => e.name === property.owner);

          if (!propertyOwner.bankrupt) {
            currentPlayer.payOtherPlayer(property.type, property.payout);
            propertyOwner.getPaid(property.type, property.payout);
          }
        }
      }

      currentPlayer.buyHouses();
    }

    if (players.length-1 === current) {
      current = 0;
    } else {
      current++;
    }

    total++;
  }
  const winner = players.find(e => !e.bankrupt).name;
  console.log(
    `${winner} won the game after ${total} turns!`,
    'player1', {
      space: players[0].space,
      money: players[0].money,
      // propertiesRed: players[0].properties.red.owned,
      // propertiesBlue: players[0].properties.blue.owned,
      // propertiesGreen: players[0].properties.green.owned
    },
    'player2', {
      space: players[1].space,
      money: players[1].money,
      // propertiesRed: players[1].properties.red.owned,
      // propertiesBlue: players[1].properties.blue.owned,
      // propertiesGreen: players[1].properties.green.owned
    },
    'player3', {
      space: players[2].space,
      money: players[2].money,
      // propertiesRed: players[2].properties.red.owned,
      // propertiesBlue: players[2].properties.blue.owned,
      // propertiesGreen: players[2].properties.green.owned
    }
  );
};


playGame([Player1, Player2, Player3], AllProperties);

