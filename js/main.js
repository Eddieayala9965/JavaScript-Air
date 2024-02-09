"use strict";

const grabAirlineInfo = async () => {
  const url = "./data/flight-logs.json";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  return data;
};

const createElement = (flightData) => {
  const appendElement = document.getElementById("append");
  appendElement.innerHTML = "";

  flightData.forEach(
    ({
      flight_number,
      departure_airport,
      arrival_airport,
      departure_date,
      arrival_date,
      departure_time,
      arrival_time,
      passenger_count,
      airline,
      flight_duration_hours,
    }) => {
      const createAirlineInfo = document.createElement("ul");
      createAirlineInfo.innerHTML = `
          <li><span class="bold">Airline:</span> ${airline}</li>
          <li><span class="bold">Flight Num:</span> ${flight_number}</li>
          <li><span class="bold">Airport</span> Departure: ${departure_airport} and <span>Arrival:</span> ${arrival_airport}</li>
          <li><span class="bold">Depart Time:</span> ${departure_time} and <span class="bold">Arival Time:</span> ${arrival_time}</li>
          <li><span class="bold">Depart Date:</span> ${departure_date} and <span class="bold">Arival Date:</span> ${arrival_date}</li>
          <li><span class="bold">Passanger Count:</span> ${passenger_count}</li>
          <li><span class="bold">Flight Duration:</span> ${flight_duration_hours}</li>
        `;

      appendElement.appendChild(createAirlineInfo);
    }
  );
};

const updateFlights = async () => {
  let searchInputAirlines = document.querySelector("input[name=Airlines]");
  let searchInputNum = document.querySelector("input[name=Num]"); // parseFloat this
  let searchInputAirport = document.querySelector("input[name=Airport]");
  let searchInputDeparture = document.querySelector("input[name=Departure]");

  const searchInputDepartureValue = searchInputDeparture.value;
  const searchInputAirlinesValue = searchInputAirlines.value;
  const searchInputNumValue = searchInputNum.value;
  const searchInputAirportValue = searchInputAirport.value;

  const data = await grabAirlineInfo();

  const filterAirlines = data.filter((flight) => {
    const airlineMatch =
      !searchInputAirlinesValue ||
      flight.airline.toLowerCase().includes(searchInputAirlinesValue);
    const numMatch =
      !searchInputNumValue ||
      parseFloat(flight.flight_number) === parseFloat(searchInputNumValue);
    const airportMatch =
      !searchInputAirportValue ||
      flight.arrival_airport.toLowerCase().includes(searchInputAirportValue);
    const departureMatch =
      !searchInputDepartureValue ||
      flight.departure_airport
        .toLowerCase()
        .includes(searchInputDepartureValue);

    return airlineMatch && numMatch && airportMatch && departureMatch;
  });

  createElement(filterAirlines);
};

(async () => {
  const myForm = document.querySelector("#lookup");
  myForm.addEventListener("input", updateFlights);

  const airlineInfo = await grabAirlineInfo();
  createElement(airlineInfo);
})();
