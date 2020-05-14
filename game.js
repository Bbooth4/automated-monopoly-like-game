class Player {
  constructor(name, money, space) {
    this.name = name;
    this.money = money;
    this.space = space;
    this.bankrupt = false;
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
    this.money += value;
    if (this.money <= 0) {
      console.log('You are bankrupt!');
      this.bankrupt = true;
    }
  }

  getPaid(value) {
    this.money += value;
  }

  payTaxes() {
    this.money -= this.money*0.5;
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
        name: 'red1',
        cost: 100,
        payout: 50,
        owner: null
      },
      red2: {
        type: 'red',
        name: 'red2',
        cost: 125,
        payout: 75,
        owner: null
      },
      blue1: {
        type: 'blue',
        name: 'blue1',
        cost: 200,
        payout: 100,
        owner: null
      },
      blue2: {
        type: 'blue',
        name: 'blue2',
        cost: 225,
        payout: 125,
        owner: null
      },
      blue3: {
        type: 'blue',
        name: 'blue3',
        cost: 250,
        payout: 150,
        owner: null
      },
      green1: {
        type: 'green',
        name: 'green1',
        cost: 300,
        payout: 150,
        owner: null
      },
      green2: {
        type: 'green',
        name: 'green2',
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
