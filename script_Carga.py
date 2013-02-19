# -*- coding: latin-1 -*-  

# Read mode opens a file for reading only.
fIn = open("preguntas.txt", "r")
fOut = open("datos.xml", "w")

fOut.write('<preguntas>\n')

# OR read all the lines into a list.
lineas = fIn.readlines()
numPreg = int(len(lineas)/6)
indice = 0

for i in range(numPreg):
    fOut.write('\t<pregunta>\n')
    fOut.write('\t\t<solucion>\n')
    fOut.write('\t\t'+lineas[indice])
    indice += 1
    fOut.write('\t\t</solucion>\n')
    fOut.write('\t\t<enunciado>\n')
    fOut.write('\t\t'+lineas[indice])
    indice += 1
    fOut.write('\t\t</enunciado>\n')
    fOut.write('\t\t<opciones>\n')
    fOut.write('\t\t\t<opcion>\n')
    fOut.write('\t\t\t'+lineas[indice])
    indice += 1
    fOut.write('\t\t\t</opcion>\n')
    fOut.write('\t\t\t<opcion>\n')
    fOut.write('\t\t\t'+lineas[indice])
    indice += 1
    fOut.write('\t\t\t</opcion>\n')
    fOut.write('\t\t\t<opcion>\n')
    fOut.write('\t\t\t'+lineas[indice])
    indice += 1
    fOut.write('\t\t\t</opcion>\n')
    fOut.write('\t\t\t<opcion>\n')
    fOut.write('\t\t\t'+lineas[indice])
    indice += 1
    fOut.write('\t\t\t</opcion>\n')
    fOut.write('\t\t</opciones>\n')
    fOut.write('\t</pregunta>\n')
    
fOut.write('</preguntas>')

fIn.close()
fOut.close()
