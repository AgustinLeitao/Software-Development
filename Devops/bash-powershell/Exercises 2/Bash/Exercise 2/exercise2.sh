#!/bin/bash

# Nombre Del Script: ejercicio2.sh
# Trabajo Práctico Nro.: 2
# Ejercicio Nro: 2 BASH
# Entrega: Primera Entrega

marca=1
ayuda() # Funcion para mostrar ayuda
{
	echo "Invocacion al script : . ./ejercicio1.sh [Directorio][Cantidad_De_Procesos]"
	echo "El punto es necesario para poder setear correctamente la variable de entorno que contiene el PID del demonio"
    echo "Donde [Direcorio] especifica el directorio en donde estan los scrips a ejecutar por el demonio"
	echo "Donde [Cantidad_De_Procesos] especifica la cantidad de procesos a ejecutar por el demonio"
    echo "Ejemplo : . /ejercicio1.sh Scripts 4"
	marca=0
}

if [[ $1 == "-?" || $1 == "-h" || $1 == "-help" ]]; then
	ayuda
fi

if test $marca -ne 0 ;then
	if test $# -ne 2 ; then
		echo "Error: La cantidad de parametros es incorrecta."
		echo "Ingrese ./ejercicio1.sh -help para ver la ayuda acerca de la invocacion al script"
		marca=0
	fi

	if ! test -d $1 ; then
		echo "Error: El directorio $1 no existe o no corresponde a un directorio"
		echo "Ingrese ./ejercicio1.sh -help para ver la ayuda acerca de la invocacion al script"
		marca=0
	fi

	if ! test -r $1 ;then
		echo "Error: El directorio $1 no posee permisos de lectura"
		echo "Ingrese ./ejercicio1.sh -help para ver la ayuda acerca de la invocacion al script"
		marca=0
	fi
	if test $marca -ne 0 ;then
		if test $(echo $2 | egrep "^[0-9]+$") ;then
			if test $2 -le 0 ;then
				echo "Error: El parametro $2 debe ser un numero positivo mayor a 0"
				echo "Ingrese ./ejercicio1.sh -help para ver la ayuda acerca de la invocacion al script"
				marca=0
			fi
		else
			echo "Error: El parametro $2 debe ser un numero positivo mayor a 0"
			echo "Ingrese ./ejercicio1.sh -help para ver la ayuda acerca de la invocacion al script"
			marca=0
		fi
	fi

	demonioabierto=$(ps -d | grep -c "demonio.sh")
	if [[ $demonioabierto > 0 ]] ; then
		echo "Error: Ya hay un launcher en ejecucion"
		marca=0
	fi

	if test $marca -ne 0 ;then
		./demonio.sh $1 $2 &
		export Pid_Demonio=$!
		echo "PID Demonio.sh : $!"
		echo "Variable de entorno: Pid_Demonio"
	fi
fi

#EOF
