---
---

O DOliberto é uma plataforma gratuita em código aberto para a produção
de Diários Oficiais transparentes e multiformato.

- TOC
{:toc}

# Um Diário Oficial verdadeiramente digital
O poder público produz muito mais informação do que uma pessoa (ou
mesmo um grupo!) pode acompanhar. Da tramitação de projetos nas
câmaras legislativas às portarias das agências reguladoras, **diversas
regras e atos são propostos sem a devida atenção**.

O Diário Oficial, veículo através do qual o governo publica atos
oficiais, tem um papel central na transparência da atividade
pública. Porém, sem o uso de computadores para filtrar e analisar essa
enorme quantidade de informação, acompanhar e fiscalizar as medidas
governamentais é um exercício fadado ao fracasso.

**Disponibilizar todo documento legal e governamental de maneira
acessível a pessoas e computadores se torna assim fundamental para o
processo democrático.**

Nesse sentido, o projeto DOliberto busca tornar mais fácil o processo
de produção de um Diário Oficial acessível e transparente.

## DOliberto: como funciona?
O projeto se baseia na premissa de que muitos atos publicados em DOs
são semelhantes a ponto de poderem ser escritos de maneira
automatizada.

Tomemos como exemplo o [ato](http://www.imprensanacional.gov.br/materia/-/asset_publisher/2eV0Indlhjp7/content/id/699534) publicado no dia 1º de Dezembro de 2017:


>    O PRESIDENTE DA REPÚBLICA, no uso da atribuição que lhe confere o
>    art. 84, caput, inciso XXV, da Constituição, e tendo em vista o
>    disposto no art. 77, caput, inciso I, alínea "c", e no art. 79 do
>    Anexo I ao Decreto nº 8.817, de 21 de julho de 2016, e no
>    art. 18, caput, inciso I, do Regulamento de Pessoal do Serviço
>    Exterior, aprovado pelo Decreto nº 93.325, de 1º de outubro de
>    1986, resolve
>
>    NOMEAR
>
>    ENIO CORDEIRO, Ministro de Primeira Classe da Carreira de
>    Diplomata do Ministério das Relações Exteriores, para exercer o
>    cargo de Cônsul-Geral do Brasil em Nova Iorque, Estados Unidos da
>    América, removendo-o, ex officio, da Embaixada do Brasil na
>    Cidade do México, Estados Unidos Mexicanos.
>
>    Brasília, 1º de dezembro de 2017; 196º da Independência e 129º da
>    República.
>
>    Aloysio Nunes Ferreira Filho

Seguem dois atos de mesmo teor, em que mudam apenas três variáveis: o
nome da pessoa nomeada, o cargo em que ela ocupava, o novo cargo a ser
ocupado. Bastam essas informações para descrever completamente o texto
dos atos em questão, o que nos permite produzir o texto a partir
dessas três informações.

Na abordagem do DOliberto, uma interface gráfica simples pergunta a
escritora do ato que tipo de notícia ela deseja redigir; com base
nisso, perguntam-se justamente as variáveis do ato em questão, e o
texto é produzido automaticamente a partir desses dados, em um
processo denominado em inglês por *document automation*.

**Naturalmente, nem todo ato se presta a esse tipo de automação**. A
maior parte das leis, por exemplo, não se encaixa nessa estrutura, e
nesses casos o DOliberto apenas oferece um campo livre de escrita,
automatizando somente as partes mais básicas do ato, como a data,
título, e informações do autor.

## Vantagens
- **correção**: Redução de erros nas publicações;
- **eficiência**: Links entre matérias relacionadas e versões do mesmo
  documento;
- **transparência**: Acesso livre ao texto: buscas simples e
  eficientes, sistemas de alertas;
- **multiformato**: um formato pra cada atividade: leitura *online*
  (HTML), leitura *offline* (PDF), análise (XML, JSON).

## Status
O DOliberto atualmente está na versão `0.0.1`, em pleno
desenvolvimento. A imagem abaixo resume que etapas já estão
implementadas, e quais ainda estão para serem desenvolvidas. Para mais
detalhes, entre em contato conosco, ou veja nosso
[github](https://github.com/labFGV/DOliberto/issues/36).

![ROADMAP DOliberto](/images/esquema_doli.png)

## FAQ

### Qual a diferença entre o DOliberto e outros DOs digitais?
- **Acesso aos dados**: No momento (Dezembro 2017), nenhum site
  permite o baixar os dados de todas as publicações em um arquivo só,
  permitindo ao usuário fazer com os dados o que bem desejar, como por
  exemplo criar um sistema próprio de busca.

- **Dados estruturados**: Além disso, formatos como PDF e HTML são
  informação desestuturada. Em formatos como JSON e XML, podemos
  registrar que uma notícia é de uma certa secretaria ou que um valor
  em reais representa o valor total de uma licitação de um modo que um
  computador pode compreender, o que não é possível em PDF e
  complicado em HTML. Isso impede a análise dos textos em larga
  escala, dificultando a transparência.

- **Código aberto**: o DOliberto é uma iniciativa de código aberto, de
  modo que qualquer prefeitura do país (e não só as mais ricas) pode
  implantar um sistema moderno de Diário Oficial com custos
  baixíssimos (basicamente a manutenção do servidor do sistema). O
  código livre também permite a qualquer pessoa personalizar o
  DOliberto para os seus fins, e também contribuir melhorias para o
  sistema.
