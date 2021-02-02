# Chat em Node.js
Chat em Node.js feito para a disciplina de sistemas distribuidos

## Etapas do desenvolvimento

- [X] Comunicação TCP CLiente - Servidor
- [ ] Clean Code

### Para rodar é importante ter o Node.js na sua maquina
Você pode baixar neste <a href="https://nodejs.org/en/download/">link</a> ou usar um gerenciador de pacotes. Neste exemplo, utilizei os comandos npm.
```
$ npm install node
```
São necessárias algumas bibliotecas do node, listadas abaixo:
```
$ npm install http fs socket.io

```
#### Execute primeiro o servidor
```
$ node app.js
```
##### Depois vá no no seu navegador de internet e digite
```
127.0.0.1:7000
```

###### Preencha os campos para entrar no chat
<br>
<ul>
    <li>Nome : {Digite seu nome aqui}</li>
    <li>IP do servidor: 127.0.0.1</li>
    <li>Porta do servidor: 7000</li>
</ul>
<br>
Nomes repetidos nao sao permitidos. Caso o IP e a porta sejam diferentes do servidor, você não poderá entrar no chat
<br>

OBS: esse projeto teve como referência o projeto da DevMedia encontrado em:
<a href="https://www.devmedia.com.br/como-criar-um-chat-com-node-js/33719">https://www.devmedia.com.br/como-criar-um-chat-com-node-js/33719</a>

