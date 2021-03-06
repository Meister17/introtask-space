/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
  this.name = name;
  this.position = position;
  this.capacity = capacity;
  this.cargo = 0;
  this.onplanet = null;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
  var message = [];
  message.push('Корабль: "' + this.name + '"');
  if (this.onplanet != null) {
    message.push('Местоположение: ' + this.onplanet);
  } else {
    message.push('Местоположение: ' + this.position);
  }
  if (this.getOccupiedSpace() > 0) {
    message.push('Занято: ' + this.getOccupiedSpace() + ' из ' + this.capacity + 'т');
  } else {
    message.push('Товаров нет');
  }
  document.write(message.join('. ') + '<br>');
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
  return this.capacity - this.cargo;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
  return this.cargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
  if (newPosition instanceof Planet) {
    this.position = newPosition.position;
    this.onplanet = newPosition.name;
  } else {
    this.position = newPosition;
    this.onplanet = null;
  }
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
  this.name = name;
  this.position = position;
  this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
  var message = [];
  message.push('Планета: ' + this.name);
  message.push('Местоположение: ' + this.position);
  if (this.getAvailableAmountOfCargo() > 0) {
    message.push('Доступно груза: ' + this.getAvailableAmountOfCargo() + 'т');
  } else {
    message.push('Грузов нет');
  }
  document.write(message.join('. ') + '<br>');
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
  return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  if (vessel.position[0] == this.position[0] &&
      vessel.position[1] == this.position[1]) {
    if (cargoWeight <= 0) {
      document.write('Вес загружаемого груза должен быть положительным.<br>');
    } else if (cargoWeight > this.getAvailableAmountOfCargo()) {
      document.write('Вес загружаемого груза не может превышать доступное ' +
                     'количество груза на планете.<br>');
    } else if (cargoWeight > vessel.getFreeSpace()) {
      document.write(
          'Невозможно загрузить груза больше грузоподъемности корабля.<br>');
    } else {
      vessel.cargo += cargoWeight;
      this.availableAmountOfCargo -= cargoWeight;
    }
  } else {
    document.write('Корабль ещё не добрался до планеты ' + this.name + '.<br>');
  }
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
  if (vessel.position[0] == this.position[0] &&
      vessel.position[1] == this.position[1]) {
    if (cargoWeight <= 0) {
      document.write('Вес выгружаемого груза должен быть положительным.<br>');
    } else if (cargoWeight > vessel.getOccupiedSpace()) {
      document.write('Вес выгружаемого груза не может превышать вес груза на ' +
                     'борту корабля.<br>');
    } else {
      vessel.cargo -= cargoWeight;
      this.availableAmountOfCargo += cargoWeight;
    }
  } else {
    document.write('Корабль ещё не добрался до планеты ' + this.name + '.<br>');
  }
}
