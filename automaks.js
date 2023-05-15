const co2näitajaInput = document.querySelector(".co2-näitaja");

const automakseBensiinValue = document.querySelector(".automaks-bensiin .value");
const automakseDiiselValue = document.querySelector(".automaks-diisel .value");

const automaksArvuta = document.querySelector(".automaks-arvuta-nupp");

let co2näitaja = parseFloat(co2näitajaInput.value);

let bensiin = 0.6;
let diisel = 0.9;

let myChart2;

const checkValues2 = () => {
    let co2näitajaValue = co2näitajaInput.value;

    let regexNumber = /^[0-9]+$/;
    if (!co2näitajaValue.match(regexNumber)) {
      co2näitajaInput.value = "185";
    }
  };

const uuendaInputValues2 = () => {
    co2näitaja = parseFloat(co2näitajaInput.value);
};

const arvutaAutomakseBensiin = () => {
    checkValues2();
    uuendaInputValues2();
    let AMB = 
    co2näitaja * bensiin * (0.5+((co2näitaja-90) * 0.01)) ;

    return AMB;
};

const arvutaAutomakseDiisel = () => {
    checkValues2();
    uuendaInputValues2();
    let AMD = 
    co2näitaja * diisel * (0.5+((co2näitaja-90) * 0.01)) ;

    return AMD;
};

const updateDataBensiin = (AMB) => {
    automakseBensiinValue.innerHTML = Math.round(AMB);

    let automakseBensiin = Math.round(AMB);
    automakseBensiinValue.innerHTML = automakseBensiin;

    updateChart2();
};

const updateDataDiisel = (AMD) => {
    automakseDiiselValue.innerHTML = Math.round(AMD);

    let automakseDiisel = Math.round(AMD);
    automakseDiiselValue.innerHTML = automakseDiisel;

    updateChart2();
};

const init2 = () => {
    let AMB = arvutaAutomakseBensiin();
    updateDataBensiin(AMB);
    let AMD = arvutaAutomakseDiisel();
    updateDataDiisel(AMD);
};


const labels = ['Kui diisel', 'Kui bensiin'];
let data = [];

const updateChart2 = () => {
  let AMD = arvutaAutomakseDiisel();
  let AMB = arvutaAutomakseBensiin();

  data = [AMD, AMB];

  const ctx = document.getElementById('myChart2').getContext('2d');

  if (myChart2) {
    myChart2.data.datasets[0].data = data;
    myChart2.update();
  } else {
    myChart2 = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Automaks, erinevad kütused',
            data: data,
            backgroundColor: ["#354F52", "#84A98C"],
            borderWidth: 0,
          },
        ],
      },
    });
  }
};

init2();

automaksArvuta.addEventListener("click", init2);