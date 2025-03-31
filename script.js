// script.js

// Clave API proporcionada
const API_KEY = "bhaJk3X5EmnBRZbCjjnbCrFQI8AMhyCdJTLn347K";

// Función para obtener la Imagen Astronómica del Día
async function getAstronomyImage(date) {
    try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
        const response = await fetch(url);
        const data = await response.json();

        // Mostrar los datos en la página
        const image = document.getElementById("apod-image");
        const title = document.getElementById("apod-title");
        const description = document.getElementById("apod-description");

        image.src = data.url;
        title.textContent = data.title;
        description.textContent = data.explanation;
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
    }
}

// Función para eliminar la imagen buscada
function removeAstronomyImage() {
    document.getElementById("apod-image").src = "";
    document.getElementById("apod-title").textContent = "";
    document.getElementById("apod-description").textContent = "Imagen eliminada.";
}

// Agregar eventos de búsqueda y eliminación
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-apod");
    const removeButton = document.getElementById("remove-apod");

    searchButton.addEventListener("click", () => {
        const dateInput = document.getElementById("date-apod").value;
        getAstronomyImage(dateInput);
    });

    removeButton.addEventListener("click", removeAstronomyImage);
});






// Función para obtener imágenes del Mars Rover
async function getMarsImages(date) {
    try {
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        const marsImagesContainer = document.getElementById("mars-images");
        marsImagesContainer.innerHTML = ""; // Limpiar contenedor

        if (data.photos.length > 0) {
            data.photos.forEach(photo => {
                const img = document.createElement("img");
                img.src = photo.img_src;
                img.alt = "Mars Rover Photo";
                img.style.maxWidth = "100%";
                img.style.marginBottom = "10px";
                marsImagesContainer.appendChild(img);
            });
        } else {
            marsImagesContainer.innerHTML = `<p>No se encontraron imágenes para esta fecha.</p>`;
        }
    } catch (error) {
        console.error("Error al obtener las imágenes de Marte:", error);
    }
}

// Función para eliminar las imágenes buscadas
function removeMarsImages() {
    const marsImagesContainer = document.getElementById("mars-images");
    marsImagesContainer.innerHTML = `<p>Imágenes eliminadas.</p>`;
}

// Agregar eventos de búsqueda y eliminación
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-mars");
    const removeButton = document.getElementById("remove-mars");

    searchButton.addEventListener("click", () => {
        const dateInput = document.getElementById("date-mars").value;
        getMarsImages(dateInput);
    });

    removeButton.addEventListener("click", removeMarsImages);
});









