# Market Data Fetcher

Esta aplicación recupera datos económicos y de calendario de ganancias utilizando la API de Trading View y datos del mercado de Seeking Alpha. Utiliza `axios` para realizar solicitudes HTTP y `moment` para manejar fechas.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Puntos de la API](#puntos-de-la-api)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/yourusername/market-data-fetcher.git
   cd market-data-fetcher

   Instala las dependencias:

2. Instala las dependencias:
npm install

## Uso
Asegúrate de tener tu clave API de RapidAPI.

Modifica configAPIs.js para incluir tu clave API.

Ejecuta la aplicación:
node app.js

## Estructura del proyecto
project/
├── app.js          # Punto de entrada principal
├── api             # Módulo para manejar solicitudes API
│   ├── fetchers.js # Funciones para recuperar datos de las APIs
├── config          # Configuraciones y claves API
│   ├── configAPIs.js
└── utils           # Funciones utilitarias
    ├── dates.js    # Funciones de manejo de fechas


## Configuración
Actualiza el archivo config/configAPIs.js con tu clave API y los hosts:

// config/configAPIs.js
module.exports = {
  rapidApiKey: "your-rapidapi-key",
  rapidApiTradingViewHost: "trading-view.p.rapidapi.com",
  rapidApiSeekingAlphaHost: "seeking-alpha.p.rapidapi.com",
};


## Contribuciones
1. Haz un fork del repositorio.
2. Crea una rama para tu característica (git checkout -b feature/your-feature-name).
3. Haz commit de tus cambios (git commit -m 'Añadir nueva característica').
4. Push a la rama (git push origin feature/your-feature-name).
5. Abre un pull request.


## Licencia
Este proyecto está licenciado bajo la Licencia MIT.