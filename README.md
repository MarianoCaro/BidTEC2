# 🪙BidTEC

[![Subasta_BidTEC](https://dircomfidencial.com/wp-content/uploads/2021/04/Sin-titulo.png "Subasta_BidTEC")](https://dircomfidencial.com/wp-content/uploads/2021/04/Sin-titulo.png "Subasta_BidTEC")

BidTEC es un sistema para organizar subastas descentralizadas, donde los usuarios podrán pujar utilizando tokens NEAR y el contrato inteligente gestionaría la subasta. 

# Lo que se espera 

1. Instalar las dependencias necesarias.
2. Acceder y analizar el contrato inteligente que se desarrolló utilizando la tecnología `NEAR`.
3. Probar el contrato realizando pruebas unitarias.
4. Desplegar el contrato en la red usando `testnet`.
5. Realizar peticiones al contrato inteligente.


# Iniciar

Clona este repositorio localmente o [**ábrelo en Gitpod**](https://gitpod.io/#/github.com/near-examples/guest_book-js), luego sigue estos pasos:

### 1. Instalar las dependencias
Para instalar las dependencias, debemos dirigirnos a la terminal y escribir el siguiente comando:  `npm install`

### 2. Abrir el contrato inteligente
Para ello, nos dirigimos al archivo `contract.ts`

### 3. Analizar el código del contrato
Al abrir el archivo que contiene nuestro contrato inteligente, nos encontraremos con una clase principal llamada `Subasta`, la cual cuenta con un vector que almacena objetos de tipo MakeBid y una variable que actúa como acumulador para el total de créditos.

    class Subasta {
    bids: Vector<MakeBid> = new Vector<MakeBid>("v-uid");
    totalx: number = 0;
	...

Después, tenemos la función `add_bid`, que se llama cuando se realiza una oferta y está marcada con `@call`, indicando que es una función modificadora del estado del contrato.

    @call({ payableFunction: true })
    add_bid( {cantidad} : {cantidad : number}): void {

La función `total_bid` está marcada con `@view`, lo que indica que es solo de lectura y no modifica el estado del contrato. Solo imprime en la consola algunos detalles relacionados con las ofertas almacenadas y devuelve un mensaje describiendo el total de ofertas.

    @view({})
    total_bid(): string {
    
    
# Ejecución
### 1. Probar el contrato
Después de analizar el funcionamiento del código del contrato, podemos realizar pruebas. Para ello, nos dirigimos a la terminal y escribimos el siguiente comando: `npm test`

**Nota**
Si al ejecutar el comando nos arroja lo siguiente:
>`./build.sh: Permission denied`

Basta con conceder permisos al archivo, por lo que debemos escribir el siguiente comando para solucionarlo:
                    
>`chmod +x contract/build.sh`

### 2. Desplegar el contrato
Para finalizar, se realizará el despliegue del contrato en un entorno de pruebas para simular las interacciones por parte de usuarios. Para ello, debemos tener una cuenta creada en testnet. Si aún no la tienes, [**creala aquí**](https://testnet.mynearwallet.com/). Necesitamos crear una cuenta personal y otra para el proyecto.

Ahora, en la terminal, iniciamos sesión usando `near login` y luego escribimos:
```bash
  ./deploy.sh
```
```bash
  near deploy bidtec.testnet contract/build/contract.wasm
```

**Nota**
>`bidtec.testnet`

Es la cuenta del proyecto creada en testnet.

### 3. Realizar peticiones 
Ahora ejecutaremos la función `total_bid` anteriormente analizada para consultar la información actual sobre las ofertas acumuladas en el contrato. En la terminal, debemos escribir:
```bash
 near view bidtec.testnet total_bid
```
Después, ejecutamos la función `add_bid` intentado realizar una oferta de 1 crédito al contrato  `bidtec.testnet` desde la cuenta  `marianoc14.testnet`
```bash
near call bidtec.testnet add_bid '{"cantidad": 1}' --amount 0.1 --accountId marianoc14.testnet
```

**Nota**
>`marianoc14.testnet`

Es el nombre de la cuenta personal que se creó en testent.
