const button = document.querySelector("#convert");
const dariPair = document.querySelector("#dari");
const menjadiPair = document.querySelector("#ke");
const loading = document.querySelector("#loading");
const text = document.querySelector("#text");
const date = new Date();

tanggal.innerHTML = `<h1 class="px-10 text-right text-[1px]">${date}</h1>`;
loading.classList.add("hidden");

// Base API Option
fetch("https://v6.exchangerate-api.com/v6/5ef02b9ddf4c1b87cb1fdd4e/latest/USD")
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
    const currency = Object.keys(response.conversion_rates);
    tampilOption(currency);
  })
  .catch((err) => console.log(`Gagal Fetch Data API : ${err}`));

// Menampilkan Pilihan Option
function tampilOption(currency) {
  let option = "";
  currency.forEach((e) => {
    option += ` <option class="w-full px-2 py-2 border border-solid rounded-md border-slate-500" value="${e}" id="${e}">${e}</option>`;
  });
  dariPair.innerHTML = option;
  menjadiPair.innerHTML = option;
}

// Menjalankan Fungsi Kalkulasi dan Menampilkan Ke Website Ketika Button Di Click
button.addEventListener("click", function () {
  loading.classList.remove("hidden");
  text.classList.add("hidden");
  const jumlah = document.querySelector("#jumlah").value;

  fetch(`https://v6.exchangerate-api.com/v6/5ef02b9ddf4c1b87cb1fdd4e/latest/${dariPair.value}`)
    .then((res) => res.json())
    .then((response) => {
      let pair = response.conversion_rates[menjadiPair.value];
      const hasil = hitung(jumlah, pair);
      tampilHasil(hasil, jumlah, dariPair.value, menjadiPair.value, pair);
    })
    .catch((err) => console.log(`Gagal Fetch Data API : ${err}`))
    .finally(() => {
      loading.classList.add("hidden");
      text.classList.remove("hidden");
    });
});

// Fungsi Kalkulasi
function hitung(jumlah, pair) {
  return parseInt(jumlah) * parseInt(pair);
}

// Funsgi Menampilkan Hasil Ke Website
function tampilHasil(hasil, jumlah, dari, menjadi, pair) {
  const containerHasil = document.querySelector("#hasil");
  const tanggal = document.querySelector("#tanggal");
  let hasilContent = ` <h1>${jumlah} ${dari} =</h1>
            <h1 class="text-3xl font-semibold">${menjadi} ${hasil.toLocaleString("id-ID")}</h1>
            <h2 class="text-sm font-light">1 ${dari} = ${pair.toLocaleString("id-ID")} ${menjadi}</h2>`;
  containerHasil.innerHTML = hasilContent;
}
