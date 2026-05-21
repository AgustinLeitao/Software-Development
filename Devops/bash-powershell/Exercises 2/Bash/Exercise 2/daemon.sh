#!/bin/bash

sigusr1_received=false
sigterm_received=false
marca=0
dir=$1
proc=$2

catch_sigterm ()
{
	if test $marca -ne 0 ;then
		echo "Señal Recibida: SIGTERM" >> "./Log_Demonio.txt"	
	else
		echo "Señal Recibida: SIGTERM" > "./Log_Demonio.txt"
	fi
	sigterm_received=true
	IFS=$oldifs
	exit 0
}
catch_sigusr1 () 
{ 
	if test $marca -ne 0 ;then
		echo "Señal Recibida: SIGUSR1" >> "./Log_Demonio.txt"
	fi
	if test $marca -eq 0 ;then
		DIA=$(date +"%d/%m/%Y")
		HORA=$(date +"%H:%M")
		echo "Señal Recibida: SIGUSR1" > "./Log_Demonio.txt"
		echo "Inicio de trabajo del launcher. Fecha:$DIA Hora:$HORA" >> "./Log_Demonio.txt"
		marca=1
	fi
	oldifs=$IFS
	IFS=""
	archivos=$(find $dir -type f -perm -u+x -iname "*.sh")
	cont=0
	IFS=$oldifs
	for var in ${archivos[@]}
	do
		let cont++
	done
	if test $cont -ne 0 ;then	
		IFS=""
		while read script
		do
			( $script & ) > /dev/null 2>&1 
			echo "Script Ejecutado: $script" >> "./Log_Demonio.txt"
		done < <(find $dir -iname '*.sh' -perm -u+x 2>/dev/null | sort -R | tail -$proc)
		wait
	fi
	while [ $sigterm_received=false ] 
	do 
		sleep 1 
	done
}

trap catch_sigusr1 USR1
trap catch_sigterm SIGTERM

while [ $sigusr1_received = false -a $sigterm_received=false ]
do 
	sleep 1 
done
exit 0

#EOF
