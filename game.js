class Player {
  constructor(name, money, space) {
    this.name = name;
    this.money = money;
    this.space = space;
    this.properties = {
      red: {
        total: 2,
        owned: []
      },
      blue: {
        total: 3,
        owned: []
      },
      green: {
        total: 2,
        owned: []
      }
    };
  }

  getMoney() {
    console.log(this.money);
    return this.money;
  }

  getSpace() {
    console.log(this.space);
    return this.space;
  }

  moveSpace(roll, board) {
    console.log({roll, space: this.space})
    const current = this.space + roll;
    if (current > board.length-1) {
      this.space = current - board.length;
      this.money += 200;
    } else {
      this.space = current;
    };
    console.log('Space', this.space);
  }

  purchaseProperty(property) {
    console.log('Purchasing', this.money > property.cost);
    if (property.owner === null) {
      if (this.money > property.cost) {
        this.money -= property.cost;
        this.properties[property.type].owned.push(property);
      } else {
        console.log('You do not have enough money');
      }
    }
  }

  payOtherPlayer(value) {
    this.money = this.money - value;
    if (this.money <= 0) {
      console.log('You are bankrupt!');
      return 'Bankrupt';
    }
  }

  passGo() {
    console.log('PASSED GO');
    this.money = this.money + 200;
  }
}

class Properties {
  constructor() {
    this.properties = {
      red1: {
        type: 'red',
        cost: 100,
        payout: 50,
        owner: null
      },
      red2: {
        type: 'red',
        cost: 125,
        payout: 75,
        owner: null
      },
      blue1: {
        type: 'blue',
        cost: 200,
        payout: 100,
        owner: null
      },
      blue2: {
        type: 'blue',
        cost: 225,
        payout: 125,
        owner: null
      },
      blue3: {
        type: 'blue',
        cost: 250,
        payout: 150,
        owner: null
      },
      green1: {
        type: 'green',
        cost: 300,
        payout: 150,
        owner: null
      },
      green2: {
        type: 'green',
        cost: 350,
        payout: 175,
        owner: null
      }
    }
  }

  checkProperties(property) {
    console.log(property, this.properties[property]);
    return this.properties[property];
  }

  assignOwner(owner, property) {
    this.properties[property].owner = owner;
  }
}

module.exports = { Player, Properties };
