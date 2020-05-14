const { Player, Properties } = require('./game');

const board = ['go', 'red1', 'red2', 'blank', 'blue1', 'blue2', 'blue3', 'blank', 'green1', 'green2'];

const Player1 = new Player('Steve', 1000, 0);
const Player2 = new Player('Amanda', 1000, 0);
const AllProperties = new Properties();

const rollDice = () => Math.ceil(Math.random() * 4)

const playGame = (players, props) => {
  let total = 0;
  let current = 0;
  
  while(players.length > 1) {
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
      currentPlayer.purchaseProperty(property);
    }

    if (players.length-1 === current) {
      current = 0;
    } else {
      current++;
    }

    total++;
    if (total === 5) {
      console.log({
        player1: {
          space: players[0].space,
          money: players[0].money
        },
        player2: {
          space: players[1].space,
          money: players[1].money
        }
      });
      players.pop();
    }
  }
};


playGame([Player1, Player2], AllProperties);

