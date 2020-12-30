/*
  ape = apellido
  apli = aplica
  bts = bits
  c = casos
  ci = cedula
  cod = codificado/s - codifica
  codi = codificando
  emp = empleados
  inv = investigador/es
  nom = nombre
  nres= no resueltos
  rec = record
  res= resueltos
  uni/s = unidad/es
 */
export default class Investigador {
  constructor(nom, ape, ci, fecha, unis) {
    this.nom = this.codNom(nom);
    this.ape = this.codApe(ape);
    this.ci = ci;
    this.fecha = this.codFecha(fecha);
    this.unis = this.codDatosDeUnis(unis);
    this.sinCod = {
      nom, ape, ci,
      fecha: fecha.split("-").reverse().join("/"),
      unis
    };
  }

  codNom(n) {
    let nCod = [],
      trozo1,
      trozo2,
      trozo3;
    n.split("").forEach(char => {
      (trozo1 = []), (trozo2 = []), (trozo3 = []);
      char
        .charCodeAt()
        .toString(2)
        .split("")
        .forEach((bit, index, arr) =>
          /[0-2]/.test(index)
            ? trozo1.push(bit)
            : new RegExp(`[3-${arr.length - 3}]`).test(index)
            ? trozo2.push(bit)
            : trozo3.push(bit)
        );
      nCod.push(
        String.fromCharCode(
          parseInt([...trozo3, ...trozo2, ...trozo1].join(""), 2)
        )
      );
    });
    return nCod.join("");
  } //-------------------------------------------------------------------------
  codApe(a) {
    let aCod = [],
      codi;
    a.split("").forEach(char => {
      codi = [];
      char
        .charCodeAt()
        .toString(2)
        .split("")
        .forEach((bit, index) => {
          if (index !== 0 && index % 2 == 0) bit = `,${bit}`;
          codi.push(bit);
        });
      codi = codi.join("").split(",");
      for (let i = 0; i < codi.length; i++)
        if (i % 2 === 0)
          codi[i] = codi[i]
            .split("")
            .reverse()
            .join("");
      aCod.push(String.fromCharCode(parseInt(codi.join(""), 2)));
    });
    return aCod.join("");
  } //-------------------------------------------------------------------------
  codFecha(f) {
    let fechaCod = f
      .split("-")
      .reverse()
      .map(date => parseInt(date));
    fechaCod = fechaCod.map((date, index) =>
      index === 0 
        ? (date = Math.abs(date-4)) 
        : index === 1 
        ? (date = Math.abs(date-3)) 
        : (date -= 5)
    );
    return fechaCod.join("/");
  } //-------------------------------------------------------------------------
  apliBts(unis, propiedad) {
    let cod = [],
      formateaBts;
    unis.forEach((uni, index) => {
      cod.push(
        parseInt(
          propiedad === "emp"
            ? uni.empleEnSuUni
            : propiedad === "cRes"
            ? uni.cRes
            : propiedad === "cNRes"
            ? uni.cNRes
            : uni.nomDeUni
        ).toString(2)
      );
      if (cod[index].length < 4) {
        formateaBts = cod[index].split("").reverse("");
        for (let i = formateaBts.length; i <= 3; i++) formateaBts.push(0);
        cod[index] = formateaBts.reverse("").join("");
      }
    });
    return cod;
  } //-------------------------------------------------------------------------
  codDatosDeUnis(u) {
    let cNRes = [];
    this.apliBts(u, "cNRes").forEach((elem, index, arr) => {
      if (arr.length > 1 && index !== 0 && index % 2 !== 0)
        cNRes.push([elem, arr[index - 1]].join(""));
      else cNRes.push(arr[0]);
    });
    return [
      {
        nomDeUni: parseInt(
          this.apliBts(u, "nomDeUni")
            .reverse()
            .join(""),
          2),
        emp: parseInt(
          this.apliBts(u, "emp")
            .reverse()
            .join(""),
          2),
        cRes: parseInt(this.apliBts(u, "cRes").join(""), 2),
        cNRes: parseInt(this.apliBts(u, "cNRes").join(""), 2)
      }
    ];
  }
}
