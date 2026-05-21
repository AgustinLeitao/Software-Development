#!/bin/bash

ayuda() # Funcion para mostrar ayuda
{
	echo "Invocacion al script : $0 [Directorio][Archivo1][Archivo2][ArchivoN]"
    echo "[Directorio] : Especifica el directorio en el cual se buscaran los archivos .sh y .log para procesarlos"
	echo "[Archivo1][Archivo2][ArchivoN] : Parametros Opcionales que se usaran para ignorar dicho archivo o archivos de la estructura de directorio pasada por parametro"
    echo "Ejemplo : $0 .\Directorio prueba.sh \Directorio2\prueba.log"
}

if [[ $1 == "-?" || $1 == "-h" || $1 == "-help" ]]; then
	ayuda
	exit 0
fi

if test $# -lt 1 ; then
	echo "Error: La cantidad de parametros es incorrecta."
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test -d $1 ; then
	echo "Error: El parametro $1 no corresponde a un directorio o no existe."
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if [ ! -r $1 ] || [ ! -w $1 ] || [ ! -x $1 ] ; then
	echo "Error: El parametro $1 no posee los permisos necesarios para procesarlo"
    echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
    exit 1
fi 
IFS=""
directorio=$1
shift

for arch in $@
do
	ruta_archivo=$(dirname $arch)
	if [ $ruta_archivo = "." ] ;then
		ruta_archivo=""
	fi
	nombre_archivo=$(basename $arch)
	ruta_completa="$directorio$ruta_archivo/$nombre_archivo"
	if ! test -f $ruta_completa ;then
		echo "Error: El parametro $arch no corresponde a un archivo regular o no existe"
	fi	
done

modificados=0
sin_permisos=0
extsh=0
extlog=0

archivos=$(find $directorio -type f -iname "*.sh" -o -type f -iname "*.log")
while read var
do
	marca=0
	for arch in $@
	do
		ruta_archivo=$(dirname $arch)
		if [ $ruta_archivo = "." ] ;then
			ruta_archivo=""
		fi
		nombre_archivo=$(basename $arch)
		ruta_completa="$directorio$ruta_archivo/$nombre_archivo"
		if test $var = $ruta_completa ;then
			marca=1
		fi
	done
	if test $marca -ne 1 ;then
		if ! test -w $var ;then
				let sin_permisos++
		else
			ruta_archivo=$(dirname $var)
			nombre_completo_archivo=$(basename $var)
			nombre_archivo=$(echo $nombre_completo_archivo | cut -d "." -f1) 
			extension_archivo=$(echo $nombre_completo_archivo | cut -d "." -f2)
			nombre_archivo_mayuscula=$(echo $nombre_archivo | tr [:lower:] [:upper:])
			if ! test $nombre_archivo = $nombre_archivo_mayuscula ;then
				nombre_completo_archivo_final="$nombre_archivo_mayuscula.$extension_archivo"
				ruta_archivo_final="$ruta_archivo/$nombre_completo_archivo_final"
				mv $var $ruta_archivo_final 2>/dev/null
				let modificados++
				if test $(echo $extension_archivo | grep -i "sh") ;then
					let extsh++
					DIA=$(date +"%d/%m/%Y")
					HORA=$(date +"%H:%M")
					echo "#Archivo modificado el $DIA a las $HORA" >> $ruta_archivo_final
				else
					let extlog++
				fi
			fi
		fi
	fi
done <<< $archivos 

echo "Cantidad de archivos modificados = $modificados"
echo "Cantidad de archivos modificados con extension .sh = $extsh"
echo "Cantidad de archivos modificados con extension .log = $extlog"
echo "Cantidad de archivos que no se pudieron modificar por falta de permisos = $sin_permisos"

#EOF
