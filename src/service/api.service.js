//Wendel Cavalcante
import { seguranca, peticao } from "./axios-config";
import { TOKEN_KEY, getToken } from './auth';
import { Buffer } from "buffer";

export const DataService = {
    async autenticar(login, senha) {
        let token = "";
        const response = await seguranca.post("/autenticarUsuario", { login: login, senha: senha });
        token = response.data;
        console.log(token);
        return token;
    },

    async validaDocumento(texto) {
        let result = {};
        let token = getToken(TOKEN_KEY);
        let texto64 = Buffer.from(texto).toString('base64');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await peticao.post("", {
                "mensagem": {
                    "tipo": "TEXTO",
                    "conteudo": texto64
                },
                "quantidadeClasses": 2
            }, config);
            result = response.data;
        } catch (err) {
            console.log("erro: "+err);
        }
          return result;
    }
};