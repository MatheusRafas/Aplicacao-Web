// Definição da classe Vehicle
class Vehicle {
    constructor(model, year, brand) {
        this.model = model;
        this.year = year;
        this.brand = brand;
    }
}

// Definição da classe Car, que herda de Vehicle
class Car extends Vehicle {
    constructor(model, year, brand, doors) {
        super(model, year, brand);
        if (doors < 2 || doors > 4) {
            throw new Error('Carros devem ter entre 2 e 4 portas.');
        }
        this.doors = doors;
    }
}

// Definição da classe Motorcycle, que herda de Vehicle
class Motorcycle extends Vehicle {
    constructor(model, year, brand, wheels, passengers) {
        super(model, year, brand);
        if (wheels !== 2) {
            throw new Error('Motocicletas devem ter exatamente 2 rodas.');
        }
        if (passengers < 1 || passengers > 2) {
            throw new Error('Motocicletas devem permitir entre 1 e 2 passageiros.');
        }
        this.wheels = wheels;
        this.passengers = passengers;
    }
}

document.getElementById('vehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const brand = document.getElementById('brand').value;
    const doors = parseInt(document.getElementById('doors').value);
    const wheels = parseInt(document.getElementById('wheels').value);
    const passengers = parseInt(document.getElementById('passengers').value);

    let vehicle;

    try {
        if (doors >= 2 && doors <= 4) {
            vehicle = new Car(model, year, brand, doors);
        } else if (wheels === 2 && passengers >= 1 && passengers <= 2) {
            vehicle = new Motorcycle(model, year, brand, wheels, passengers);
        } else {
            throw new Error('Veículo não atende aos critérios de carros ou motocicletas.');
        }

        // Exibir os dados do veículo para o usuário
        displayVehicleInfo(vehicle);

        // Exibir mensagem específica sobre o tipo de veículo cadastrado
        displayVehicleType(vehicle);

        const jsonData = JSON.stringify(vehicle);

        // Função para criar e salvar o arquivo JSON localmente
        saveJSON(jsonData);

        alert('Veículo cadastrado com sucesso!');
        document.getElementById('vehicleForm').reset();
    } catch (error) {
        alert(error.message);
    }
});

// Função para exibir os dados do veículo para o usuário
function displayVehicleInfo(vehicle) {
    const infoDiv = document.getElementById('vehicleInfo');
    infoDiv.innerHTML = `
        <h2>Dados do Veículo:</h2>
        <p><strong>Modelo:</strong> ${vehicle.model}</p>
        <p><strong>Ano de Fabricação:</strong> ${vehicle.year}</p>
        <p><strong>Marca:</strong> ${vehicle.brand}</p>
        ${vehicle.doors ? `<p><strong>Quantidade de Portas:</strong> ${vehicle.doors}</p>` : ''}
        ${vehicle.wheels ? `<p><strong>Rodas:</strong> ${vehicle.wheels}</p>` : ''}
        ${vehicle.passengers ? `<p><strong>Passageiros:</strong> ${vehicle.passengers}</p>` : ''}
    `;
}

// Função para exibir mensagem sobre o tipo de veículo cadastrado
function displayVehicleType(vehicle) {
    const typeDiv = document.getElementById('vehicleType');
    if (vehicle instanceof Car) {
        typeDiv.textContent = 'Foi cadastrado um carro.';
    } else if (vehicle instanceof Motorcycle) {
        typeDiv.textContent = 'Foi cadastrada uma motocicleta.';
    } else {
        typeDiv.textContent = 'Tipo de veículo não reconhecido.';
    }
}

// Função para criar e salvar o arquivo JSON localmente
function saveJSON(jsonData) {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicle.json';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}