// Función para obtener imágenes satelitales
async function getSatelliteImages(lat, lon, date) {
    try {
        const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&dim=0.1&api_key=${API_KEY}`;
        const response = await fetch(url);

        // Verificar si la respuesta tiene contenido
        if (!response.ok) {
            throw new Error("No se encontraron imágenes para estas coordenadas y fecha.");
        }

        const imageUrl = response.url; // URL de la imagen
        const satelliteImagesContainer = document.getElementById("satellite-images");
        satelliteImagesContainer.innerHTML = ""; // Limpiar contenedor previo

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Satellite Image";
        img.style.maxWidth = "100%";
        img.style.marginBottom = "10px";

        satelliteImagesContainer.appendChild(img);
    } catch (error) {
        console.error("Error al obtener las imágenes satelitales:", error);
        const satelliteImagesContainer = document.getElementById("satellite-images");
        satelliteImagesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Función para eliminar las imágenes buscadas
function removeSatelliteImages() {
    const satelliteImagesContainer = document.getElementById("satellite-images");
    satelliteImagesContainer.innerHTML = `<p>Imágenes eliminadas.</p>`;
}

// Agregar eventos de búsqueda y eliminación
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-satellite");
    const removeButton = document.getElementById("remove-satellite");

    searchButton.addEventListener("click", () => {
        const latInput = document.getElementById("lat-satellite").value;
        const lonInput = document.getElementById("lon-satellite").value;
        const dateInput = document.getElementById("date-satellite").value;

        if (latInput && lonInput && dateInput) {
            getSatelliteImages(latInput, lonInput, dateInput);
        } else {
            alert("Por favor, ingresa latitud, longitud y fecha.");
        }
    });

    removeButton.addEventListener("click", removeSatelliteImages);
});










// Función para obtener datos de Objetos Cercanos a la Tierra (NEO)
async function getNeoData(startDate, endDate) {
    try {
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        const neoContainer = document.getElementById("neo-data");
        neoContainer.innerHTML = ""; // Limpiar contenedor previo

        if (data.near_earth_objects) {
            for (const date in data.near_earth_objects) {
                const asteroids = data.near_earth_objects[date];
                asteroids.forEach(asteroid => {
                    const asteroidElement = document.createElement("div");
                    asteroidElement.classList.add("asteroid");
                    asteroidElement.innerHTML = `
                        <h3>${asteroid.name}</h3>
                        <p>Fecha de acercamiento: ${asteroid.close_approach_data[0].close_approach_date}</p>
                        <p>Distancia: ${asteroid.close_approach_data[0].miss_distance.kilometers} km</p>
                        <p>Diámetro: ${(asteroid.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2)} km</p>
                    `;
                    neoContainer.appendChild(asteroidElement);
                });
            }
        } else {
            neoContainer.innerHTML = `<p>No se encontraron asteroides cercanos en este rango de fechas.</p>`;
        }
    } catch (error) {
        console.error("Error al obtener los datos NEO:", error);
        document.getElementById("neo-data").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Función para eliminar los datos NEO buscados
function removeNeoData() {
    const neoContainer = document.getElementById("neo-data");
    neoContainer.innerHTML = `<p>Datos eliminados.</p>`;
}

// Agregar eventos de búsqueda y eliminación
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-neo");
    const removeButton = document.getElementById("remove-neo");

    searchButton.addEventListener("click", () => {
        const startDate = document.getElementById("start-date-neo").value;
        const endDate = document.getElementById("end-date-neo").value;

        if (startDate && endDate) {
            getNeoData(startDate, endDate);
        } else {
            alert("Por favor, ingresa el rango de fechas.");
        }
    });

    removeButton.addEventListener("click", removeNeoData);
});








// Función para obtener datos de exoplanetas
async function getExoplanetData() {
    try {
        const url = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        const exoplanetsContainer = document.getElementById("exoplanets-data");
        exoplanetsContainer.innerHTML = ""; // Limpiar contenedor previo

        if (data.length > 0) {
            data.slice(0, 10).forEach(exoplanet => { // Limitar a 10 resultados
                const exoplanetElement = document.createElement("div");
                exoplanetElement.classList.add("exoplanet");
                exoplanetElement.innerHTML = `
                    <h3>${exoplanet.pl_name}</h3>
                    <p>Estrella anfitriona: ${exoplanet.hostname}</p>
                    <p>Radio del planeta: ${exoplanet.pl_radj} radios terrestres</p>
                    <p>Distancia: ${exoplanet.sy_dist} parsecs</p>
                `;
                exoplanetsContainer.appendChild(exoplanetElement);
            });
        } else {
            exoplanetsContainer.innerHTML = `<p>No se encontraron datos de exoplanetas.</p>`;
        }
    } catch (error) {
        console.error("Error al obtener datos de exoplanetas:", error);
        document.getElementById("exoplanets-data").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Función para eliminar los datos de exoplanetas
function removeExoplanetData() {
    const exoplanetsContainer = document.getElementById("exoplanets-data");
    exoplanetsContainer.innerHTML = `<p>Datos eliminados.</p>`;
}

// Agregar eventos de búsqueda y eliminación
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-exoplanets");
    const removeButton = document.getElementById("remove-exoplanets");

    searchButton.addEventListener("click", getExoplanetData);
    removeButton.addEventListener("click", removeExoplanetData);
});


