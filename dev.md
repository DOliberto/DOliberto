---
---
# DOliberto para desenvolvedor*s

- TOC
{:toc}

Entre os projetos que buscam tornar os DOs brasileiros mais
acessíveis, o projeto DOliberto toma uma abordagem diferente. Ao invés
de tentar extrair as informações "na marra" e disponibilizá-las de
maneira mais acessível, o DOliberto muda o olhar para dentro do
processo. O projeto se baseia em dois pilares:

- Tornar o processo de criação dos DOs transparentes mais simples;
- Ser uma solução escalável, possibilitando adoção por municípios e
  estados.

Com a produção fácil e escalável de DOs, não será mais necessário
extrair informações de PDFs e afins -- poderemos simplesmente baixar
todo o conteúdo dos DOs em JSON ou em XML, ou então acessá-los por
meio de uma API.

## Quais os problemas do D.O. nos dias de hoje?
- **Formato PDF não possui indexação**, o que torna as buscas não
  triviais e não customizáveis;
- **Diferentes órgãos usam diferentes formatos**, ou seja, não existe
 um padrão para facilitar as pesquisas e o uso pela população.

<!--
@fernandascovino, coloquei o esquema na landing, pode tirar aqui?
## Como funciona o DOliberto?

**Versão atual: 0.0.1**

Nessa primeira versão do DO Liberto, nosso foco é no **processo de
construção do DO**.

![Esquema DOLiberto](/images/esquema_doli.png)
-->

## Nossos objetivos

- Facilitar a elaboração de um D.O. consistente simplificando o
  trabalho do servidor público e reduzindo os erros.
- Criar um padrão aberto (subordinado ao LeXML) para intercâmbio,
  identificação e estruturação das informações contidas nos diários
  oficiais, que seja legível por humanos e computadores.
- Versionar as informações disponibilizadas pelo D.O.: sem
  possibilidade de obter informações desatualizadas.


## O código
O DOliberto é escrito em Python e Javascript. A lógica do servidor e o
*back-end* são escritos em Python (usando principalmente as
bibliotecas *flask* e *PyLaTeX*), com frontend escrito em
Javascript. As páginas estáticas são servidas pelo Apache, e todas
essas componentes são conteinerizadas em uma imagem Docker.

Em breve implementaremos um servidor de busca em *ElasticSearch*.

Se você entende ou quer entender de alguma dessas tecnologias, o
DOliberto está aberto para contribuições, pois há muito trabalho a ser
feito!

## Como contribuir?

Todo nosso trabalho está disponível sob licença aberta no
[GitHub](https://github.com/labFGV/DOliberto/).

As etapas e *features* a serem desenvolvidas estão organizadas em
[issues](https://github.com/labFGV/DOliberto/issues) com diferentes
categorias. Lá você pode participar da discussão de cada detalhe do
projeto, na categoria em que você desejar.

Veja nossa [README](https://github.com/labFGV/DOliberto/blob/master/README.md)
para saber como criar o ambiente de desenvolvimento
e rodar um servidor DOli no seu próprio computador.

**Achou algo legal para desenvolver? Contribua! Converse conosco pelo
GitHub ;)**

