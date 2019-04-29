console.log("##### viciclo started ####");
chrome.runtime.onMessage.addListener(function (request) {

  //compra
  //window.location = "https://broker.batexchange.com.br/usuario/privado/compravenda";
  if (confirm("Vou comprar ETH e retirar com todo o saldo ok?")) {
    setTimeout(function(){
      window.UseBalanceParaCompra(window.$("#ctl00_ContentPlaceHolder1_LiteralSaldoFiat").html());
      console.log("comprando...");
      window.$("#aEnviarCompra").click();
      window.$("#ctl00_ContentPlaceHolder1_TextBoxPINCompra").val(batPin);
      console.log("pin...");
      window.$("#ctl00_ContentPlaceHolder1_ButtonComprar").click();
      console.log("validando...");
    }, 3000);
    //transferToTem(request.batpin);
    //alert("primeiro test ok");
  }
})

function transferToTem()
{
  //window.location = "https://broker.batexchange.com.br/usuario/privado/retirada";
  wait(7000);
  $("#ctl00_ContentPlaceHolder1_RepeaterMoedas_ctl02_ButtonMoeda").click();
  console.log("transferindo...");
  wait(1000);
  UseBalanceParaRetiradaCoins($("#ctl00_ContentPlaceHolder1_LabelSaldoCoinsDisponivel").html());
  console.log("transferindo...");
  wait(1000);
  $("#aEnviarCoins").click();
  console.log("transferindo...");
}
