---
---
# DOliberto para desenvolvedor*s

- TOC
{:toc}

Entre os projetos que buscam tornar os DOs brasileiros mais
acessíveis, o DOliberto diferencia-se por sua abordagem. Em vez de
tentar extrair as informações (quase) manualmente para
disponibilizá-las de maneira mais acessível, o DOli direciona o foco
para o procedimento de criação dos DOs. Esse projeto se baseia em dois
pilares:

- Tornar o processo de geração dos Diários Oficiais mais simples;
- Ser uma solução escalável e gratuita, possibilitando adoção por
  municípios e estados.

Com a produção fácil e escalável de DOs, não haverá necessidade de
extrair informações de PDFs e afins -- será possível simplesmente
baixar todo o conteúdo dos DOs em JSON ou em XML, ou então acessá-los
por meio de uma API.

## Quais os problemas dos DOs atualmente?
- **Formato PDF não possui indexação**, o que torna as buscas não
  triviais e não customizáveis;
- **Diferentes órgãos usam diferentes _layouts_**, ou seja, não existe
 um padrão para facilitar pesquisas e o uso pela população.

## Nossos objetivos

- Facilitar a elaboração de um DO consistente, de modo a simplificar o
  trabalho do servidor público e reduzir erros.
- Criar um padrão aberto (subordinado ao
  [LeXML](http://projeto.lexml.gov.br)) para intercâmbio,
  identificação e estruturação das informações contidas nos Diários
  Oficiais, que seja legível por pessoas e computadores.
- Versionar e conectar as informações disponibilizadas pelo DO: quando
  um decreto modificar outro, será possível clicar em um link que
  direcionará o usuário para o norma modificada; de maneira análoga, o
  decreto antigo conterá link para a nova versão. Assim, não haverá
  possibilidade de obter-se dados desatualizados.


## O código
O DOliberto é escrito em [Python](https://www.python.org) e
[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). A
lógica do servidor e o *back-end* são escritos em Python (usando
principalmente as bibliotecas [flask](http://flask.pocoo.org) e
[PyLaTeX](https://github.com/JelteF/PyLaTeX/), com frontend escrito em
Javascript. As páginas estáticas são servidas pelo
[Apache](https://httpd.apache.org) e todas essas componentes são
conteinerizadas em uma imagem [Docker](https://www.docker.com).

Em breve será implementado um servidor de busca em
[ElasticSearch](https://www.elastic.co).

Se você entende ou quer entender alguma dessas tecnologias, o
DOliberto aceita novas contribuições, pois há muito trabalho a ser
feito!

## Como contribuir?

Todo o trabalho está disponível sob licença aberta no
[GitHub](https://github.com/labFGV/DOliberto/).

As etapas e *features* a serem desenvolvidas estão organizadas em
[issues](https://github.com/labFGV/DOliberto/issues) com diferentes
categorias. Lá você pode participar da discussão de cada detalhe do
projeto, na categoria que você desejar.

Veja nossa
[README](https://github.com/labFGV/DOliberto/blob/master/README.md)
para saber como criar o ambiente de desenvolvimento e rodar um
servidor DOli no seu próprio computador.
