# Leitura de dados
texto = ""
palavras_buscadas = []
pontuacao = [".", ",", ":", ";", "!", "?"]

n_linhas = int(input())
for linha in range(n_linhas):
    texto += " "+input()

n_palavras = int(input())
for n in range(n_palavras):
    palavras_buscadas.append(input())

# Processamento do texto
for ponto in pontuacao:
    texto = texto.replace(ponto, "")

for palavra in palavras_buscadas:
    ocorrencia = 0
    similares = 0
    palavras_frase = texto.split()

    for palavra_frase in palavras_frase:
        if palavra.lower() == palavra_frase.lower():
            ocorrencia += 1
        elif palavra.lower() in palavra_frase.lower():
            similares += 1

# Saída de dados
    print("Palavra buscada:", palavra)
    print("Ocorrencia:", ocorrencia)
    print("Palavras similares:", similares)

