#!/bin/bash

ayuda() # Funcion para mostrar ayuda
{
	echo "Invocacion al script : $0 [Archivo_De_Texto]"
    echo "Donde [Archivo_De_Texto] especifica el archivo a procesar por el script. Debe existir y debe tener permisos de lectura"
    echo "Ejemplo : $0 .\Numeros.txt"
}

if [[ $1 == "-?" || $1 == "-h" || $1 == "-help" ]]; then
	ayuda
	exit 0
fi

if test $# -ne 1 ; then
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

#Bloque para validar el formato del archivo de texto
cont=0
while read numero
do
	let cont++
	cantcampos=$(echo $numero | wc -w)
	for (( i=1; i< $cantcampos +1 ; i++ ))  
	do
		valor=$(echo $numero | cut -d " " -f$i)
		if ! [[ $valor =~ ^-?[0-9]+$ ]] ; then
			echo "Error: El formato del archivo $1 no es correcto. Todos los valores del archivo deben ser enteros" 
			echo "Linea: $cont . Valor: $valor"
			echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
			exit 1
		fi 		
	done
done < $1
#Fin Bloque

echo -n "Operacion Matematica Realizada: "
cantlineas=$(wc -l $1 | cut -d " " -f1) # Obtenemos la cantidad de lineas del archivo y eliminamos el nombre del archivo que devuelve el comando wc.
acu=1
cont=0

#Bloque para mostrar el resultado de la operacion
while read numero 
do
	(( cont=cont+1 ))
	cantcampos=$(echo $numero | wc -w)
	if [[ $cantcampos > 1 ]] ;then
		echo -n "("
	fi
	for (( i=1; i< $cantcampos +1 ; i++ ))  
	do
		(( acu*=$(echo $numero | cut -d " " -f$i) ))
		echo -n $(echo $numero | cut -d " " -f$i)
		if [[ $i != $cantcampos ]] ;then
			echo -n "*"
		fi
	done 
  	(( tot += acu ))
	acu=1
	echo -n ")"
	if [[ $cont < $cantlineas ]] ;then	  
		echo -n "+"
	fi
done < $1
echo
echo "Resultado: $tot"

#EOF
