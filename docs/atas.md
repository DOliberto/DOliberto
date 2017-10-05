# atas

> convenção: data em ##H2, formato ISO, ordem crescente (para não
> atrapalhar o diff do git).

## 2017-07-06

- [x] post no medium apresentando o projeto + post no facebook (@anajansen)

- [x] definir missão: 

	não existe brasil transparente sem um DO transparente.
	fazer o melhor DO do brasil.
	fazer um DO digital.

- melhorar a vida de fornecedores (servidores públicos, governo) e dos
  usuários (leitores, cidadãos)

- construir uma comunidade em volta do DOliberto

- o que é o melhor DO:
  
  - mais fácil de fazer
  
  - e com menos erros
  
  - machine readable

- não precisa de financiamento

- não precisamos de parcerias institucionais pro MVP, apenas alguma
  consultoria técnica

- precisamos de validação
  
  - governamental
  
  - clientes (cidadãos, empresas, escritórios jurídicos, jornalistas,
    etc.)

- pessoas que entendam:

  - a parte legal do DO
  
  - a parte prática (como faz) o DO


---

## 2017-07-13

### past assignments

- [x] preparar publicação pro facebook e medium (@anajansen)

	- falta publicar

- [x] preparar levantamento de problemas (@wramalho)

	- fechar a entrevista amanhã

- [x] requerimentos/entraves legais (@harllos)

	- precisa de certificação digital
	
	- além disso não parece haver grandes entraves

- [x] metodologia ágil (@thiagotrabach)

- [x] material sobre XML (@odanoburu)

### criação de comunidade

- estratégia é:

	- desenvolver um protótipo
	
	- chamar todos interessados em DO (OK, grupos de transparência,
      etc.) pra uma página virtual (discourse, IRC, google groups?) em
      que discutiremos o desenvolvimento do DOliberto

### desenvolvimento do DOliberto

#### @thiagotrabach falando de metodologia ágil

#### frontend web ou offline?


---

## 2017-07-20

### past assignments

- [x] publicar sobre DOliberto no facebook e medium (@anajansen)

	- incorporar a visão do produto (ver apresentação de scrum) na
      publicação

- [x] continuar fazendo entrevistas (@wramalho)

	- [x] pegar o email dessas pessoas e mandar updates

- [x] visita à Mesquita (@harllos e @alifersales)

- [x] elaborar proposta de projeto para Mesquita (@thiagotrabach,
  @odanoburu)


---

## 2017-07-27

### past assignments

- [x] mexer no ROADMAP e já preparar uma proposta pro primeiro sprint
  (@thiagotrabach, @odanoburu)

### metodologia SCRUM

- scrum master: @thiagotrabach

- product owner: fernanda almeida

## equipes

planejar como será desenvolvida a área para a próxima reunião. vender
o pq vc acha que devemos seguir nessa direção, citando prós e contras
dos "concorrentes".

