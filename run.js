const { Player, Properties } = require('./game');

const board = ['go', 'red1', 'red2', 'blank', 'blue1', 'blue2', 'blue3', 'blank', 'green1', 'green2'];

const Player1 = new Player('Steve', 1000, 0);
const Player2 = new Player('Amanda', 1000, 0);
const AllProperties = new Properties();

const rollDice = () => Math.ceil(Math.random() * 4)

const playGame = (players, props) => {
  let total = 0;
  let current = 0;
  
  while(players.filter(e => !e.bankrupt).length > 1) {
    const currentPlayer = players[current];
    console.log(`Player ${current+1}'s turn`);
    const dice = rollDice();
    currentPlayer.moveSpace(dice, board);
    const space = board[currentPlayer.getSpace()];
    if (space === 'go') {
      currentPlayer.passGo();
    } else if (space === 'blank') {
      console.log('Nothing happened');
    } else {
      const property = props.checkProperties(space);
      console.log({property});
      if (property.owner === null) {
        currentPlayer.purchaseProperty(property);
        props.assignOwner(currentPlayer.name, property.name);
      } else {
        currentPlayer.payOtherPlayer(property.payout);
        const propertyOwner = players.find(e => e.name === property.owner);
        propertyOwner.getPaid(property.payout);
      }
    }

    if (players.length-1 === current) {
      current = 0;
    } else {
      current++;
    }

    total++;
    if (total === 15) {
      console.log(
        'player1', {
          space: players[0].space,
          money: players[0].money,
          propertiesRed: players[0].properties.red.owned,
          propertiesBlue: players[0].properties.blue.owned,
          propertiesGreen: players[0].properties.green.owned
        },
        'player2', {
          space: players[1].space,
          money: players[1].money,
          propertiesRed: players[1].properties.red.owned,
          propertiesBlue: players[1].properties.blue.owned,
          propertiesGreen: players[1].properties.green.owned
        },
        props
      );
      players[0].bankrupt = true;
    }
  }
};


playGame([Player1, Player2], AllProperties);

