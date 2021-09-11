<h1 align='center'> Rocket Wallet</h1>
  <p align='center'>
  <img alt='LogoPic' src='https://user-images.githubusercontent.com/76981775/131691831-36a1f1e7-bd6d-408d-9b77-9a02e0c7d679.png'   width='400px' height='400px' />
</p>

********

### ¿Qué es?

Se creó una App para dispositivo móvil que permite el intercambio de la divisa USD por la criptomoneda BTC la cual se efectúa con el precio del instante del BTC en el mercado de criptodivisas la cual se van guardando en una base de datos que nos permite simular la funcionalidad de una wallet real.

********

### ¿Cómo se hizo?


Se implementó tanto el back end, como el front end. En la parte del back end se utilizaron tecnologías como son:

* Ruby y Ruby On Rails que nos permitio desarrollar toda la parte de configuracion del back tanto el enrutamiento como los controladores .

* PostgreSQL que nos permite el uso de las bases de datos donde guardamos la información de los usuarios, tanto sus balances, registro de usuarios, movimientos de cada una de las cuentas que tenemos en el sistema.

* React Native que fue el que nos permitió el desarrollo de la aplicación que podemos adecuar tanto para los sistemas IOS como los sistemas ANDROID.

********

### STACK TECNOLÓGICO

| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" width="60" alt="HTML"> |<img src="https://reactnative.dev/img/header_logo.svg" width="60" alt="CSS"> | <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HthHc0sRMDt9sMMTFP6DuAHaE7%26pid%3DApi&f=1" width="60" alt="On Rails"> |<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.wemSvhcvUEoR2d6JPlMT0AHaDt%26pid%3DApi&f=1" width="60" alt="REACT">  | <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7AOhGDnRL2eyJMUidCHZEAHaDt%26pid%3DApi&f=1" width="60" alt="JS">  |
| :------------: | :------------: | :------------: | :------------: | :------------: | 
| CSS3  | React Native | Ruby On Rails | Ruby  | PostgreSQL | 


********

### FEATURES

Se implementó un sistema de inicio de sesión para los usuarios registrados en la cual podemos controlar el acceso con su contraseña correcta, también se creó la ruta de registro para los nuevos usuarios que quieran interactuar con nuestra aplicación, la cual tenemos de forma remota con ayuda de Heroku que nos permite tener la base de datos y nuestro back end en línea.


<p align="center">
<img  src="https://user-images.githubusercontent.com/76981775/130433621-7c8d31ed-bfd7-4ba0-ba15-a9af04bce69b.png" width="30%" height='500px'>
<img  src="https://user-images.githubusercontent.com/76981775/130433759-b4fc8f3d-4131-4785-8635-546fb7f77dbf.png" width="30%" height='500px'>
</p>

En nuestro ingreso por la plataforma tenemos la sesión de inicio donde por medio de un llamado a una API externa nos proporciona el precio del BTC en tiempo real y que se va a actualizando de acuerdo a fluctuación del mercado y de cada cierto tiempo que le hacemos llamado con ayuda de setInterval y de nuestro hooks como es el caso del UseEffect que nos proporciona la librería de REACT JS. 


<p align="center">
<img  src="https://user-images.githubusercontent.com/76981775/130434465-14fd9d59-63d8-4c6c-a738-a7bf524a2f5e.png" width="40%" height='550px'>
</p>

Tenemos otras sesiones que es donde realizamos las consultas de nuestras transacciones, el intercambio de USD a BTC y viceversa, siempre y cuando poseamos los fondos suficientes para realizar dicha transacción, la cual podemos comprobar con nuestro convertidor de divisa que se verá en las imágenes, en la sesión que debemos destacar es la cual podemos ver toda información detallada de dichas transacciones realizadas que nos muestra el tipo de operación, hora, fecha entre otros datos.


<p align="center">
<img  src="https://user-images.githubusercontent.com/76981775/130434735-5832e1c5-fbb9-4f6e-8787-2a2f222dd994.png" width="30%" height='500px'>
<img  src="https://user-images.githubusercontent.com/76981775/130434806-dfa3df3f-69ca-4b7c-8df0-bc825ffaacff.png" width="30%" height='500px'>
<img  src="https://user-images.githubusercontent.com/76981775/130434924-f18e20c0-70f4-4a06-b41e-ef3e89d9f8f6.png" width="30%" height='500px'>
</p>

********

### Más información 

✔ Video: <a href="https://www.youtube.com/watch?v=1x_WuUUaWuM" target="_blank">
ROCKET WALLET
</a> 




