# Memorando DOliberto

#### De: LAB FGV - equipe HackGov
#### Para: Bruno Bondarovsky (Secretário de Planejamento de Mesquita)
#### Assunto: projeto DOLiberto - Diário Oficial liberto


## Sumário Executivo

- Atualmente, as informações publicadas no Diário Oficial são
  disponibilizadas em PDF e sem indexação, o que dificulta a leitura e
  o acompanhamento das publicações pela sociedade.
  
- Os sistemas da maior parte da administração pública é insegura e
  sujeita a alterações ilegais e fáceis de serem feitas.
  
- O DOliberto pretende criar um Diário Oficial moderno e automatizado,
  mais simples para ser produzido pela administração pública e mais
  transparente e eficiente para pesquisa e acompanhamento.
  
- Iniciativas similares no Brasil não alteraram o modo de fazer o
  Diário, apenas trabalharam em cima do que já é feito com resultados
  insatisfatórios.


## Objetivos

Não existirá transparência governamental no Brasil enquanto o Diário
Oficial não for transparente. O principal desafio está em tranformar
dados não-estruturados em dados estruturados. Com a estruturação dos
dados do Diário Oficial, em parceria com o Município de Mesquita, será
possível caminhar para atingir os objetivos do projeto DOliberto:

- Criar um padrão aberto, subordinado
ao [LexML](http://www.lexml.gov.br/), para intercâmbio, identificação
e estruturação das informações contidas nos diários oficiais, que seja
legível por humanos e por computadores.

- Facilitar a elaboração de um D.O. consistente, simplificando o
trabalho do servidor público e reduzindo os erros.

- Versionar as informações disponibilizadas pelo Diário Oficial, de
  modo que:
  
  - o documento deixa de ser apenas o texto atual para conter toda
    sua história, o que permite ver modificações e quem as fez;
  
  - de modo análogo, o texto antigo deixa de existir separado do
  atual: é impossível que um leitor leia informações desatualizadas,
  tendo perdido erratas e correções.


## Protótipo

- O Diário Oficial do Município de Mesquita terá uma interface gráfica
  para que o servidor público insira os dados necessários.

- O usuário poderá realizar a pesquisa pelo site do DO de Mesquita (ou
  pela API).

O sistema permitirá a indexação e a busca inteligente do Diário. No
site, será possível pesquisar, por exemplo, as *nomeações* entre
*2016* e *2017* ou pesquisar por *secretarias* ou *temas*.


### *fluxo de trabalho*

O novo modelo do Diário Oficial mesquitense pretende facilitar o
trabalho de quem o preenche e o publica em alguns passos:

1. O servidor público usará uma interface gráfica que o permitirá
escolher o tipo de publicação a ser feita (i.e. decretos, leis,
nomeações, edital de licitação);

2. Ao selecionar um tipo, aparecerão os campos a serem preenchidos;

3. Preenchidos os campos, os valores são transformados para o formato
XML, que é enviado ao *server* a cargo da secretaria que publica o
D.O.;

4. O arquivo XML será recebido e tratado, construído com um um valor
de identificação única (a URN, especificada pelo LexML) para cada
publicação a partir de seu conteúdo (e.g.,
`br:mesquita;mesquita:municipal:orgao:tipo;data;nr` é uma URN, em que
os campos entre chaves são específicos de cada publicação, e os outros
campos são variáveis globais para a Prefeitura de Mesquita);

5. Ao final do dia, é construído automaticamente o arquivo final do
diário, usando os XMLs recebidos.


### *possíveis extensões*

- Uso de *blockchain* para autenticação e segurança dos dados;

- Atualização em tempo real do Diário Oficial, ao invés de publicação
  diária.

- API para acesso avançado às públicações (filtros de secretaria,
  data, tipo, etc.)


## Iniciativas similares


• [diário livre](http://devcolab.each.usp.br/do/)

• [queriDO](https://okfn-brasil.github.io/queriDO/site/)

• [TrazDia](https://github.com/andresmrm/trazdia)

Sabemos que existem, no Brasil, algumas iniciativas para melhorar o
Diário Oficial. Nenhuma das iniciativas acima tentou reformular o modo
de produção do Diário, mas trabalharam a partir do que já é feito no
país. Desse modo, o projeto DOliberto quer ir além: **pretendemos
criar o Diário Oficial do século 21.**

A diferença entre o DO liberto, o DO tal qual ele é hoje e as demais
iniciativas de alterá-lo está ilustrada na figura abaixo:

![DOliberto](doliberto.png)

Os exemplos que seguiremos vêm de outros países: o
[Federal Register](https://www.federalregister.gov/)
, do governo federal norte-americano, e o
[Jornal Oficial da União Europeia](https://eur-lex.europa.eu/oj/direct-access.html?locale=pt).
Estes possuem a produção pensada para a transparência governamental. A
figura abaixo ilustra o contexto do projeto DOliberto.
