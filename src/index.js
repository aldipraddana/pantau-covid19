// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from "jquery";

const optionNeg = [];

const convertNumber = (angka) =>
{
  let ubahangka = '';
	const angkarev = angka.toString().split('').reverse().join('');
	for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) ubahangka += angkarev.substr(i,3)+',';
	return ubahangka.split('',ubahangka.length-1).reverse().join('');
}

$(document).ready(function() {

  $.ajax({
      url: 'https://covid19.mathdro.id/api',
      type: 'GET',
      dataType: 'JSON',
      success: function(result) {
        $(`#global-konfirmasi`).html(convertNumber(result.confirmed.value));
        $(`#global-sembuh`).html(convertNumber(result.recovered.value));
        $(`#global-meninggal`).html(convertNumber(result.deaths.value));
        $(`#dateCovid`).html(result.lastUpdate);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.error();
      }
    })

    const optionNe = [];
    $.ajax({
        url: 'https://covid19.mathdro.id/api/countries',
        type: 'GET',
        dataType: 'JSON',
        success: function(result) {
          $.each(result.countries, (index, val) =>{
            const optionN = `<option value="${val.name}">${val.name}</option>`;
            optionNe.push(optionN)
            optionNeg.push(val.name)
          })
          const optionNegara = optionNe.join()
          $('#selectNegara').append(optionNegara)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.error();
        }
      })
})

$('.searchNegara').click(()=>{
  const valOption = $('#selectNegara').val();
    $.ajax({
        url: `https://covid19.mathdro.id/api/countries/${valOption}`,
        type: 'GET',
        dataType: 'JSON',
        success: function(result) {
          $('.table-area-covid').html(``)
          const htmlDetail = `<table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Lokasi</th>
                                    <th scope="col">Dikonfirmasi</th>
                                    <th scope="col">Sembuh</th>
                                    <th scope="col">Meninggal Dunia</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">${valOption}</th>
                                    <td>${convertNumber(result.confirmed.value)}</td>
                                    <td>${convertNumber(result.recovered.value)}</td>
                                    <td>${convertNumber(result.deaths.value)}</td>
                                  </tr>
                                </tbody>
                              </table>`;
            $('.table-area-covid').html(htmlDetail)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          $('.table-area-covid').html(``)
        }
      })
})

class gambarKu extends HTMLElement {

 connectedCallback() {
   this.src = this.getAttribute("src") || null;
   this.alt = this.getAttribute("alt") || null;
   this.class = this.getAttribute("class") || null;

   this.innerHTML = `
     <figure>
       <img src="${this.src}"
           alt="${this.alt}" class="${this.class}">
     </figure>
   `;
 }
}

customElements.define("gambar-ku", gambarKu);


//aldi pradana
