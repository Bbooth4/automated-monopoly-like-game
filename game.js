class Player {
  constructor(name, money, space) {
    this.name = name;
    this.money = money;
    this.space = space;
    this.bankrupt = false;
    this.properties = {
      red: {
        total: 2,
        houses: 0,
        owned: []
      },
      blue: {
        total: 3,
        houses: 0,
        owned: []
      },
      green: {
        total: 2,
        houses: 0,
        owned: []
      }
    };
  }

  getSpace() {
    return this.space;
  }

  moveSpace(roll, board) {
    const current = this.space + roll;
    if (current > board.length-1) {
      this.space = current - board.length;
      this.money += 200;
      console.log('PASSED GO');
    } else {
      this.space = current;
    };
  }

  purchaseProperty(property) {
    if (property.owner === null) {
      if (this.money > property.cost) {
        this.money -= property.cost;
        this.properties[property.type].owned.push(property);
      } else {
        console.log('You do not have enough money');
      }
    }
  }

  buyHouses() {
    const randomized = [];
    const options = Object.keys(this.properties);
    const num = Math.floor(Math.random());
    options.forEach(e => {
      num === 1 ? randomized.push(this.properties[e]) : randomized.unshift(this.properties[e]);
    });
    const selection = randomized.find(e => e.total === e.owned.length && e.houses < 4);
    if (selection) {
      const cost =  selection.owned[0].houseCost;
      if (this.money > cost) {
        this.money -= cost;
        this.properties[selection.owned[0].type].houses += 1;
      }
    }
  }

  payOtherPlayer(type, value) {
    const newAmount = this.properties[type].houses + 1 * value;
    const payment = newAmount > this.money ? this.money : newAmount;
    this.money -= payment;
    if (this.money <= 0) {
      console.log(`${this.name} is bankrupt!`, this.money);
      this.bankrupt = true;
    }
    return payment;
  }

  getPaid(type, value) {
    if (!this.bankrupt) this.money += this.properties[type].houses + 1 * value;
  }

  payTaxes() {
    this.money -= Math.floor(this.money*0.5);
  }

  passGo() {
    console.log('PASSED GO');
    this.money = this.money + 200
  }
}

class Properties {
  constructor() {
    this.properties = {
      red1: {
        type: 'red',
        name: 'red1',
        cost: 100,
        payout: 50,
        owner: null,
        houseCost: 50
      },
      red2: {
        type: 'red',
        name: 'red2',
        cost: 125,
        payout: 75,
        owner: null,
        houseCost: 50
      },
      blue1: {
        type: 'blue',
        name: 'blue1',
        cost: 200,
        payout: 100,
        owner: null,
        houseCost: 100
      },
      blue2: {
        type: 'blue',
        name: 'blue2',
        cost: 225,
        payout: 125,
        owner: null,
        houseCost: 100
      },
      blue3: {
        type: 'blue',
        name: 'blue3',
        cost: 250,
        payout: 150,
        owner: null,
        houseCost: 150
      },
      green1: {
        type: 'green',
        name: 'green1',
        cost: 300,
        payout: 150,
        owner: null,
        houseCost: 150
      },
      green2: {
        type: 'green',
        name: 'green2',
        cost: 350,
        payout: 175,
        owner: null,
        houseCost: 150
      }
    }
  }

  checkProperties(property) {
    return this.properties[property];
  }

  assignOwner(owner, property) {
    this.properties[property].owner = owner;
  }
}

module.exports = { Player, Properties };
