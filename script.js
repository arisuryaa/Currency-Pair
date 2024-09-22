const button = document.querySelector("#convert");
const dariPair = document.querySelector("#dari");
const menjadiPair = document.querySelector("#ke");
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

tanggal.innerHTML = `<h1 class="px-10 text-right">${day}/${month}/${year}</h1>`;

fetch("https://v6.exchangerate-api.com/v6/5ef02b9ddf4c1b87cb1fdd4e/latest/USD")
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
    const currency = Object.keys(response.conversion_rates);
    Option(currency);
  })
  .catch((err) => console.log(`Gagal Fetch Data API : ${err}`));

function Option(currency) {
  let option = "";
  currency.forEach((e) => {
    option += ` <option class="w-full px-2 py-2 border border-solid rounded-md border-slate-500" value="${e}" id="${e}">${e}</option>`;
  });
  dariPair.innerHTML = option;
  menjadiPair.innerHTML = option;
}

button.addEventListener("click", function () {
  let jumlah = document.querySelector("#jumlah").value;
  const dari = dariPair.value;
  const menjadi = menjadiPair.value;
  console.log("mulai");
  fetch(`https://v6.exchangerate-api.com/v6/5ef02b9ddf4c1b87cb1fdd4e/latest/${dari}`)
    .then((res) => res.json())
    .then((response) => {
      let pair = response.conversion_rates[menjadi];
      const hasil = hitung(jumlah, pair);
      tampilHasil(hasil, jumlah, dari, menjadi, pair);
    })
    .catch((err) => console.log(`Gagal Fetch Data API : ${err}`));
  console.log("selesai");
});

function hitung(jumlah, pair) {
  return parseInt(jumlah) * parseInt(pair);
}

function tampilHasil(hasil, jumlah, dari, menjadi, pair) {
  const containerHasil = document.querySelector("#hasil");
  const tanggal = document.querySelector("#tanggal");
  let hasilContent = ` <h1>${jumlah} ${dari} =</h1>
            <h1 class="text-3xl font-semibold">${menjadi} ${hasil.toLocaleString("id-ID")}</h1>
            <h2 class="text-sm font-light">1 ${dari} = ${pair.toLocaleString("id-ID")} ${menjadi}</h2>`;

  containerHasil.innerHTML = hasilContent;
}
