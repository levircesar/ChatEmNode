const express = require('express');
const socketIO = require('socket.io');
var app = express();
const INDEX = '/public/index.html';
var usuarios = []; // Lista de usuários
var ultimas_mensagens = []; // Lista com ultimas mensagens enviadas no chat


var ip_default = '127.0.0.1';
var port = 3000;

const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.sendFile(INDEX, { root: __dirname })
});
app.use(express.static("public"));
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

console.log("Aplicação está em execução...");

const io = socketIO(server);

io.on("connection", function(socket){
	// Método de resposta ao evento de entrar
	socket.on("entrar", function(apelido,ip,porta, callback){
		if(ip != ip_default){	
			callback(1);
		}else if(porta != port){
			callback(2);
		}else{
			if(!(apelido in usuarios)){
				socket.apelido = apelido;
				usuarios[apelido] = socket; // Adicionadno o nome de usuário a lista armazenada no servidor

				var mensagem = "[ " + pegarDataAtual() + " ] " + apelido + " acabou de entrar na sala";
				var obj_mensagem = {msg: mensagem, tipo: 'sistema'};

				io.sockets.emit("atualizar usuarios", Object.keys(usuarios)); // Enviando a nova lista de usuários
				io.sockets.emit("atualizar mensagens", obj_mensagem); // Enviando mensagem anunciando entrada do novo usuário

				callback(3);
			}else{
				callback(4);
			}
		}
	});


	socket.on("enviar mensagem", function(dados, callback){

		var mensagem_enviada = dados.msg;
		var usuario = dados.usu;
		var obj_mensagem22 = {msg: Object.keys(usuarios), tipo: ''};

		
		if (mensagem_enviada =="/USUARIO"){
			obj_mensagem22.tipo = 'privada';
			obj_mensagem22.msg = "**Mensagem Privada** usuarios online: "+ Object.keys(usuarios).length +" nomes: " + Object.keys(usuarios);
			socket.emit("atualizar mensagens", obj_mensagem22);
		}
		else if (mensagem_enviada =='/SAIR' ){
			socket.emit("eliminar usuario");
		}else{
			mensagem_enviada = "[ " + pegarDataAtual() + " ] " + socket.apelido + " : " + mensagem_enviada;
			var obj_mensagem = {msg: mensagem_enviada, tipo: ''};
		}
		
		if(usuario == null){
			usuario = ''; // Caso não tenha um usuário, a mensagem será enviada para todos da sala
		}
		if(usuario == ''){
			io.sockets.emit("atualizar mensagens", obj_mensagem);
		}else{
			return
		}
		
		callback();
	});

	
	socket.on("sair", function(){
		delete usuarios[socket.apelido];
		var mensagem = "[ " + pegarDataAtual() + " ] " + socket.apelido + " saiu da sala";
		var obj_mensagem = {msg: mensagem, tipo: 'sistema'};	
		io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
		io.sockets.emit("atualizar mensagens", obj_mensagem);

	});



	socket.on("disconnect", function(){
		
		if(socket.apelido){
			delete usuarios[socket.apelido];
			var mensagem = "[ " + pegarDataAtual() + " ] " + socket.apelido + " saiu da sala";
			var obj_mensagem = {msg: mensagem, tipo: 'sistema'};
			// No caso da saída de um usuário, a lista de usuários é atualizada
			// junto de um aviso em mensagem para os participantes da sala		
			io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
			io.sockets.emit("atualizar mensagens", obj_mensagem);
	
		}else{
			return 
		}
		
	});

});


// Função para apresentar uma String com a data e hora em formato DD/MM/AAAA HH:MM:SS
function pegarDataAtual(){
	var dataAtual = new Date();
	var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
	var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
	var ano = dataAtual.getFullYear();
	var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
	var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
	var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();

	var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
	return dataFormatada;
}

