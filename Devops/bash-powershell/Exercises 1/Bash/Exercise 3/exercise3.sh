#!/bin/bash

ayuda() # Funcion para mostrar ayuda
{
	echo "Invocacion al script : $0 [Directorio_Entrada][Directorio_Salida]"
    echo "[Directorio_Entrada] : Especifica el directorio en el cual se buscaran los archivos .csv del sistema X para adaptarlos al sistema Y"
	echo "[Directorio_Salida] : Especifica el directorio en el cual se guardara el archivo de salida del sistema Y"
    echo "Ejemplo : $0 ./Entrada ./Salida"
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

if ! test -d $1 ; then
	echo "Error: El parametro $1 no corresponde a un directorio o no existe."
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if ! test -d $1 ; then
	echo "Error: El parametro $2 no corresponde a un directorio o no existe."
	echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
	exit 1
fi

if [ ! -r $1 ] || [ ! -x $1 ] ; then
	echo "Error: El parametro $1 no posee los permisos necesarios para procesarlo"
    echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
    exit 1
fi 

if [ ! -w $2 ] || [ ! -x $2 ]; then
	echo "Error: El parametro $2 no posee los permisos necesarios para guardar el archivo de salida"
    echo "Ingrese $0 -help para ver la ayuda acerca de la invocacion al script"
    exit 1
fi 

oldifs=$IFS
IFS=""
archivos=$(find $1 -type f -name "*.csv")

cont=0
IFS=$oldifs
for var in ${archivos[@]}
do
	let cont++
done

IFS=""
if test $cont -eq 0 ;then
	echo "Error: El directorio $1 no contiene archivos del tipo .csv"
	exit 1
fi

echo -n "" > "Log_Errores.txt"
header=1

while read path
do
	cont=1
	if  test -r $path ;then
		marca=0
		while read linea
		do
			if test $cont -eq 1 ;then
				if ! test $(echo $linea | egrep "^Fecha;[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9];$") ;then
					echo "Archivo:$path Error Linea: $cont Valor: $linea" >> "./Log_Errores.txt"
					marca=1
				fi
			fi
			if test $cont -eq 2 ;then
				if ! test $(echo $linea | egrep "^Materia;[a-zA-Z 0-9]+;$") ;then
					echo "Archivo:$path Error Linea: $cont Valor: $linea" >> "./Log_Errores.txt"
					marca=1
				fi
			fi
			if test $cont -eq 3 ;then
				if ! test $(echo $linea | egrep "^Departamento;[a-zA-Z ]+;$") ;then
					echo "Archivo:$path Error Linea: $cont Valor: $linea" >> "./Log_Errores.txt"
					marca=1
				fi
			fi
			if test $cont -eq 4 ;then
				if ! test $(echo $linea | egrep "^Comision;Apellido;Nombre;Usuario;$") ;then
					echo "Archivo:$path Error Linea: $cont Valor: $linea" >> "./Log_Errores.txt"
					marca=1
				fi
			fi
			if test $cont -gt 4 ;then
				if ! test $(echo $linea | egrep "^[a-zA-Z]+;[a-zA-Z]+;[a-zA-Z]+;[a-zA-Z0-9]+;$") ;then
					echo "Archivo:$path Error Linea: $cont Valor: $linea" >> "./Log_Errores.txt"
					marca=1
				fi
			fi
			let cont++
		done < $path
		cont=1 
		if test $marca -eq 0 ;then
			if test $header -eq 1 ;then
				FECHA=$(date +"%d%m%Y")
				HORA=$(date +"%H%M")
				if test $(echo $2 | egrep "/$") ; then	
					salida="$2""file.$FECHA.$HORA"
				else
					salida="$2/file.$FECHA.$HORA"
				fi
				echo "Archivo;Fecha;Materia;Comisión;Apellido;Nombre;Usuario;" > $salida
				header=0
			fi
			while read linea
			do			
				if test $cont -eq 1 ;then
					fecha=$(echo $linea | cut -d ";" -f2)
				fi
				if test $cont -eq 2 ;then
					materia=$(echo $linea | cut -d ";" -f2)
				fi
				if test $cont -eq 3 ;then
					departamento=$(echo $linea | cut -d ";" -f2)
				fi
				if test $cont -gt 4 ;then
					archivo=$(basename $path)
					comision=$(echo $linea | cut -d ";" -f1)
					apellido=$(echo $linea | cut -d ";" -f2)
					nombre=$(echo $linea | cut -d ";" -f3)
					usuario=$(echo $linea | cut -d ";" -f4)
					echo "$archivo;$fecha;$materia;$comision;$apellido;$nombre;$usuario;" >> $salida
				fi
				let cont++
			done < $path
			nuevo_path_nombre=$(basename $path | cut -d "." -f1)
			nuevo_path_dir=$(dirname $path)
			nuevo_path=$nuevo_path_dir"/"$nuevo_path_nombre".procesado"
			mv $path $nuevo_path
		fi			
	fi
done <<< $archivos 

if ! test -s "Log_Errores.txt" ;then
	rm "Log_Errores.txt"
fi

#EOF