- input/front: @joaocarabetta
	- Django é o melhor framework para se trabalhar. É em python e
	tem uma extensa gama de pacotes e uma comunidade ativa. Flask 
	era uma opção, mas apresenta menos recursos nativos e menos 
	possibilidade de expansão. Além de que, Django já tem um sistema
	de formulários integrado com seu framework.
	- Tem um [tutorial completo](https://qbox.io/blog/series/elasticsearch-python-django-series)
	de como integrar Django com ElasticSearch. Outros tutoriais 
	[1](https://medium.freecodecamp.org/elasticsearch-with-django-the-easy-way-909375bc16cb),
	[2](https://www.codementor.io/samueljames/using-django-with-elasticsearch-logstash-and-kibana-elk-stack-9l4fwx138).
	Pacotes Django+Elastic 	
	[1](https://github.com/sabricot/django-elasticsearch-dsl),
	[2](https://github.com/jaddison/django-simple-elasticsearch).
	- É possível usar até a ferramenta de busca do Elastic, assim 
	como o Github usa. Com outras bases de dados, ele é facilmente
	integrável e tem extensões nativas com SQL e Mongo. 
	- Sobre o front, por enquanto não pesquisei por no ter 
	a pessoa responsável por essa área.

- base de dados: @fernandascovino @thiagotrabach

	- Postgres
	- MongoDB
	- XML puro + Xquery
	- Apache Solr
	- Sphinx

- output: @alifersales @odanoburu

	- TeXlive
	- [wkhtmltopdf](https://wkhtmltopdf.org/)


---

## 2017-08-03

### past assignments

- [x] publicar sobre DOliberto no facebook e medium (@anajansen)

	- incorporar a visão do produto (ver apresentação de scrum) na
      publicação

## decisões

- usar Django e não flask para o webapp

- banco deve ser elastic search ou apache solr

	decidir baseado nas melhores python bindings e integração com
    django.

- saída PDF usando TeX. como fazer vários formatos? usar pandoc?

- pensar na ordenação dos atos:

	- criar critérios de importância para os elementos da ontologia do
      DO, organizar por secretaria (segundo qual ordem?)

## 2017-08-10

### past assignments

- [x] levantar iniciativas de parseamento do DO

- [x] ver como é exatamente a certificação digital, pra ver como
  encaixa no DOliberto (@harllos)

- [x] apresentar material de XML (@odanoburu)

- [x] @wramalho: procurar especificação dos atos do DO, referência,
  ontologia

- [x] @fernandascovino, @vitoriaguardiero: levantar a ontologia da
  prefeitura de mesquita no
  [protégé](http://protege.stanford.edu/products.php#web-protege)

### reunião

- entrevistas encaminhadas, mas ainda faltam duas

- front end dev deve se candidatar ao Lab

## 2017-08-17

### past assignments

- [ ] terminar entrevistas (@wramalho)

	- faltam duas
	- colocadas no drive

- [ ] responder ao bondarovsky (@harllos)

- [x] fundamentar legalmente o DOliberto (@harllos)

- [ ] @fernandascovino @vitoriaguardiero conseguir a estrutura
  organizacional da prefs

- [ ] avaliar qual DB é melhor para as nossas demandas

	- apache lucene parece ser o driver das melhores opções: elastic
      search e apache solr.

### sprint

## 2017-08-24

ausentes: @alifersales, @joaocarabetta

- @fernandascovino mostrou o início do levantamento dos tipos de atos

    - discutiu-se sobre a melhor forma de estruturar esse
      levantamento: se por secreataria ou por ato, se usando
      arquivo-texto simples ou RDF (protégé) ou um mesmo um arquivo.py

- @souzamatheusp mostrou a primeira versão do webapp (!)

- @odanoburu falou do trabalho de reconhecimento de entidades

## 2017-08-31

### past assignments

- [ ] terminar entrevistas (@wramalho)

	- faltam duas

- [ ] responder ao bondarovsky (@harllos)

- [ ] @souzamatheusp : adicionar features ao webapp (adição de vários
  atos a um mesmo diário

- [ ] @fernandascovino @harllos : continuar levantamento dos atos

- [ ] @viguardieiro @alifersales : TOML -> PDF usando LaTeX

- [ ] @odanoburu @joaocarabetta : reconhecimento de entidades

## 2017-09-14

### past assigments

#### release 0.0.1

- Front:

    - [x] ato -> JSON (para simplificar)
    
    - [x] concatenação de atos
    
    - [x] campos: título, responsável, cargo do responsável,
      secretaria, e o texto
    
    - [ ] reordenação de atos
    
    - [ ] upload de tabela CSV

- Back:

    - ler JSON
    
    - definir classe doliberto.sty:
        
        - \cabecalho (mesquita + data + nº e imagem vetorizada - pedir ao Bruno @harllos)
	
	- \ato (título, texto, responsável + cargo)
        
        - \tabelacol
	
        - \tabela
	
    - gerar .tex a partir de JSON usando comando apropriado

## 2017-09-21

### past assigments

- [x] visita à Mesquita @harllos

    - [x] ver se as leis de Mesquitas estão todas na internet
    
## 2017-09-30

### past assignments

- front
    
    - [ ] reordenação de atos
    
    - [ ] upload de tabela CSV
    
    - [ ] gerar arquivo json (nome: do-mesquita-YYYY-MM-DD)
    
    - pegar números de lei/resolução? @harllos

- doliberto latex class

    - [x] \cabecalho (mesquita + data + nº e imagem vetorizada - pedir
      ao Bruno @harllos)
	
	- [x] \ato (título, texto, responsável + cargo)
        
    - [ ] \tabelacol
	
    - [ ] \tabela
	
- PyLaTeX

    - [x] ler json
    
    - [x] gerar .tex a partir de JSON usando comandos apropriados da
      classe doliberto.sty

## 2017-10-05

### past assignments

- front (@souzamatheusp)
    
    - [ ] reordenação de atos
    
    - transformar .json pra {"atos":[...], "date":"YYYY-MM-DD", "issue":53}
    
    - [ ] upload de tabela .csv
    
    - [ ] fazer POST request
    
    - [ ] pegar números de lei/resolução? @harllos

- doliberto latex class (@viguardieiro)

    - [x] \cabecalho (mesquita + data + nº e imagem vetorizada - pedir
      ao Bruno @harllos)
	
	- [x] \ato (título, texto, responsável + cargo)
        
    - [ ] \tabelacol
	
    - [ ] \tabela

- servidor Python (@odanoburu)

    - [ ] receber POST request, fazer .pdf, e enviar pro cliente
	
- PyLaTeX (@odanoburu)

    - [x] ler json
    
    - [x] gerar .tex a partir de JSON usando comandos apropriados da
      classe doliberto.sty
