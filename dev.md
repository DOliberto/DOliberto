---
---
# DOliberto para desenvolvedor*s
# até que ponto isso aqui não deveria estar na página principal

- TOC
{:toc}

# Um Diário Oficial verdadeiramente digital
O poder público produz muito mais informação do que uma pessoa (ou
mesmo um grupo!) pode acompanhar. Da tramitação de projetos nas
câmaras legislativas às portarias das agências reguladoras, diversas
regras e atos são propostos sem a devida atenção.

Sem o uso de computadores para filtrar e analisar essa quantidade
enorme informação, acompanhar e fiscalizar as medidas governamentais é
um exercício fadado ao fracasso. Disponibilizar todo documento legal e
governamental de maneira acessível à pessoas e computadores se torna
assim fundamental para o processo democrático -- facilitando a
participação, a fiscalização, e a informação popular.

Entre os documentos legais produzidos pelo governo, o Diário Oficial
(DO) tem papel central. Não é exagero dizer que nada acontece no
governo antes de publicação em diário oficial, e mesmo entidades
privadas tem obrigação de usá-lo para alguns tipos de publicação [por exemplo, [lei 6404, Art. 289](http://www.planalto.gov.br/ccivil_03/leis/L6404compilada.htm)].

O Diário Oficial é portanto um alvo comum de projetos que buscam maior
transparência governamental, uma vez que concentra uma riqueza de
informações não encontrada em outros veículos. (De leis à listas de
formados no ensino médio, passando por licitações e contratações, tudo
passa pelos DOs brasileiros).

Entre os projetos que buscam tornar os DOs brasileiros mais
acessíveis, o projeto *DOliberto* toma uma abordagem diferente. Ao
invés de tentar extrair as informações "na marra" e disponibilizá-las
de maneira mais acessível, o *DOliberto* tenta tornar o processo de
criação dos DOs transparentes mais simples, o que torna sua adoção por
municípios e estados mais provável.

# O que é um DO acessível
- PDF são ruins (sem indexação e interligação (barsa vs. wikipedia),
  busca é ruim (hífen quebra), foi feito pra imprimir, não pra ler no
  computador)
- buscas não são simples, vc não pode implementar a sua
- não há sistema de alertas (relacionado ao acima: o texto não é seu)
- ver outros documentos já produzidos para mais argumentos

# por que captura não funciona

- Cada diário é de um jeito
- Diários mudam
- PDF não é o formato correto
- Diário Oficial não é consistente
- por isso precisamos de resolver a raiz do problema, que é o que o
  DOli faz

# Objetivos DOli

- criar um padrão aberto (subordinado ao LeXML) para intercâmbio,
  identificação e estruturação das informações contidas nos diários
  oficiais, que seja legível por humanos e computadores.
- facilitar a elaboração de um D.O. consistente simplificando o
  trabalho do servidor público e reduzindo os erros.
- versionar as informações disponibilizadas pelo D.O.: sem
  possibilidade de obter informações desatualizadas.
  
# vantagens (mover pra landing)

- redução de erros nas publicações (correção)
- links entre matérias relacionadas e versões do mesmo documento
  (eficiência)
- acesso livre ao texto : buscas simples e eficientes, sistemas de
  alertas (transparência)
- vários formatos, um pra cada atividade: leitura online (html), impressão (pdf), análise (xml, json)
- segurança (tbd)

# Como funciona o DOliberto

# Como contribuir
