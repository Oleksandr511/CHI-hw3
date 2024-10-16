console.log('Factory task: ')

class Transport {
  ride() {
    throw new Error("Method ride should be implemented");
  }

  stop() {
    throw new Error("Method stop should be implemented");
  }
}

class Truck extends Transport {
  constructor() {
    super();
    this.type = "Truck";
  }
  ride() {
    console.log(`Riding ${this.type}`);
  }
  stop() {
    console.log(`Stopping ${this.type}`);
  }
}

class Car extends Transport {
  constructor() {
    super();
    this.type = "Car";
  }
  ride() {
    console.log(`Riding ${this.type}`);
  }
  stop() {
    console.log(`Stopping ${this.type}`);
  }
}

class Bike extends Transport {
  constructor() {
    super();
    this.type = "Bike";
  }
  ride() {
    console.log(`Riding ${this.type}`);
  }
  stop() {
    console.log(`Stopping ${this.type}`);
  }
}

class TransportFactory {
  static createTransport(type) {
    switch (type) {
      case "Truck":
        return new Truck();
      case "Car":
        return new Car();
      case "Bike":
        return new Bike();
      default:
        throw new Error("Invalid transport type");
    }
  }
}

const transportTruck = TransportFactory.createTransport("Truck");
transportTruck.ride();
transportTruck.stop();

const transportCar = TransportFactory.createTransport("Car");
transportCar.ride();
transportCar.stop();

const transportBike = TransportFactory.createTransport("Bike");
transportBike.ride();
transportBike.stop();
