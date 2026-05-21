# Nombre Del Script: ejercicio1.awk
# Trabajo Práctico Nro.: 2
# Ejercicio Nro: 1 BASH
# Entrega: Primera Entrega
# Integrantes: APELLIDOS, Nombres, DNI    
#    Famiglietti, Cristian, 29824170
#    Famiglietti, Damian, 32123414
#    Leitao Pinheiro, Agustin Jose, 33788181
#    Castillo, Florencia, 32980931
#    Romero, Cristian, 34297484


function colocarCabecera(cabecera,path)
{
	if(cabecera == 1)
	{
		print "ID"FS"NOMBRE"FS"CUIT"FS"DIRECCION"FS"TELEFONO"FS"ERROR" > path
		return 0
	}
	return 0
}

BEGIN {
cabecera_error=1
cabecera_ok=1
split(filename,vector,".")
salida_error= vector[1]".err"
salida_ok= vector[1]".ok"
}

{
	if(NR == 1)
	{
		if(NF < 5 )
		{
			cabecera_error = colocarCabecera(cabecera_error,salida_error)
			print $0 FS "A la cabezera le faltan "((NF-5)*-1)" campo/s" >> salida_error
		}
		if(NF > 5 )
		{
			cabecera_error = colocarCabecera(cabecera_error,salida_error)
			print $0 FS "La cabezera tiene "(NF-5)" campo/s de mas" >> salida_error
		}
		if(NF == 5)
		{
			if( $1 != "ID" )
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				print $0 FS "El primer campo de la cabecera debe contener el valor ID" >> salida_error
			}
			if($2 != "NOMBRE")
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				print $0 FS "El segundo campo de la cabecera debe contener el valor NOMBRE" >> salida_error
			}
			if($3 != "CUIT")
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				print $0 FS "El tercer campo de la cabecera debe contener el valor CUIT" >> salida_error
			}
			if($4 != "DIRECCION")
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				print $0 FS "El cuarto campo de la cabecera debe contener el valor DIRECCION" >> salida_error
			}
			if($5 != "TELEFONO")
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				print $0 FS "El quinto campo de la cabecera debe contener el valor TELEFONO" >> salida_error
			}
		}
	}
	else
	{
		correcto=1
		if( NF < 5 )
		{
			cabecera_error = colocarCabecera(cabecera_error,salida_error)
			print $0 FS"Al registro le faltan "((NF-5)*-1)" campo/s" >> salida_error
			correcto=0
		}
		else
		{
			if( NF > 5 )
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				print $0 FS"El registro tiene "(NF-5)" campo/s de mas" >> salida_error
				correcto=0
			}
			if( $1 !~ /^[0-9]+$/ )
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				correcto=0
				if($1 == "")
					print $0 FS"El campo ID esta vacio" >> salida_error
				else
					print $0 FS"El campo ID debe contener unicamente numeros entre 0 y 9" >> salida_error
			}
			if( $2 !~ /^[0-9a-zA-Z ]+$/ )
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				correcto=0
				if($2 == "")
					print $0 FS"El campo NOMBRE esta vacio" >> salida_error
				else
					print $0 FS"El campo NOMBRE debe contener unicamente letras o numeros entre 0 y 9" >> salida_error
			}
			if( $3 !~ /^[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9]$/ )
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				correcto=0
				if($3 == "")
					print $0 FS"El campo CUIT esta vacio" >> salida_error
				else
					print $0 FS"El campo CUIT debe tener el formato NN-NNNNNNNN-N donde N representa un numero de 0 a 9" >> salida_error
			}
			if( $4 !~ /^[0-9a-zA-Z. ]+$/ )
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				correcto=0
				if($4 == "")
					print $0 FS"El campo DIRECCION esta vacio" >> salida_error
				else
					print $0 FS"El campo DIRECCION debe contener unicamente letras,puntos o numeros entre 0 y 9" >> salida_error
			}
			if( $5 !~ /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/ )
			{
				cabecera_error = colocarCabecera(cabecera_error,salida_error)
				correcto=0
				if($5 == "")
					print $0 FS"El campo TELEFONO esta vacio" >> salida_error
				else
					print $0 FS"El campo TELEFONO debe contener unicamente numeros entre 0 y 9. Debe tener 8 numeros" >> salida_error
			}
		}
		if(correcto == 1)
		{
			correctos[$0]++
		}
	}
}
END{
	for (var in correctos)
		correctos[var]--
	for (var in correctos)
	{
		if(correctos[var] == 0)
		{
			marca=0
			for (ele in correctos)
			{
				if(ele != var)
				{
					split(var,vector1,FS)
					split(ele,vector2,FS)
					if(vector1[1] == vector2[1] )
					{	
						marca = 1
						correctos[ele] = 1
					}
					else
					{
						if(vector1[2] == vector2[2])
						{
							marca = 1
							correctos[ele] = 1
						}
						else
						{
							if(vector1[3] == vector2[3])
							{
								marca = 1
								correctos[ele] = 1
							}
							else
							{
								if(vector1[4] == vector2[4])
								{
									marca = 1
									correctos[ele] = 1
								}
								else
								{
									if(vector1[5] == vector2[5])
									{
										marca = 1
										correctos[ele] = 1
									}
								}
							}
						}
					}
				}
			}
			if(marca == 1)
				print var FS"Clave Duplicada" >> salida_error
			else
			{
				if(cabecera_ok == 1)
				{
					print "ID"FS"NOMBRE"FS"CUIT"FS"DIRECCION"FS"TELEFONO" > salida_ok
					cabecera_ok = 0
				}
				print var >> salida_ok	
			}	
		}
		else
			print var FS"Clave Duplicada" >> salida_error
	}
}
#EOF
