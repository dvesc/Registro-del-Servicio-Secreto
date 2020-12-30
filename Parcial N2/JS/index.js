/* 
  ape = apellido
  apli = aplica
  c = casos
  ci = cedula
  cod = codificado/s
  cont = contiene
  dec = decodificado/s
  elem = elemento
  emp = empleados
  div/s = <div>/s
  inp/s = input/s
  insp = inspeccion
  inv = investigador/es
  nom = nombre
  nres= no resueltos
  rec = record
  res= resueltos
  tab = tabla
  uni/s = unidad/es
  val = valor o 'value'
*/
import Investigador from "./class_Invertigador.js";

let inpsDeUnis = 1;
const $d = document,
  $inpDeNom = $d.querySelector(".inp-de-nom"),
  $inpDeApe = $d.querySelector(".inp-de-ape"),
  $inpDeCi = $d.querySelector(".inp-de-ci"),
  $inpDeFecha = $d.querySelector(".inp-de-fecha"),
  $contDivsDeUnis = $d.querySelector(".cont-divs-de-unis"),
  $btnRemInpDeUni = $d.querySelector(".rem-inp-de-uni"),
  $btnAddInpDeUni = $d.querySelector(".add-inp-de-uni"),
  $contTabDeInv = $d.querySelector(".cont-tab-de-inv"),
  $tabDeInv = $d.querySelector(".tab-de-inv"),
  $inpDeInsp = $d.querySelector(".inp-de-insp"),
  $tabDeInsp = $d.querySelector(".tab-de-insp"),
  arrDeInv = [],
  apliDisplayASecction = elem => {
    elem.classList.add("display");
    elem.nextElementSibling.classList.remove("display");
  };

$d.addEventListener("DOMContentLoaded", () => {
  $d.addEventListener("click", e => {
    if (
      e.target.matches(".muestra-form-de-inv") ||
      e.target.matches(".insp-inv") ||
      e.target.matches(".ver-datos")
    )
      apliDisplayASecction(e.target);
    //-------------------------------------------------------------------------
    switch (e.target.className) {
      case "add-inp-de-uni":
        $btnRemInpDeUni.classList.remove("display");
        inpsDeUnis++;
        $contDivsDeUnis.insertAdjacentHTML(
          "beforeend",
          `<div class="div-de-uni">
            <input type="text" 
              placeholder="Nombre o Distribucion..." 
              class="nom-de-uni"/>
            <input type="text" 
              placeholder="Numero de empleados..." 
              class="num-de-empleados" 
              title="Solo se permien numeros / Maximo de Empleados: 15" 
              pattern="^([1-9]{1}|[1]{1}[0-5]{1})$" required/>
            <input type="text" 
              placeholder="N. de casos Resueltos..." 
              class="c-resueltos" title="Solo se permiten numeros" 
              pattern="[0-9]{1,}" required/> 
            <input type="text" 
              placeholder="N. de casos no Resueltos..." 
              class="c-no-resueltos" title="Solo se permiten numeros" 
              pattern="[0-9]{1,}" required/>
          </div>`
        );
        if (inpsDeUnis === 4) e.target.classList.add("display");
        break; 
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      case "rem-inp-de-uni":
        inpsDeUnis--;
        $contDivsDeUnis.removeChild($contDivsDeUnis.lastElementChild);
        if (inpsDeUnis === 1) e.target.classList.add("display");
        if (inpsDeUnis === 3) $btnAddInpDeUni.classList.remove("display");
        break;
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      case "ver-datos-dec":
      case "ver-datos-cod":
        let invDecCod;
        $contTabDeInv.classList.remove("display");
        $tabDeInv.innerHTML = "";
        e.target.className === "ver-datos-dec"
          ? (invDecCod = arrDeInv.map(inv => inv.sinCod))
          : (invDecCod = arrDeInv);
        invDecCod.forEach(inv => 
          $tabDeInv.insertAdjacentHTML(
            "beforeend",
            `<tr>
              <td>${inv.ci}</td>
              <td>${inv.nom}</td>
              <td>${inv.ape}</td>
              <td>${inv.fecha}</td>
              <td>${
                e.target.className === "ver-datos-cod"
                  ? Math.round(Math.random() * (500 - 50 + 1) + 50)
                  : inv.unis.length
              }</td>
            </tr>` 
          )
        );
        break;
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      case "inv-con-rec":
        let recCRes = 0,
          invConRec;
        if (arrDeInv.length > 0) {
          arrDeInv.forEach(inv => {
            let cResDelInv = 0;
            inv.sinCod.unis.forEach(uni => 
              (cResDelInv = cResDelInv + uni.cRes)
            );
            if (cResDelInv >= recCRes) {
              recCRes = cResDelInv;
              invConRec = inv.sinCod;
            }
          });
          apliDisplayASecction(e.target);
          e.target.nextElementSibling.innerHTML = 
            `<p> 
              "${invConRec.nom} ${invConRec.ape}" 
              propietari@ de la Cedula de identidad N.
              "${invConRec.ci}" posee ${recCRes} casos resueltos
            </p>
            <input 
              type="button" 
              class="cerrar" 
              value="Cerrar" 
            />`
          ;
        } else 
          alert("Aun no tenemos los datos necesarios para esta peticion");
        break;
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      case "cerrar":
        e.target.parentElement.classList.add("display");
        e.target.parentElement.previousElementSibling.classList.remove(
          "display"
        );
        break;
    }
  });
  //===========================================================================
  $d.addEventListener("submit", e => {
    e.preventDefault();
    if (e.target.matches(".submit-inv")) {
      let valDeLosImpsDeLasUnis = [];
      $d.querySelectorAll(".div-de-uni").forEach(divDeUni =>
        valDeLosImpsDeLasUnis.push({
          nomDeUni: divDeUni.children[0].value,
          emp: parseInt(divDeUni.children[1].value),
          cRes: parseInt(divDeUni.children[2].value),
          cNRes: parseInt(divDeUni.children[3].value)
        })
      );
      arrDeInv.push(
        new Investigador(
          $inpDeNom.value,
          $inpDeApe.value,
          $inpDeCi.value,
          $inpDeFecha.value,
          valDeLosImpsDeLasUnis
        )
      );
      inpsDeUnis = 1;
      $btnRemInpDeUni.classList.add("display");
      $d.querySelectorAll(".div-de-uni").forEach((divDeUni, index) => {
        if (index > 0) $contDivsDeUnis.removeChild(divDeUni);
      });
    }
    //-------------------------------------------------------------------------
    else {
      let invAInsp = arrDeInv.filter(inv => inv.ci === $inpDeInsp.value);
      $tabDeInsp.innerHTML = "";
      if (invAInsp.length > 0){
        apliDisplayASecction(e.target.parentElement);
        invAInsp[0].sinCod.unis.forEach(uni =>
          $tabDeInsp.insertAdjacentHTML(
            "beforeend",
            `<tr>
              <td>${uni.nomDeUni}</td>
              <td>${uni.cRes}</td>
              <td>${uni.cNRes}</td>
              <td>${Math.round((uni.cRes * 100) / (uni.cNRes + uni.cRes))}%
              </td>
            </tr>`
            )
          );
        } else alert("No logramos encontrarlo");
    }
    e.target.reset();
  });
});
