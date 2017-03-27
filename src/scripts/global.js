var cleanString = function(cadena) {
    var specialChars = "!@#$^&%*()'+=-[]\/{}|:<>?,";
    for (var i = 0; i < specialChars.length; i++) {
        cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    cadena = cadena.toLowerCase();
    cadena = cadena.replace(/\s/g, "-");
    cadena = cadena.replace(/[áàäâå]/gi, "a");
    cadena = cadena.replace(/[éèëê]/gi, 'e');
    cadena = cadena.replace(/[íìïî]/gi, 'i');
    cadena = cadena.replace(/[óòöô]/gi, 'o');
    cadena = cadena.replace(/[úùüû]/gi, 'u');
    cadena = cadena.replace(/[ýÿ]/gi, 'y');
    cadena = cadena.replace(/ñ/gi, 'n');

    return cadena;
};

var validateField = function(caracter) {
    var specialChars = "$%/";
    for (var i = 0; i < specialChars.length; i++) {
        caracter = caracter.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    return caracter;
};