const { Player, Properties } = require('./game');

const board = ['go', 'red1', 'red2', 'taxes', 'blue1', 'taxes', 'blue2', 'blue3', 'taxes', 'green1', 'green2', 'taxes', 'red1', 'red2', 'taxes', 'blue1', 'taxes', 'blue2', 'blue3', 'taxes', 'green1', 'green2', 'taxes'];

const Player1 = new Player('Steve', 1000, 0);
const Player2 = new Player('Amanda', 1000, 0);
const Player3 = new Player('Blaire', 1000, 0);
const Player4 = new Player('Trevor', 1000, 0);
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
          console.log(`${currentPlayer.name} purchased ${property.name}.`);
        } else if (property.owner !== currentPlayer.name) {
          const propertyOwner = players.find(e => e.name === property.owner);

          if (!propertyOwner.bankrupt) {
            const payment = currentPlayer.payOtherPlayer(property.type, property.payout);
            propertyOwner.getPaid(payment);
            console.log(`${currentPlayer.name} paid ${propertyOwner.name} $${payment}.`);
          }
        }
      }

      currentPlayer.buyHouses();
    }

    if (total % 100 === 0) {
      console.log(
        'player1', {
          space: players[0].space,
          money: players[0].money
        },
        'player2', {
          space: players[1].space,
          money: players[1].money
        },
        'player3', {
          space: players[2].space,
          money: players[2].money
        },
        'player3', {
          space: players[3].space,
          money: players[3].money
        }
      );
    }

    if (players.length-1 === current) {
      current = 0;
    } else {
      current++;
    }

    total++;
  }
  const rounds = Math.floor(total/players.length);
  const winner = players.find(e => !e.bankrupt).name;
  console.log(
    `${winner} won the game after ${total} turns and ${rounds} rounds!`,
    'player1', {
      space: players[0].space,
      money: players[0].money
    },
    'player2', {
      space: players[1].space,
      money: players[1].money
    },
    'player3', {
      space: players[2].space,
      money: players[2].money
    },
    'player3', {
      space: players[3].space,
      money: players[3].money
    }
  );
};

playGame([Player1, Player2, Player3, Player4], AllProperties);
