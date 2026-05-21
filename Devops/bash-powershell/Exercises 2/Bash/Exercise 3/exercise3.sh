#!/bin/bash

ayuda() # Funcion para mostrar ayuda
{
	echo "Invocacion al script : $0 [Archivo_De_Configuracion][Clave][Valor]"
    echo "Donde [Archivo_De_Texto] especifica el archivo a procesar por el script. Debe existir y debe tener permisos de lectura"
	echo "Donde [Clave] especifica la clave a agregar o a modificar en el archivo de configuracion"
	echo "Donde [Valor] especifica el nuevo valor o el valor a modificar en la Clave"
    echo "Ejemplo : $0 /etc/nn.conf INIT Nuevo_Valor"
}

if [[ $1 == "-?" || $1 == "-h" || $1 == "-help" ]]; then
	ayuda
	exit 0
fi

if test $# -ne 3 ; then
	echo "Error: La cantidad de parametros es incorrecta."
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test -e $1 ; then
	echo "Error: El archivo $1 no existe"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test -r $1 ; then
	echo "Error: El archivo $1 no posee permisos de lectura"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test -w $1 ; then
	echo "Error: El archivo $1 no posee permisos de escritura"
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

if ! test -s $1 ; then
	echo "Error: El archivo $1 esta vacio"
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

FECHA=$(date +"%d/%m/%Y")
IFS=""
while read linea
do	
	if test $(echo $linea | egrep "^$2 =") ;then
		sed -i "s/#.*//" $1
	fi
done < $1

sed -i -e "s|\(^$2\) = \([a-zA-Z0-9 ./]*\)|\1 = $3    #Usuario= $USER - Fecha= $FECHA - Antiguo_Valor= \2|" $1

marca=0
while read linea
do	
	if test $(echo $linea | egrep "^$2 = $3") ;then
		marca=1
	fi
done < $1

if test $marca -eq 0 ;then
	echo "$2 = $3    #Usuario= $USER - Fecha= $FECHA" >> $1
fi
#EOF
