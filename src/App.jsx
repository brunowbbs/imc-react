import { useState } from "react";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const [erroPeso, setErroPeso] = useState("");

  const [imc, setImc] = useState(0);
  const [classificacao, setClassificacao] = useState("");
  const [cor, setCor] = useState("#95a5a6");

  function calcularIMC() {
    if (!peso || peso < 0) {
      setErroPeso("Informe um peso válido");
      return;
    }

    if (peso && peso > 0 && altura && altura > 0) {
      const IMC = Number(peso) / (Number(altura) * Number(altura));

      const CLASSIFICACAO = gerarClassificacao(IMC).classificacao;
      const COR = gerarClassificacao(IMC).cor;

      setClassificacao(CLASSIFICACAO);
      setCor(COR);
      setImc(IMC);
    } else {
      alert("Informe todos os dados corretamente para o cálculo");
    }

    setErroPeso("");
  }

  function gerarClassificacao(imcResultante) {
    let classificacao = "";
    let cor = "";

    if (imcResultante < 18.5) {
      classificacao = "MAGREZA";
      cor = "#e74c3c";
    } else if (imcResultante >= 18.5 && imcResultante <= 24.9) {
      classificacao = "NORMAL";
      cor = "#2ecc71";
    } else if (imcResultante >= 25 && imcResultante <= 29.9) {
      classificacao = "SOBREPRESO";
      cor = "#f1c40f";
    } else if (imcResultante >= 30 && imcResultante <= 39.9) {
      classificacao = "OBESIDADE";
      cor = "#f39c12";
    } else {
      classificacao = "OBESIDADE GRAVE";
      cor = "#9b59b6";
    }

    return {
      classificacao,
      cor,
    };
  }

  return (
    <div style={{ background: cor, height: "100vh" }}>
      <h1>Calculadora IMC</h1>

      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            placeholder="Informe o peso (em kg)"
            value={peso}
            onChange={(event) => setPeso(event.target.value)}
          />
          <span style={{ fontSize: 12, color: "#c0392b" }}>{erroPeso}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            placeholder="Informe a altura (em mts)"
            value={altura}
            onChange={(event) => setAltura(event.target.value)}
          />
        </div>
        <button style={{ height: 22 }} onClick={calcularIMC}>
          Calcular
        </button>
      </div>

      {imc && imc > 0 ? (
        <div>
          <h2>IMC: {imc.toFixed(2)}</h2>
          <h2>CLASSIFICAÇÃO: {classificacao}</h2>
        </div>
      ) : null}
    </div>
  );
}
