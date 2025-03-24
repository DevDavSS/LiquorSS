const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCokKc54lXPpiSlxcA77Icgo7HU59Y9GhA`
      );
      const data = await response.json();
  
      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        console.log("Coordenadas obtenidas:", lat, lng); // Depuración
        return { latitude: lat, longitude: lng };  // Asegúrate de devolver un objeto con latitud y longitud
      } else {
        console.error("Error al obtener las coordenadas", data.status);
        return null;
      }
    } catch (error) {
      console.error("Error al consultar el servicio de geocodificación:", error);
      return null;
    }
  };

  export default getCoordinatesFromAddress;
  