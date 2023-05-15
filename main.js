const laenuKogusInput = document.querySelector(".laenu-kogus");
const intressimäärInput = document.querySelector(".intressimäär");
const perioodInput = document.querySelector(".periood");

const kuumakseValue = document.querySelector(".kuumakse .value");
const koguintressValue = document.querySelector(".kogu-intress .value");
const kogumakseValue = document.querySelector(".kogu-makse .value");

const arvutaNupp = document.querySelector(".arvuta-nupp");

let laenuKogus = parseFloat(laenuKogusInput.value);
let intressimäär = parseFloat(intressimäärInput.value);
let periood = parseFloat(perioodInput.value);

let intress = intressimäär / 12 / 100;

let myChart;

const checkValues = () => {
    let laenuKogusValue = laenuKogusInput.value;
    let intressimäärValue = intressimäärInput.value;
    let perioodValue = perioodInput.value;
  
    let regexNumber = /^[0-9]+$/;
    if (!laenuKogusValue.match(regexNumber)) {
      laenuKogusInput.value = "10000";
    }
  
    if (!perioodValue.match(regexNumber)) {
      perioodInput.value = "12";
    }
  
    let regexDecimalNumber = /^(\d*\.)?\d+$/;
    if (!intressimäärValue.match(regexDecimalNumber)) {
      intressimäärInput.value = "7.5";
    }
  };

const displayChart = (koguIntressiMakseValue) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Intressi summa", "Laenatud summa"],
        datasets: [
          {
            data: [koguIntressiMakseValue, laenuKogus],
            backgroundColor: ["#354F52", "#84A98C"],
            borderWidth: 0,
          },
        ],
      },
    });
};

const updateChart = (koguIntressiMakseValue) => {
    myChart.data.datasets[0].data[0] = koguIntressiMakseValue;
    myChart.data.datasets[0].data[1] = laenuKogus;
    myChart.update();
  };

const uuendaInputValues = () => {
    laenuKogus = parseFloat(laenuKogusInput.value);
    intressimäär = parseFloat(intressimäärInput.value);
    periood = parseFloat(perioodInput.value);
    intress = intressimäär / 12 / 100;
};

const arvutaKuumakse = () => {
    checkValues();
    uuendaInputValues();
    let KM = 
    laenuKogus * 
    intress * 
    (Math.pow(1 + intress, periood) / 
        (Math.pow(1 + intress, periood) - 1));

    return KM;
};

const updateData = (KM) => {
    kuumakseValue.innerHTML = Math.round(KM);

    let kogumakse = Math.round(periood * KM);
    kogumakseValue.innerHTML = kogumakse;

    let koguIntressiMakse = Math.round(kogumakse - laenuKogus);
    koguintressValue.innerHTML = koguIntressiMakse;

    if (myChart) {
        updateChart(koguIntressiMakse);
      } else {
        displayChart(koguIntressiMakse);
      }
};


const init = () => {
    let KM = arvutaKuumakse();
    updateData(KM);
};

init();

arvutaNupp.addEventListener("click", init);