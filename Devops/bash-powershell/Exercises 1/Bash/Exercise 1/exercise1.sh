#!/bin/bash

if [ ! -w "." ] ; then # Se valida que el directorio en el cual es ejecutado el script tenga permisos de escritura
	echo "Necesita permisos de escritura en la carpeta"
	exit 1
fi
firefoxGeditAbierto=`ps -d | grep -ic -e firefox -e gedit` # Se guarda la cantidad de veces que esta abierto el proceso Firefox y Gedit
if [[ $firefoxGeditAbierto > 0 ]] ; then   # Si alguno de los 2 programas ya sea firefox o gedit esta abierto se finaliza el script
	echo "Debe estar cerrado el firefox y el gedit para que funcione el script"
	exit 1
fi
while( true )  # Ciclo infinito 
do
	firefox & # Ejecuta el proceso llamado firefox
	firefoxPid=$! # Guarda el pid del proceso firefox
	gedit & # Ejecuta el proceso llamado gedit
	geditPid=$! # Guarda el pid del proceso gedit
	echo "Firefox PID: $firefoxPid gedit PID: $geditPid" >> ejemplo2.txt # Hace un append al archivo ejemplo2.txt
	wait # Espera que los procesos gedit y firefox finalicen
	echo "Haz cerrado todos los procesos. Los reabriremos" >>ejemplo2.txt # Hace un append al archivo ejemplo2.txt
done

#EOF
