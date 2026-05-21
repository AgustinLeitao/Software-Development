#!/bin/bash

ayuda() # Funcion para mostrar ayuda
{
	echo "Invocacion al script : $0 [Archivo_De_Texto][Delimitador]"
    echo "Donde [Archivo_De_Texto] especifica el archivo a procesar por el script. Debe existir y debe tener permisos de lectura"
    echo "Ejemplo : $0 .\Texto.txt ;"
}

if [[ $1 == "-?" || $1 == "-h" || $1 == "-help" ]]; then
	ayuda
	exit 0
fi

if test $# -ne 2 ; then
	echo "Error: La cantidad de parametros es incorrecta."
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test -f $1 ; then
	echo "Error: El archivo $1 no existe o no corresponde a un archivo regular"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

tipoArchivo=$(mimetype --output-format %m $1) # Obtenemos el tipo de archivo, para validar que sea de texto.
regex="^text/"
if [[ !($tipoArchivo =~ $regex) ]]; then
	echo "Error: El archivo $1 no corresponde a un archivo de texto"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1  
fi          

if ! test -r $1 ; then
	echo "Error: El archivo $1 no posee permisos de lectura"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test -s $1 ; then
	echo "Error: El archivo $1 esta vacio"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test $(echo $2 | egrep "^[[:punct:]]$") ;then
	echo "Error: El delimitador $2 debe ser un simbolo de la clase [[:punct:]] de POSIX"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

archivo_ok=$(echo $1 | cut -d "." -f1)
archivo_ok="$archivo_ok.ok"
if test -e $archivo_ok ;then
	rm $archivo_ok
fi
archivo_error=$(echo $1 | cut -d "." -f1)
archivo_error="$archivo_error.err"
if test -e $archivo_error ;then
	rm $archivo_error
fi

awk -F$2 -v filename=$1 -f ejercicio1.awk $1

if test -e $archivo_ok ;then
	echo "Reporte registros validos guardado en ./$archivo_ok"
fi
if test -e $archivo_error ;then
	echo "Reporte errores guardado en ./$archivo_error"
fi

#EOF
