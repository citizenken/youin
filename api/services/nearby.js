var settings = sails.config.nearby;

module.exports = {
  boundingBox : function(coordinates, radius) {
    var lat = parseFloat(coordinates[0]),
    lon = parseFloat(coordinates[1]),
    radius = parseFloat(radius),
    units = settings.units,
        
    boundingBox = {
      lowLat : lat - (radius / this.latDegreesDistance(units)),
      lowLon : lon - (radius / this.lonDegreesDistance(lat, units)),
      highLat : lat + (radius / this.latDegreesDistance(units)),
      highLon : lon + (radius / this.lonDegreesDistance(lat, units))
     }
    
    return boundingBox;
    
  },
  
  latDegreesDistance : function(units) {   
    return (2 * Math.PI * this.earthRadius(units) / 360);
  },
  
  lonDegreesDistance : function(latitude, units) {
    return this.latDegreesDistance(units) * Math.cos(this.toRad(latitude));
  },
    
  earthRadius : function(units) {    
    switch(units) {
        case 'mi':
          return this.toMiles(settings.earthRadius)
          break;
        case 'km':
          return settings.earthRadius;
          break;          
      }
    },
  
  toMiles : function(km) {  
    return km * settings.kmInMi;
  },
  
  toRad : function(degrees) {  
    return degrees * Math.PI / 180;
  }
     
}