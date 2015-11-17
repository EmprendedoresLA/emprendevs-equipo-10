# hackathon - equipo 10
STREAM TV: Para que todos disfruten la experiencia de ver television en vivo por internet.


STREAM TV ANALYTICS: Reporte de ratings en informacion de audiencias de alta calidad para canales de television.

Front End: branch frontend


La interface grafica esta centrada a ser responsive para adaptarse a todos los dispositivos y ofrece una vista simple y clara de los contenidos mediante widgets.

Sesiones: Widget que controla los aspectos del perfil del usuario: Nombre, apellido, sexo, edad, etc.

Alertas: Para no perderse los programas favoritos.

Calendario de programacion: LA guia de programas y canales, para saber que y cuando de lo que queres ver.

Favoritos: Todo lo que te gusta y esta pronto a salir al aire.

Trending: Para que no quedes como un colgado en la oficina, enterate la tendencia de lo que se esta viendo. 

Recomendado: Lo nuevo, o lo que nos parece que tenes que ver. 

Redes Sociales: Para compartir lo que estas viendo en este momento y para seguir de cerca a tus programas favoritos.




Conexiones PeerToPeer: New branch rt-coneccion


WebRTC (Web Real-Time Communication) es una API que está siendo elaborada por la World Wide Web Consortium (W3C) para permitir la comunicacion entre browsers.




Para ver videos en vivo mediante cdn implica que el servidor deba conectarse con cada cliente, implicando que deba necesitarse, en algunos casos, demasiado ancho de banda. Mediante la conexion realizada con peer to peer no ocurre esto, ya que el servidor se conecta con clientes, y su vez los clientes se conectan con otros cliente, reduciendo el ancho de banda a contratar para los servidores, reduciendo costos y aumentando la performance del sistema.

Ruteo:
	Este servicio de nodejs, atiende la peticion de un cliente que requiere un video. Intentando crear una conexion p2p con otro cliente que este reproduciendo el mismo video en ese momento. En caso de no ser posible, el servidor se encarga de entregar el video al primer cliente, una vez hecho esto, el cliente comienza a entregar el mismo video a otros clientes que lo requieran.


flow chart ->  http://k30.kn3.net/6/F/4/3/4/2/177.png


Consta de 2 esquemas en mongodb.
El primero se llama Videos se encuentra el id unico del cliente, el video solicitado, y un estado que puede ser, "buscando", "listo" o "compartiendo".
	Buscando: hace referencia a un cliente que espera una conexion peer to peer para comenzar a recibir el video.
	Listo: hace refencia al estado en que el cliente esta reproduciendo el video y en condiciones de ofrecerlo a otro cliente.
	Compartiendo: Cuando el cliente se encuentra viendo el video y a su vez compartiendolo con otro cliente a travez de peer to peer.

El segundo esquema llamado Conect almacena 3 valores idFeed, idClient y estado. 
	idFeed: es la id del cliente capaz de compartir el video hacia otro cliente.
	idClient: es la id del cliente que esta recibiendo el video.
	Estado: es el estado en el que se encuentra la conexion "true" o "false".

