//Wendel Cavalcante
import axios from "axios";

const seguranca = axios.create({
  baseURL: "https://sinapses-backend.ia.pje.jus.br/rest/usuario",
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  }
});

const peticao = axios.create({
  baseURL: "https://sinapses-backend-web.ia.pje.jus.br/rest/modelo/executarServico/-/cls_verifica_peticao_inicial/9", 
  headers: {
    "Content-type": "application/json"
  }
});

export { seguranca, peticao };