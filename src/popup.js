document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('view').addEventListener('click',
  onclick, false)
  function onclick() {
    arb();
  }
}, false)

  function numberFormat(number, decimals, decPoint, thousandsSep) {
         number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
         var n = !isFinite(+number) ? 0 : +number
         var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
         var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
         var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
         var s = ''
         var toFixedFix = function (n, prec) {
           var k = Math.pow(10, prec)
           return '' + (Math.round(n * k) / k)
             .toFixed(prec)
         }
         // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
         s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
         if (s[0].length > 3) {
           s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
         }
         if ((s[1] || '').length < prec) {
           s[1] = s[1] || ''
           s[1] += new Array(prec - s[1].length + 1).join('0')
         }
         return s.join(dec)
  }

  function httpGet(theUrl)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
      xmlHttp.send( null );
      return  xmlHttp.responseText;
  }

  function arb()
  {
   var jsonBat = httpGet("https://broker.batexchange.com.br/api/v3/ethbrl/ticker")
   var jsonTemETH = httpGet("https://broker.tembtc.com.br/api/v3/btceth/ticker");
   var jsonTemBTC = httpGet("https://broker.tembtc.com.br/api/v3/btcbrl/ticker");
   var jsonNeg = httpGet("https://broker.negociecoins.com.br/api/v3/btcbrl/ticker");

   var resultBat = JSON.parse(jsonBat);
   var resultTEMETH = JSON.parse(jsonTemETH);
   var resultTEMBTC = JSON.parse(jsonTemBTC);
   var resultNEG = JSON.parse(jsonNeg);

   var SPREAD1 = (((resultNEG["last"] / resultTEMBTC["last"])-1) * 100)
   var LUCRO1 = SPREAD1 - 1.5;
   var SPREAD2 = (((resultNEG["last"] * resultTEMETH["last"]) / resultBat["last"] ) -1 ) * 100
   var LUCRO2 = SPREAD2 - 2.0;

   document.getElementById('SPREADC1').innerHTML = numberFormat(SPREAD1,4,',','.') + '%';
   document.getElementById('LUCROC1').innerHTML =  numberFormat(LUCRO1,4,',','.') + '%';
   document.getElementById('SPREADC2').innerHTML = numberFormat(SPREAD2,4,',','.') + '%';
   document.getElementById('LUCROC2').innerHTML =  numberFormat(LUCRO2,4,',','.') + '%';
   document.getElementById('BATVALUE').innerHTML = "R$ " + numberFormat(resultBat["last"],2,',','.');
   document.getElementById('TEMVALUE').innerHTML = "R$ " + numberFormat(resultTEMBTC["last"],2,',','.');
   document.getElementById('NCVALUE').innerHTML = "R$ " + numberFormat(resultNEG["last"],2,',','.');
  }
