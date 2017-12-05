# [DOliberto](https://labfgv.github.io/DOliberto) <img src="https://github.com/labFGV/DOliberto/blob/gh-pages/images/logo-doli.jpeg" width="250" align="right"/>

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> O Diário Oficial do século XXI

O DOliberto é uma plataforma gratuita em código aberto para a produção
de Diários Oficiais digitais e transparentes.

O repositório em https://github.com/labfgv/doliberto/ contém:

1. [python back-end](src/doli.py): transforma o JSON vindo da
   interface gráfica nos formatos exportados (PDF [✓], HTML [ ])
2. [servidor python](src/main.py): servidor *flask* simples que recebe
   POST request com os dados e chama o back-end para produção do
   PDF. Também salva o JSON na nuvem.
3. [classe LaTeX](latex/doliberto.cls) para produzir o PDF do Diário
   Oficial.
4. [Dockerfile](Dockerfile) que contém o ambiente completo para
   desenvolvimento e produção do DOliberto -- empacota todas as
   dependências necessárias + um servidor Apache para servir os
   arquivos estáticos da interface gráfica.

## Conteúdo

- [Motivação](#motivação)
- [Instalação e uso](#instalação-e-uso)
- [Mantenedores](#mantenedores)
- [Contribua!](#contribua)
- [Licença](#licença)


## Motivação

Escrever uma notícia para um Diário Oficial no Brasil geralmente
envolve cópia-e-cola de um modelo escrito em word, com a customização
dos poucos campos que mudam a cada publicação. (Pense no caso da
nomeação de um funcionário para um cargo -- o texto é sempre o mesmo,
só mudam o nome do funcionário e o código do cargo). Esse processo de
cópia-e-cola é lento e sujeito a erros. 

Além da ineficiência desse processo, o resultado é pouco acessível: em
um cenário em que milhares de órgãos públicos publicam todos os dias
enormes quantidades de informação, é impossível para uma pessoa (ou
mesmo um grupo!) acompanhá-los todos. Para isso, é preciso que
computadores e algoritmos possam fazer parte do trabalho, filtrando
informações. Mas as informações disponibilizadas em formatos como PDF
e HTML não estão preparadas para serem digeridas por algoritmos, o que
demanda trabalhos de scrapping e parsing para sua extração.

A extração de informação de PDFs e sites não padronizados é uma tarefa
árdua e fadada ao fracasso -- qualquer mudança de layout tende a
demandar uma alteração no código de extração. Ao contrário de outros
grupos que seguem esse caminho, o DOliberto tenta mudar a forma de
produção dos DOs, tornando DOs multiformato a norma. 

De uma só fonte o DOliberto produz vários formatos, cada um apropriado
para uma tarefa:

- leitura off-line: PDF
- leitura on-line: HTML
- análise: JSON, XML

## Instalação e Uso

O DOliberto depende de uma série de projetos de software livre. Para
facilitar o setup do seu ambiente de desenvolvimento, colocamos tudo
que é necessário em uma imagem Docker, de modo que nossa única
dependência na prática é a instalação do Docker.

Se você usa GNU/Linux, pode usar esse
[script](https://github.com/docker/docker-install) da própria Docker:

```sh
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh
```

Se você usa Windows/MacOS, ou prefere instalar manualmente, [clique
aqui](https://docs.docker.com/engine/installation/).

Agora é só clonar o repositório:
```sh
git clone https://github.com/labFGV/DOliberto.git
```

No diretório do projeto, construir a imagem Docker:
```sh
sudo docker build -t doli .
```

E, finalmente, rodar a imagem:

```sh
sudo docker run -d -p 8080:80 --name doli-server doli
```

Pronto! Agora é só visitar [http://localhost:8888/]().

Para parar o servidor DOliberto, basta fazer:

```sh
sudo docker stop doli-server
```

## Mantenedores

@matheusouzap @fernandascovino @harllos @odanoburu at
[@LABFGV](https://github.com/LABFGV).

## Contribua!

O DOliberto é um projeto de software livre, e contribuições são
bem-vindas! [Abra uma
*issue*](https://github.com/labfgv/DOliberto/issues/new) se achar algo
errado, ou então proponha uma solução para uma das *issues* já
abertas!

Se você tiver uma nova ideia ou quiser conversar, fale com a gente!
Você pode abrir uma *issue* ou nos mandar um
[email](mailto:labfgv+doliberto@gmail.com).

## Licença

[LGPL 3.0](LICENSE) © LABFGV e contribuidores
